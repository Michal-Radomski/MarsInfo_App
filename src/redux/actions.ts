import axios from "axios";

// Action types
export const SET_APOD_DATE = "SET_APOD_DATE";
export const GET_USER_GEO_DATA = "GET_USER_GEO_DATA";
export const GET_USER_WEATHER_CONDITIONS = "GET_USER_WEATHER_CONDITIONS";
export const GET_COVID_DATA = "GET_COVID_DATA";
export const GET_RATES_DATA = "GET_RATES_DATA";
export const SET_ACTIVE_TAB = "SET_ACTIVE_TAB";
export const SET_MARS_PICTURES_TO_STORE = "SET_MARS_PICTURES_TO_STORE";

// Action creator getUserGeoDate
export const getUserGeoData = () => {
  return async function (dispatch: Dispatch) {
    try {
      const {data} = await axios.get(
        `https://ipwhois.app/json/?objects=ip,country,city,latitude,longitude,country_flag,currency_code,currency`
      );
      // console.log("Fetched geolocation data:", data);
      dispatch({type: GET_USER_GEO_DATA, payload: data});
    } catch (error) {
      console.log(error);
    }
  };
};

// Other Action Creators
export const setAPOD_Date = (selectedDate: string) => (dispatch: Dispatch) => {
  dispatch({type: SET_APOD_DATE, payload: selectedDate});
};
