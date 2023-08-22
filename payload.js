import { createStore } from "redux";

// Action types
const GET_PRODUCTS = "GET_PRODUCTS";
const ADD_PRODUCT = "ADD_PRODUCT";
const REMOVE_PRODUCT = "REMOVE_PRODUCT";

// Initial state
const initialProductState = {
  products: ["sugar", "salt"],
  numberOfProducts: 2,
};

// Action creators
const getProductAction = () => {
  return {
    type: GET_PRODUCTS,
  };
};

const addProductAction = (product) => {
  return {
    type: ADD_PRODUCT,
    payload: product,
  };
};

const removeProductAction = (product) => {
  return {
    type: REMOVE_PRODUCT,
    payload: product,
  };
};

// Reducer
const productsReducer = (state = initialProductState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
      };
    case ADD_PRODUCT:
      return {
        products: [...state.products, action.payload],
        numberOfProducts: state.numberOfProducts + 1,
      };
    case REMOVE_PRODUCT:
      const updatedProducts = state.products.filter(
        (item) => item !== action.payload
      );
      return {
        products: updatedProducts,
        numberOfProducts: state.numberOfProducts - 1,
      };
    default:
      return state;
  }
};

// Create the store
const store = createStore(productsReducer);

// Subscribe to changes in the store and log the state
store.subscribe(() => {
  console.log(store.getState());
});

// Dispatch actions to interact with the store
store.dispatch(getProductAction());
store.dispatch(addProductAction("pen"));
store.dispatch(addProductAction("egg"));
store.dispatch(removeProductAction("salt"));
