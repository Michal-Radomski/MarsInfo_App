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

// Constant variables
const infoVehicles = {
  PerseveranceMarsRover: {
    launchDate: "30 July 2020, 11:50:00 UTC" as string,
    landingSite: "Jezero Crater" as string,
    coordinates: "18.4447°N, 77.4508°E" as string,
    landingDate: "18 February 2021, 20:55 UTC" as string,
  },
  CuriosityMarsRover: {
    launchDate: "26 November 2011, 15:02:00 UTC" as string,
    landingSite: "Gale Crater" as string,
    coordinates: "4.5895°S, 137.4417°E" as string,
    landingDate: "6 August 2012, 05:17 UTC" as string,
  },
  InSightMarsLander: {
    launchDate: "5 May 2018, 11:05:01 UTC" as string,
    landingSite: "Elysium Planitia" as string,
    coordinates: "4.5024°N 135.6234°E" as string,
    landingDate: "26 November 2018, 19:52:59 UTC" as string,
  },
};

// CombineReducer (Reducer/index.js)
const rootReducer = combineReducers({
  rootReducer: reducer,
  vehiclesInfo: (state = infoVehicles) => state,
});

export default rootReducer;
