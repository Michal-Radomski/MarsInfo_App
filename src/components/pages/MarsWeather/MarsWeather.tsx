import React from "react";
import {connect} from "react-redux";

import MarsMap from "./MarsMap";
import EarthMap from "./EarthMap";
import {getUserGeoDate} from "../../../redux/actions";

class MarsWeather extends React.Component<{getUserGeoDate: Fetch}, State> {
  // componentDidMount() {
  //   this.props.getUserGeoDate();
  //   // console.log("this.props:", this.props);
  // }
  // componentDidUpdate() {
  //   console.log("this.props:", this.props);
  // }
  render() {
    return (
      <div>
        <EarthMap />
        <MarsMap />
      </div>
    );
  }
}

// const mapStateToProps = (state: State) => ({
//   state: state.location,
// });

// export default connect(mapStateToProps, {getUserGeoDate})(MarsWeather);
export default MarsWeather;
