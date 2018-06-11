export const CHANGE_CHOSEN_DATE = 'CHANGE_CHOSEN_DATE';
export const LOAD_DATA_BY_DATE = 'LOAD_DATA_BY_DATE';
export const LOAD_DATE_LIST = 'LOAD_DATE_LIST';
export const ADD_DATA_IN_DATE = 'ADD_DATA_IN_DATE';


export function changeChosenDate(id, isLoaded) {

  if (isLoaded) {
    return {
      type: CHANGE_CHOSEN_DATE,
      ID: id,
    };
  } else {
    return dispatch => {
      new Promise((resolve, reject) => {
        fetch(`get_statistic?ID=${id}`).then(res => {
          if (!res.ok) {
            res.text().then(textErr => {
              reject(textErr);
            });
          } else {
            resolve(res.json());
          }
        });
      }).then(data => {
        dispatch(loadByDateSuccess(data, id));
      }).catch(error => {
        console.log(error);
        dispatch(loadByDateError());
      });
    };
  }

}

function loadByDateSuccess(data, id) {
  return {
    type: `${LOAD_DATA_BY_DATE}_SUCCESS`,
    data: data,
    ID: id,
  };
}

function loadByDateError() {
  return {
    type: `${LOAD_DATA_BY_DATE}_ERROR`,
  };
}


function loadDateListSucces(data) {
  return {
    type: `${LOAD_DATE_LIST}_SUCCESS`,
    data: data,
  };
}

export function addDataInDate(id, data) {
  return {
    type: ADD_DATA_IN_DATE,
    data: data,
    ID: id,
  };
}

export function loadDateList() {
  return dispatch => {
    fetch('/get_dateList').then(res => {
      return res.json();
    }).then(data => {
      dispatch(loadDateListSucces(data));
      dispatch(changeChosenDate('dd'));
    });


  };

}
