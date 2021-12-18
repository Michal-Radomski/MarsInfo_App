import React from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

class EarthMap extends React.Component {
  state = {center: [0, 0], zoom: 1};
  mapRef = React.createRef();

  OL_Map = new Map({
    target: undefined,
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
    view: new View({
      center: this.state.center,
      zoom: this.state.zoom,
    }),
  });

  componentDidMount() {
    const mapNode = this.mapRef.current;
    // console.log("mapNode:", mapNode);
    this.OL_Map.setTarget(mapNode);
  }

  render() {
    return <div ref={this.mapRef} style={{width: "100%", height: "400px"}}></div>;
  }
}

export default EarthMap;
