import React from "react";
import {connect} from "react-redux";

import NASA from "./NASA/NASA";
import {getUserGeoData} from "../../redux/actions";

class Home extends React.Component<{getUserGeoData: Fetch; state: State}, State> {
  componentDidMount() {
    this.props.getUserGeoData();
    // console.log("this.props.state.location:", this.props.state.location);
  }

  componentDidUpdate() {
    // console.log("this.props.state.location-update:", this.props.state.location);
    // localStorage.setItem("latitude", JSON.stringify(this.props.state.location.latitude));
    // localStorage.setItem("longitude", JSON.stringify(this.props.state.location.longitude));
    // localStorage.setItem("city", JSON.stringify(this.props.state.location.city));
    // localStorage.setItem("country", JSON.stringify(this.props.state.location.country));
    // localStorage.setItem("ip", JSON.stringify(this.props.state.location.ip));
    // localStorage.setItem("country_flag", JSON.stringify(this.props.state.location.country_flag));
    // localStorage.setItem("currency", JSON.stringify(this.props.state.location.currency));
    // localStorage.setItem("currency_code", JSON.stringify(this.props.state.location.currency_code));
    //* The same as above
    // const localStorageEntries = Object.entries(this.props.state.location);
    // // console.log("localStorageEntries:", localStorageEntries);
    // for (let i = 0; i < localStorageEntries.length; i++) {
    //   localStorage.setItem(localStorageEntries[i][0], JSON.stringify(localStorageEntries[i][1]));
    // }
    //* The same as above - one line
    Object.entries(this.props.state.location).forEach((entry) => localStorage.setItem(entry[0], JSON.stringify(entry[1])));
  }

  render() {
    return (
      <>
        <NASA />
      </>
    );
  }
}

const mapStateToProps = (state: State) => ({
  state: state.rootReducer,
});

export default connect(mapStateToProps, {getUserGeoData})(Home);
