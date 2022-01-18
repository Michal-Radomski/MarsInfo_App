import {combineReducers} from "redux";

import {SET_APOD_DATE, GET_USER_GEO_DATA, GET_USER_WEATHER_CONDITIONS} from "./actions";

// Initial Global State
const initialState: State = {
  location: {
    city: undefined,
    country: undefined,
    ip: undefined,
    latitude: undefined,
    longitude: undefined,
    country_flag: undefined,
    currency: undefined,
    currency_code: undefined,
  },
  weather: {
    general_description: undefined,
    current_temp: undefined,
    max_temp: undefined,
    min_temp: undefined,
    pressure: undefined,
    humidity: undefined,
    speedOfWind: undefined,
    directionOfWind: undefined,
    sunrise: undefined,
    sunset: undefined,
  },
};

// Reducer
const reducer = (state = initialState, action: Dispatch) => {
  switch (action.type) {
    case GET_USER_GEO_DATA:
      return {...state, location: action.payload};
    case SET_APOD_DATE:
      return {...state, date: action.payload};
    case GET_USER_WEATHER_CONDITIONS:
      return {...state, weather: action.payload};

    default:
      return state;
  }
};

// CombineReducer (Reducer/index.js)
const rootReducer = combineReducers({
  rootReducer: reducer,
});

export default rootReducer;
