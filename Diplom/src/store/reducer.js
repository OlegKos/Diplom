import {CHANGE_CHOSEN_DATE, LOAD_DATA_BY_DATE, LOAD_DATE_LIST,ADD_DATA_IN_DATE} from './actions.js';
import {combineReducers} from 'redux';


const initialState = {
    currentDateID: null,
    dateList: [],//structure:  ID:{dateVal:'',}
    mainContentData: [],
    dateStatistic: {}

}

function dateView(state = initialState, action) {
    switch (action.type) {
        case CHANGE_CHOSEN_DATE:
            return Object.assign({},
                state,
                {
                    currentDateID: action.ID
                })
            break;

        case `${LOAD_DATA_BY_DATE}_SUCCESS`:
            return Object.assign({},state,{
                currentDateID: action.ID,
                dateList:state.dateList.map(el=>{
                    if(el.ID === action.ID ){
                        el.isLoaded = true;
                    }
                    return el
                }),
                dateStatistic:Object.assign({},state.dateStatistic,{[action.ID]:action.data})
            })
            break;

      case ADD_DATA_IN_DATE:
            return Object.assign({},state,{
                dateStatistic:Object.assign({},state.dateStatistic,{[action.ID]:[...state.dateStatistic[action.ID],action.data]})
            })
            break;


        case `${LOAD_DATE_LIST}_SUCCESS`:
            return Object.assign({}, state, {dateList: action.data})
            break;


        default:
            return state;
    }

}

const dateViewApp = combineReducers({
    dateView
});


export default dateViewApp;
