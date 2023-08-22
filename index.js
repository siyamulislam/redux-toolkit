import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import axios from 'axios';

// Constants for action types
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const INCREMENT_BY_AMOUNT = 'INCREMENT_BY_AMOUNT';
const INIT_USER = 'INIT_USER';

const store = createStore(counterReducer, applyMiddleware(logger.default,thunk.default));
const history = []
let isFetching = false;

//reducer
function counterReducer(state = { balance: 0 }, action) {
  switch (action.type) {

    case INIT_USER:
      return { balance: action.payload }
    case INCREMENT:
      return { balance: state.balance + 1 };
    case DECREMENT:
      return { balance: state.balance - 1 };
    case INCREMENT_BY_AMOUNT:
      return { balance: state.balance + action.payload };
    default:
      return state;
  }
}
//global this.state

// store.subscribe(()=>{
//     history.push(store.getState())
//     console.log(history)
//     // console.log(store.getState())
// })

// Async action
function getUser(id) {
  return async (dispatch, getState) => {
    if (!isFetching) {
      isFetching = true; // Set the flag to true
      try {
        const { data } = await axios.get(`http://localhost:3000/accounts/${id}`);
        dispatch(initUser(data.balance));
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        isFetching = false; // Set the flag back to false after the dispatch is done
      }
    }
  };
}



// Action creators

 function initUser(value) {
  return { type: INIT_USER, payload: value };
}

function increment() {
  return { type: INCREMENT };
}

function decrement() {
  return { type: DECREMENT };
}

function incrementByAmount(value) {
  return { type: INCREMENT_BY_AMOUNT, payload: value };
}


// Set up an interval to dispatch actions
setInterval(() => {
  // store.dispatch({type: increment})
  // store.dispatch({type: decrement})
  // store.dispatch({type: incrementByAmount, payload:90})
  // store.dispatch(incrementByAmount(50))
  store.dispatch(getUser(2))
}, 3000);

