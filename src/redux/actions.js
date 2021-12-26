import axios from "axios";

// Action types
export const SET_APOD_DATE = "SET_APOD_DATE";
export const GET_USER_GEO_DATA = "GET_USER_GEO_DATA";

// Action creator getUserGeoDate
export const getUserGeoData = () => {
  return async function (dispatch) {
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
