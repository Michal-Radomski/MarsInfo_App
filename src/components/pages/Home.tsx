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
    localStorage.setItem("latitude", JSON.stringify(this.props.state.location.latitude));
    localStorage.setItem("longitude", JSON.stringify(this.props.state.location.longitude));
    localStorage.setItem("city", JSON.stringify(this.props.state.location.city));
    localStorage.setItem("country", JSON.stringify(this.props.state.location.country));
    localStorage.setItem("IP", JSON.stringify(this.props.state.location.ip));
    localStorage.setItem("country_flag", JSON.stringify(this.props.state.location.country_flag));
    localStorage.setItem("currency", JSON.stringify(this.props.state.location.currency));
    localStorage.setItem("currency_code", JSON.stringify(this.props.state.location.currency_code));
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
  state: state,
});

export default connect(mapStateToProps, {getUserGeoData})(Home);
