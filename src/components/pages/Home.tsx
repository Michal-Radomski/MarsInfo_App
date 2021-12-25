import React from "react";
import {connect} from "react-redux";

import NASA from "./NASA/NASA";
import {getUserGeoDate} from "../../redux/actions";

class Home extends React.Component<{getUserGeoDate: Fetch; state: State}, State> {
  componentDidMount() {
    this.props.getUserGeoDate();
    console.log("this.props:", this.props);
  }

  componentDidUpdate() {
    console.log("this.props-updated:", this.props);
    localStorage.setItem("longitude", JSON.stringify(this.props.state.location.longitude));
    localStorage.setItem("latitude", JSON.stringify(this.props.state.location.latitude));
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
