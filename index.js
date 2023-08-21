import { createStore } from 'redux';
const store = createStore(reducer);

//reducer
function reducer(state={amount:1}, action) {
    if(action.type==='increment'){
        return {amount:state.amount+1};
    }
    return  state ;
}
//global this.state
console.log(store.getState())
store.dispatch({type:'increment'})
console.log(store.getState())

 