import React from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM, {ATTRIBUTION} from "ol/source/OSM";
import {fromLonLat} from "ol/proj";
import Overlay from "ol/Overlay";
import {Attribution, ScaleLine, defaults as defaultControls} from "ol/control";
import {toStringHDMS} from "ol/coordinate";

import {connect} from "react-redux";
import styled from "styled-components";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger, {OverlayTriggerType} from "react-bootstrap/OverlayTrigger";

const DivMap = styled.div`
  position: absolute;
  top: 110px;
  left: 5px;
  right: 5px;
  width: calc(100% -10px);
`;

interface Props {
  state?: {
    location: {
      center: [number, number];
      zoom: undefined | number;
    };
  };
}

class EarthMap extends React.Component<Props, State> {
  mapRef: React.RefObject<HTMLDivElement> | any;
  attribution: Attribution;
  scaleLine: ScaleLine;
  position: string;
  OL_Map: Map;
  popover: JSX.Element;
  marker!: Overlay;
  hover!: OverlayTriggerType[];

  constructor(props: Props) {
    // console.log("props.state.location:", props?.state?.location);
    super(props);

    let zoomNext;
    if (props?.state?.location.center[0] === 0 && props?.state?.location.center[1] === 0) {
      zoomNext = 1;
    } else {
      zoomNext = 10;
    }
    // console.log("zoomNext:", zoomNext);

    this.state = {center: props?.state?.location.center, zoom: zoomNext};
    // console.log("this.state:", this.state);
    this.mapRef = React.createRef();

    this.position = toStringHDMS(this.state.center);
    // console.log("this.position:", this.position);

    this.attribution = new Attribution({
      collapsible: true,
    });
    this.scaleLine = new ScaleLine({
      units: "metric",
    });

    this.OL_Map = new Map({
      controls: defaultControls({attribution: false}).extend([this.attribution, this.scaleLine]),
      target: "olMap",
      layers: [
        new TileLayer({
          source: new OSM({
            attributions: [ATTRIBUTION, `<a href="https://openlayers.org" target="_blank">OpenLayers</a>`],
          }),
        }),
      ],
      view: new View({
        center: fromLonLat(this.state.center),
        zoom: this.state.zoom,
      }),
    });

    this.popover = (
      <Popover id="popover-basic">
        <Popover.Header as="h3">Yor are here:</Popover.Header>
        <Popover.Body>
          Your location is: <strong>{`${this.state.center[0]}, ${this.state.center[1]}`}</strong>.
        </Popover.Body>
      </Popover>
    );
  }

  componentDidMount() {
    const mapNode = this.mapRef.current;
    // console.log("mapNode:", mapNode);

    this.marker = new Overlay({
      position: fromLonLat(this.state.center),
      positioning: "center-center",
      element: document.getElementById("marker") as HTMLDivElement,
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
            <h1 style={{textAlign: "center"}}>Your location: {this.position}</h1>
            <div id="olMap" ref={this.mapRef} style={{height: "250px"}}></div>
            <OverlayTrigger trigger={this.hover} placement="right-end" overlay={this.popover} rootClose={true}>
              <div
                id="marker"
                // title={this.state.center} //- original tooltip
                style={{
                  width: "20px",
                  height: "20px",
                  border: "2px solid #088",
                  borderRadius: "10px",
                  backgroundColor: "#0FF",
                  opacity: "0.5",
                }}
              ></div>
            </OverlayTrigger>
          </DivMap>
        ) : (
          <DivMap>
            <h2 style={{textAlign: "center"}}>Your location is unknown</h2>
            <div id="olMap" ref={this.mapRef} style={{height: "250px"}}></div>
          </DivMap>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: State) => {
  return {state: state};
};

export default connect(mapStateToProps, null)(EarthMap);
