// import NASA from "./NASA/NASA";

// const Home = (): JSX.Element => {
//   return (
//     <>
//       <NASA />
//     </>
//   );
// };

// export default Home;

import React from "react";
import {connect} from "react-redux";

import NASA from "./NASA/NASA";
import {getUserGeoDate} from "../../redux/actions";

class Home extends React.Component<{getUserGeoDate: Fetch}, State> {
  componentDidMount() {
    this.props.getUserGeoDate();
    console.log("this.props:", this.props);
  }
  componentDidUpdate() {
    console.log("this.props:", this.props);
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
  state: state.location,
});

export default connect(mapStateToProps, {getUserGeoDate})(Home);
