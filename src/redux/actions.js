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
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Fetched geolocation data:", data);
//         dispatch({type: GET_USER_GEO_DATA, payload: data});
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
// };

export const GetUserGeoDate = async () => {
  console.log("test1");
  try {
    const response = await axios({
      method: "GET",
      url: `https://ipwhois.app/json/?objects=ip,country,city,latitude,longitude`,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
