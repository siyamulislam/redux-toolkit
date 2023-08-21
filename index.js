import { createStore } from 'redux';
const store = createStore(reducer);
const history=[]
//reducer
function reducer(state={bal:0}, action) {
    if(action.type==='increment'){
        return {bal:state.bal+1};
    // state.bal=state.bal+1;
    }
    return  state ;
}
//global this.state

store.subscribe(()=>{
    history.push(store.getState())
    console.log(history)
    // console.log(store.getState())
})
setInterval(() => {
store.dispatch({type:'increment'})
}, 1000);

 