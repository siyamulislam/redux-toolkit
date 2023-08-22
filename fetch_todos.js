import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import axios from 'axios';

// Constants
const GET_TODOS_REQUEST = 'GET_TODOS_REQUEST';
const GET_TODOS_SUCCESS = 'GET_TODOS_SUCCESS';
const GET_TODOS_FAILED = 'GET_TODOS_FAILED';
const API_URL = 'https://jsonplaceholder.typicode.com/todos';

// Initial state
const initialTodoState = {
    todos: [],
    isLoading: false,
    error: null,
};

// Actions
const getTodosRequest = () => {
    return { type: GET_TODOS_REQUEST };
};
const getTodosSuccess = (todos) => {
    return { type: GET_TODOS_SUCCESS, payload: todos };
};
const getTodosFailed = (error) => {
    return { type: GET_TODOS_FAILED, payload: error };
};

// Reducer
const todosReducer = (state = initialTodoState, action) => {
    switch (action.type) {
        case GET_TODOS_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case GET_TODOS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                todos: action.payload,
                error: null,
            };
        case GET_TODOS_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

// Async action creator
const fetchData = () => {
    return (dispatch) => {
        dispatch(getTodosRequest());
        axios.get(API_URL)
            .then((res) => {
                const todos = res.data;
                const titles= todos.map(todo => todo.title)
                dispatch(getTodosSuccess(titles)); // Dispatch success action with data
            })
            .catch((error) => {
                dispatch(getTodosFailed(error.message)); // Dispatch error action with error message
            });
    };
};

// Store
const store = createStore(todosReducer, applyMiddleware(thunk.default));

// Subscribe to changes in the store
store.subscribe(() => {
    console.log(store.getState());
});

// Dispatch fetchData action
store.dispatch(fetchData()); // This triggers the async action
