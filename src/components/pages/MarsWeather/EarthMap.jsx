import React from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM_source from "ol/source/OSM";

class EarthMap extends React.Component {
  state = {center: [0, 0], zoom: 1};

  OL_Map = new Map({
    target: null,
    layers: [
      new TileLayer({
        source: new OSM_source(),
      }),
    ],
    view: new View({
      center: this.state.center,
      zoom: this.state.zoom,
    }),
  });

  componentDidMount() {
    this.OL_Map.setTarget("map");
  }

  render() {
    return <div id="map" style={{width: "100%", height: "400px"}}></div>;
  }
}

export default EarthMap;
