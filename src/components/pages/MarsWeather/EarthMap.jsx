import React from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import {fromLonLat} from "ol/proj";
import Overlay from "ol/Overlay";
import {connect} from "react-redux";

class EarthMap extends React.Component {
  constructor(props) {
    // console.log("props.location:", props.location);
    super(props);
    this.state = {center: props.location.center, zoom: props.location.zoom};
    // console.log("this.state:", this.state);
    this.mapRef = React.createRef();

    this.OL_Map = new Map({
      target: "olMap",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat(this.state.center),
        zoom: this.state.zoom,
      }),
    });
  }

  componentDidMount() {
    const mapNode = this.mapRef.current;
    // console.log("mapNode:", mapNode);
    this.OL_Map.setTarget(mapNode);

    this.marker = new Overlay({
      position: fromLonLat(this.state.center),
      positioning: "center-center",
      element: document.getElementById("marker"),
      stopEvent: false,
    });
    console.log(this.marker);

    this.OL_Map.addOverlay(this.marker);
    console.log(this.OL_Map);
  }

  render() {
    return (
      <React.Fragment>
        <div
          div="olMap"
          ref={this.mapRef}
          style={{width: "100%", height: "200px", position: "absolute", top: "800px"}}
        ></div>

        <div
          id="marker"
          title={this.state.center}
          style={{
            width: "20px",
            height: "20px",
            border: "1px solid #088",
            borderRadius: "10px",
            backgroundColor: "#0FF",
            opacity: "0.5",
          }}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {location: state.location};
};

export default connect(mapStateToProps, null)(EarthMap);
