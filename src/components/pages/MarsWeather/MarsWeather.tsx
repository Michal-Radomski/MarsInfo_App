import React from "react";
import {connect} from "react-redux";

import MarsMap from "./MarsMap";
import EarthMap from "./EarthMap";
import {getUserGeoDate} from "../../../redux/actions";

class MarsWeather extends React.Component<{getUserGeoDate: Fetch}, State> {
  componentDidMount() {
    // console.log("this.props:", this.props);
    this.props.getUserGeoDate();
  }
  render() {
    return (
      <div>
        <EarthMap />
        <MarsMap />
      </div>
    );
  }
}

const mapStateToProps = (state: State) => ({
  state: state.location,
});

export default connect(mapStateToProps, {getUserGeoDate})(MarsWeather);
