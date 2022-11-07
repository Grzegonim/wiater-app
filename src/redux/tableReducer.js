import { API_URL } from "../config";
//selectors
export const getTables = state => state.tables;
export const getTableById = ({ tables }, tableId) => tables.find(table => table.id.toString() === tableId.toString());

//actions
const createActionName = actionName => `app/tables/${actionName}`;
const UPDATE_TABLES = createActionName('UPDATE_TABLES');
const EDIT_TABLE = createActionName('EDIT_TABLE');
const ADD_TABLE = createActionName('ADD_TABLE');
const REMOVE_TABLE = createActionName('REMOVE_TABLE');

//action creators 
export const updateTables = payload => ({ type: UPDATE_TABLES, payload });
export const editTable = payload => ({ type: EDIT_TABLE, payload });
export const addTable = payload => ({ type: ADD_TABLE, payload });
export const removeTable = payload => ({ type: REMOVE_TABLE, payload });

export const fetchTables = () => {
  return (dispatch) => {
    fetch(API_URL + '/tables')
      .then(res => res.json())
      .then(tables => dispatch(updateTables(tables)))
  };
};
export const editTableRequest = (newTable) => {
  return (dispatch) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTable),
    };

    fetch(API_URL + '/tables/' + newTable.id, options)
    .then(() => dispatch(updateTables(newTable)))
  }
};

export const addTableRequest = (newTable) => {
  return (dispatch) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTable),
    };

    fetch(API_URL + '/tables', options)
    .then(res => res.json())
    .then(tables => dispatch(addTable(newTable)))
  }
};

export const removeTableRequest = (newTable) => {
  return (dispatch) => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    };

    fetch(API_URL + '/tables/' + newTable, options)
    .then(res => res.json())
    .then(tables => dispatch(removeTable(newTable)))
  }
}

const tablesReducer = (statePart = [], action) => {
  switch (action.type){
    case UPDATE_TABLES:
      return [...action.payload]
    case EDIT_TABLE: 
      return statePart.map(table => (table.id === action.payload.id ? { ...table, ...action.payload } : table));
    case REMOVE_TABLE:
      return statePart.filter(table => (table.id !== action.payload));
    case ADD_TABLE:
      return [...statePart,  ...action.payload ]
    default:
      return statePart;
  };
};

export default tablesReducer;