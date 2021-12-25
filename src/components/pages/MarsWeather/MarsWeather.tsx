import React from "react";

import MarsMap from "./MarsMap";
import EarthMap from "./EarthMap";

class MarsWeather extends React.Component<{}, State> {
  render() {
    return (
      <div>
        <EarthMap />
        <MarsMap />
      </div>
    );
  }
}

export default MarsWeather;
