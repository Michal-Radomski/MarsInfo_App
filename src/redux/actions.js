import axios from "axios";

// Action types
export const SET_APOD_DATE = "SET_APOD_DATE";

export const GET_USER_GEO_DATA = "GET_USER_GEO_DATA";

// Action creator GetUserGeoDate
// export const GetUserGeoDate = () => {
//   console.log("test1");
//   return async function (dispatch) {
//     console.log("test2");
//     await axios({
//       method: "GET",
//       url: `https://ipwhois.app/json/?objects=ip,country,city,latitude,longitude`,
//     })
//       .then((response) => {
//         console.log("Fetched geolocation data:", response.data);
//         dispatch({type: GET_USER_GEO_DATA, payload: response.data});
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
// };

export const GetUserGeoDate = () => {
  console.log("test1");
  return async (dispatch) => {
    try {
      console.log("test2");
      const {data} = await axios.get(`https://ipwhois.app/json/?objects=ip,country,city,latitude,longitude`);
      console.log(data);
      dispatch({type: GET_USER_GEO_DATA, payload: data});
    } catch (error) {
      console.log(error);
    }
  };
};

// export const GetUserGeoDate = () => (dispatch) => {
//   console.log("test1");
//   axios
//     .get("https://ipwhois.app/json/?objects=ip,country,city,latitude,longitude")
//     .then((response) => dispatch({type: GET_USER_GEO_DATA, payload: response.data}))
//     .then((response) => console.log(response))
//     .catch((error) => {
//       console.log(error);
//     });
// };
