import React from "react";
import {connect} from "react-redux";
import {loadDateList} from '../store/actions.js'
import DateList from './DateList.jsx'

const mapStateToProps = state => ({
    dateList: state.dateView.dateList,
    currentDateID: state.dateView.currentDateID,
    dateStatistic: state.dateView.dateStatistic,
})
const mapDispatchToProps = dispatch => ({
    loadDateList: () => dispatch(loadDateList())
})


class LeftMenu extends React.Component {
    constructor() {
        super();

    }

    componentDidMount() {
        this.props.loadDateList();

        /*fetch('/post_me',{
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({a: 1, b: 2})
        }).then(res=>{
            return res.text()
        }).then(data=>{
            debugger
        })*/
    }

    render() {
        return <div id="left_date_list_menu">
            <div
                style={{
                    height: '40px',
                    padding: '5px 20px',
                    fontSize: '25px'
                }}>Виключена </div>
            <div id="left_date_list_search">
                <div className="date_picker"></div>
                <div>Виберіть дату</div>
                <div className="arrow_down"></div>
                <div className="arrow_top"></div>
            </div>

            {this.props.dateList.map(el => <DateList date={el.Date} key={el.ID} ID={el.ID} isLoaded={el.isLoaded}/>)}

        </div>
    }
}

export default LeftMenu = connect(mapStateToProps, mapDispatchToProps)(LeftMenu)
