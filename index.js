import { createStore , applyMiddleware} from 'redux';
import logger from 'redux-logger';
// Constants for action types
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const INCREMENT_BY_AMOUNT = 'INCREMENT_BY_AMOUNT';
const store = createStore(counterReducer,applyMiddleware(logger.default));
const history=[] 

//reducer
function counterReducer(state={balance:0}, action) {
    switch (action.type) {
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
// Action creators
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
store.dispatch(incrementByAmount(50))
}, 3000);

 