import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

const initialState = {
  count: 0
};

const userInitialState = {
  username: 'jocky'
};

const ADD = 'ADD';

function countReducer(state = initialState, action) {
  console.log("state, action", state, action);

  switch (action.type) {
    case ADD:
      return { count: state.count + (action.num || 1) }
    default:
      return state;
  }
}

const UPDATE_USERNAME = 'UPDATE_USERNAME'
function userReducer(state = userInitialState, action) {
  switch (action.type) {
    case UPDATE_USERNAME:
      return {
        ...state,
        username: action.name
      }
    default:
      return state
  }
}

const allReducer = combineReducers({
  counter: countReducer,
  user: userReducer
})

const store = createStore(
  allReducer,
  {
    counter: initialState,
    user: userInitialState
  },
  applyMiddleware(ReduxThunk)
);

function add(num) {
  return {
    type: ADD,
    num,
  }
}

function addAsync(num) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(add(num))
    }, 2000);
  }
}

store.dispatch(add(3))
store.subscribe(() => {
  console.log("subscribe", store.getState());
})

store.dispatch(addAsync(5))
store.dispatch({
  type: UPDATE_USERNAME,
  name: 'LiLei'
})

export default store;