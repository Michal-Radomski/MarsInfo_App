import React from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import {fromLonLat} from "ol/proj";
import Overlay from "ol/Overlay";
import {connect} from "react-redux";
import styled from "styled-components";

const DivMap = styled.div`
  position: absolute;
  top: 110px;
  left: 5px;
  right: 5px;
  width: calc(100% -10px);
`;

class EarthMap extends React.Component {
  constructor(props) {
    // console.log("props.location:", props.location);
    super(props);

    let zoomNext;
    if (props.location.center[0] === 0 && props.location.center[1] === 0) {
      zoomNext = 1;
    } else {
      zoomNext = 10;
    }
    // console.log("zoomNext:", zoomNext);

    this.state = {center: props.location.center, zoom: zoomNext};
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

    this.marker = new Overlay({
      position: fromLonLat(this.state.center),
      positioning: "center-center",
      element: document.getElementById("marker"),
      stopEvent: false,
    });
    // console.log("this.marker:", this.marker);
    this.OL_Map.setTarget(mapNode);
    if (this.state.center[0] !== 0 || this.state.center[1] !== 0) {
      this.OL_Map.addOverlay(this.marker);
    }
    // console.log("this.OL_Map:", this.OL_Map);
  }

  render() {
    return (
      <React.Fragment>
        {this.state.center[0] !== 0 && this.state.center[1] !== 0 ? (
          <DivMap>
            <h1 style={{textAlign: "center"}}>Your location: {`${this.state.center[0]}, ${this.state.center[1]}`}</h1>
            <div id="olMap" ref={this.mapRef} style={{height: "250px"}}></div>
            <div
              id="marker"
              title={this.state.center}
              style={{
                width: "20px",
                height: "20px",
                border: "2px solid #088",
                borderRadius: "10px",
                backgroundColor: "#0FF",
                opacity: "0.5",
              }}
            />
          </DivMap>
        ) : (
          <DivMap>
            <h2 style={{textAlign: "center"}}>Your location is unknown </h2>
            <div id="olMap" ref={this.mapRef} style={{height: "250px"}}></div>
          </DivMap>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {location: state.location};
};

export default connect(mapStateToProps, null)(EarthMap);
