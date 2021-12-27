import React from "react";

import MarsMap from "./MarsMap";
import EarthMap from "./EarthMap";
import Mars from "./CurrentWeather/Mars";

class MarsWeather extends React.Component<{}, State> {
  render() {
    return (
      <div>
        <Mars />
        <EarthMap />
        <MarsMap />
      </div>
    );
  }
}

export default MarsWeather;
