var express = require('express');
var app = express();
var WebSocket = require('ws');


var sqlite3 = require('sqlite3').verbose()


app.use(express.static(__dirname + '/public'));

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})

// This responds with "Hello World" on the homepage
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/" + "index.html");
})


app.get('/get_dateList', function (req, res) {
    var db = new sqlite3.Database('./diplomTest.db');
    db.serialize(function () {
        db.all('SELECT ID,Date FROM Date_table', (err, rows) => {
            if (err) {
                throw err;
            }
            let data = JSON.stringify(rows);
            res.send(data);
        })
    })
    db.close();
});
app.get('/get_statistic', function (req, res) {
    var db = new sqlite3.Database('./diplomTest.db');
    db.serialize(function () {
        if (req.query && req.query.ID) {
            let id = (+req.query.ID)
            if (((typeof id) === 'number') && id === id) {
                db.all('SELECT ID,time,type,turn_type FROM statistic WHERE Date_ID=?', [req.query.ID], (err, rows) => {
                    if (err) {
                        throw err;
                    }
                    rows = rows || 'no rows in DB'
                    let data = JSON.stringify(rows);
                    res.send(data);
                })
            }
            else {
                res.status(400).send('ID must be a number');
            }
        }
        else {
            res.status(400).send('request must contains param ID which must be a integer');
        }
    })
    db.close();
});

let funcOne = function (req, res, next) {
    var db = new sqlite3.Database('./diplomTest.db')
    let b = new Date();
    let date = b.getDate() + '-' + (b.getMonth() + 1) + '-' + b.getFullYear()
    db.serialize(function () {
        db.all("SELECT * From Date_table where Date like ?", [date], function (err, rows) {
            if (err) {
                throw err;
            }
            if (rows.length) {
                req.afterFuncOne = {DateID: rows[0].ID, DateValue:rows[0].Date, needToCreateDateID: false}
            }
            else {
                req.afterFuncOne = {DateID: null, needToCreateDateID: true}
            }
            next()
        })
    })
}

let funcTwo = function(req,res,next){
    var db = new sqlite3.Database('./diplomTest.db')
    let b = new Date();
    let date = b.getDate() + '-' + (b.getMonth() + 1) + '-' + b.getFullYear()
    db.serialize(function () {
        if (req.afterFuncOne.needToCreateDateID) {
            db.run('INSERT INTO Date_table (Date) VALUES (?)', [date], function (err) {
                if (err) {
                    throw err;
                }
                req.afterFuncOne.DateID = this.lastID;
                req.afterFuncOne.DateValue = date;
                next()
            })
        } else {
            next()
        }
    })
}

let funcThree = function(req,res,next){
    var db = new sqlite3.Database('./diplomTest.db');

  let b = new Date();
  let date = b.getHours() + ':' + b.getMinutes() + ':' + b.getSeconds();

    db.serialize(function () {
        db.run('INSERT INTO statistic (time,type,Date_ID,turn_type) VALUES (?,?,?,?)', [date, req.query.type, req.afterFuncOne.DateID, req.query.turn_type],function (err) {
          if (err) {
            throw err;
          }
          let result =JSON.stringify({
            ID:this.lastID,
            DateID:req.afterFuncOne.DateID,
            DateValue:req.afterFuncOne.DateValue,
            time:date,
            type:req.query.type,
            turn_type:req.query.turn_type
          });
          wss.broadcast(result)
        })
    })


  res.send('all ok');
}

app.get('/post/turn/webApi',[funcOne,funcTwo,funcThree])

/*app.get('/post/turn/webApi', function (req, res) {
    var db = new sqlite3.Database('./diplomTest.db')
    db.serialize(function () {
        let b = new Date();
        let date = b.getDate() + '-' + (b.getMonth() + 1) + '-' + b.getFullYear()

        let turn_type = '';


        turn_type = req.query.turn_type;
        //TODO: додати перевірку дати


        let perem;
        new Promise((resolve, reject) => {
             db.all("SELECT * From Date_table where Date like ?", [date], function (err, rows) {
                 if (err) {
                     throw err;
                 }
                 if (rows.length) {
                     resolve({DateID: rows[0].ID, needToCreateDateID: false})
                 }
                 else {
                     resolve({DateID: null, needToCreateDateID: true})
                 }
             })
         }).then(data => {
             if (data.needToCreateDateID) {
                 db.run('INSERT INTO Date_table (Date) VALUES (?)', [date], function (err, ff) {
                     if (err) {
                         throw err;
                     }
                     data.DateID = this.lastID
                     resolve(data)
                 })
             } else {
                 resolve(data)
             }

         }).then(data => {
             db.run('INSERT INTO statistic (time,type,Date_ID,turn_type) VALUES (?,?,?,?)', [1, 'web_api_w', data.DateID, turn_type])
         }).then(data => {
             db.close();
             wss.broadcast(date);
             res.send('Page Pattern Match');
         })


    })
})*/

app.post('/post_me', function (req, res) {
    res.send('Page Pattern Match');
})


const wss = new WebSocket.Server({server});

wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
};

wss.on('connection', (ws) => {

    //connection is up, let's add a simple simple event
    ws.on('message', (message) => {

        //log the received message and send it back to the client
        console.log('received: %s', message);
        //ws.send(JSON.stringify({ff:`Hello, you sent -> ${message}`}));
    });

    //send immediatly a feedback to the incoming connection
    //ws.send('Hi there, I am a WebSocket server');
});


// This responds a DELETE request for the /del_user page.
app.get('/del_user', function (req, res) {
    var db = new sqlite3.Database('./diplomTest.db')


    db.close();
    res.send('Page Pattern Match');
})




