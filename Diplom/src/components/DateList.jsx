import {changeChosenDate} from "../store/actions";
import React from "react";
import {connect} from "react-redux";

function DateList(props) {

        let classN = 'date_list_element' + ((props.ID === props.currentDateID)?' active':'');
        return <div className={classN}
                    onClick={() => props.changeChosenDate(props.ID, props.isLoaded)}>
            <div className='date_list_element_container'>
                <div className='date_list_element_content'>
                    <h1>{props.date}</h1>
                </div>
            </div>
        </div>
}

const mapStateToProps = state => ({
    currentDateID: state.dateView.currentDateID,
})

const mapDispatchToProps = dispatch => ({
    changeChosenDate: (id, isLoaded) => dispatch(changeChosenDate(id, isLoaded))
})
export default DateList = connect(mapStateToProps, mapDispatchToProps)(DateList)
