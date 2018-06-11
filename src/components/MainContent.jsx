import React from 'react';

import DataTable from './DataTable.jsx';
import {changeChosenDate,addDataInDate} from "../store/actions";
import {connect} from "react-redux";


class MainContent extends React.Component {
    constructor(props){
        super(props);
        let self= this;

      var ws = new WebSocket('ws://localhost:8081');
      // event emmited when connected
      ws.onopen = function () {
        console.log('websocket is connected ...')
        // sending a send event to websocket server
        ws.send('connected')
      }
      // event emmited when receiving message
      ws.onmessage = function (ev) {
        console.log(ev);
        let vv = JSON.parse(ev.data);
        console.log(vv);
        self.props.addDataInDate(vv.DateID,{ID:vv.ID,type:vv.type,time:vv.time,turn_type:vv.turn_type})

      }

    }
    render() {
        let data = {
            time: 'Час включення',
            turn_type: 'Час роботи',
            type: 'Тип вкл/викл',
        }

        return <div id="main_content">
            <DataTable data={data}/>

            {this.props.dateStatistic && this.props.currentDateID &&
            this.props.dateStatistic[this.props.currentDateID].map(el=>{
                return <DataTable data={el} key={el.ID}/>
            })}


        </div>
    }
}


const mapStateToProps = state => ({
    currentDateID: state.dateView.currentDateID,
    dateStatistic: state.dateView.dateStatistic
})

const mapDispatchToProps = dispatch => ({
    changeChosenDate: (id, isLoaded) => dispatch(changeChosenDate(id, isLoaded)),
  addDataInDate:(id,data)=>dispatch(addDataInDate(id,data))
})

export default MainContent = connect(mapStateToProps, mapDispatchToProps)(MainContent)
