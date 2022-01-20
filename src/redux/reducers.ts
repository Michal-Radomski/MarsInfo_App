import {combineReducers} from "redux";

import {SET_APOD_DATE, GET_USER_GEO_DATA, GET_USER_WEATHER_CONDITIONS} from "./actions";

// Initial Global State
const initialState: State = {
  NASA_APOD: {
    selectedDate: "" as string,
  },
  location: {
    city: "" as string,
    country: "" as string,
    ip: "0.0.0.0" as string,
    latitude: undefined,
    longitude: undefined,
    country_flag: "" as string,
    currency: "" as string,
    currency_code: "" as string,
  },
  weather: {
    general_description: "" as string,
    current_temp: undefined,
    max_temp: undefined,
    min_temp: undefined,
    pressure: undefined,
    humidity: undefined,
    speedOfWind: undefined,
    directionOfWind: undefined,
    sunrise: undefined,
    sunset: undefined,
    icon: "" as string,
    calculationTime: undefined,
  },
};

// Reducer
const reducer = (state = initialState, action: Dispatch) => {
  switch (action.type) {
    case GET_USER_GEO_DATA:
      return {...state, location: action.payload};
    case SET_APOD_DATE:
      return {...state, NASA_APOD: {selectedDate: action.payload}};
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
