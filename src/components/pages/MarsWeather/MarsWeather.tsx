import React from "react";
import {connect} from "react-redux";

import MarsMap from "./MarsMap";
import EarthMap from "./EarthMap";
import {GetUserGeoDate} from "../../../redux/actions";

class MarsWeather extends React.Component<any, any> {
  componentDidMount() {
    console.log("this.props:", this.props);
    this.props.GetUserGeoDate();
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

export default connect(mapStateToProps, {GetUserGeoDate})(MarsWeather);
