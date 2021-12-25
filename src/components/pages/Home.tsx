import React from "react";
import {connect} from "react-redux";

import NASA from "./NASA/NASA";
import {getUserGeoDate} from "../../redux/actions";

class Home extends React.Component<{getUserGeoDate: Fetch; state: State}, State> {
  componentDidMount() {
    this.props.getUserGeoDate();
    // console.log("this.props.state.location:", this.props.state.location);
  }

  componentDidUpdate() {
    // console.log("this.props.state.location-updated:", this.props.state.location);
    localStorage.setItem("latitude", JSON.stringify(this.props.state.location.latitude));
    localStorage.setItem("longitude", JSON.stringify(this.props.state.location.longitude));
    localStorage.setItem("city", JSON.stringify(this.props.state.location.city));
    localStorage.setItem("country", JSON.stringify(this.props.state.location.country));
    localStorage.setItem("IP", JSON.stringify(this.props.state.location.ip));
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

export default connect(mapStateToProps, {getUserGeoDate})(Home);
