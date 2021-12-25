// import {combineReducers} from "redux";

import {SET_APOD_DATE, GET_USER_GEO_DATA} from "./actions";

// Initial Global State
const initialState = {
  location: {
    city: undefined,
    country: undefined,
    ip: undefined,
    latitude: undefined,
    longitude: undefined,
    // center: [18.60677, 54.4047], //- [longitude, latitude]
    zoom: undefined,
  },
};

// Reducer
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_GEO_DATA:
      return {...state, location: action.payload};
    case SET_APOD_DATE:
      return {...state, date: action.payload};

    default:
      return state;
  }
};

// CombineReducer (Reducer/index.js)
// const rootReducer = combineReducers({
//   currencies: currencyReducer,
// });

export default rootReducer;
