import { createStore ,applyMiddleware} from "redux";
import logger from "redux-logger";
// product constants
const GET_PRODUCTS = "GET_PRODUCTS";
const ADD_PRODUCTS = "ADD_PRODUCTS";
const REMOVE_PRODUCTS = "REMOVE_PRODUCTS";

// product states
const initialProductState = {
  products: ["sugar", "salt"],
  numberOfProducts: 2,
};

// product actions
const getProductAction = () => {
  return {
    type: GET_PRODUCTS,
  };
};
const addProductAction = (product) => {
  return {
    type: ADD_PRODUCTS,
    payload: product,
  };
};
const removeProductAction = (product) => {
  return {
    type: REMOVE_PRODUCTS,
    payload: product,
  };
};

const productsReducer = (state = initialProductState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
      };
    case ADD_PRODUCTS:
      return {
        products: [...state.products, action.payload],
        numberOfProducts: state.numberOfProducts + 1,
      };
    case REMOVE_PRODUCTS:
        const updatedProducts=state.products.filter((item)=> item!==action.payload );
      return {
        products: updatedProducts,
        numberOfProducts: state.numberOfProducts - 1,
    };
    default:
      return state;
  }
};

const store = createStore(productsReducer, applyMiddleware(logger.default));

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(getProductAction());
store.dispatch(addProductAction("pen"));
store.dispatch(addProductAction("egg"));
store.dispatch(removeProductAction("pen"));