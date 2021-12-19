import {createStore} from "redux";

const initialState = {
  location: {
    center: [18, 54],
    zoom: undefined,
  },
};

const reducer = (state = initialState, action) => {
  return state;
};

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
