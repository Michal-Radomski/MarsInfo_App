import React from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM, {ATTRIBUTION} from "ol/source/OSM";
import {fromLonLat} from "ol/proj";
import Overlay from "ol/Overlay";
import {Attribution, ScaleLine, defaults as defaultControls} from "ol/control";
import {toStringHDMS} from "ol/coordinate";
import {defaults} from "ol/interaction";

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
      city: string;
      country: string;
      ip: string;
      latitude: number;
      longitude: number;
      center: [number, number];
      zoom: number;
    };
  };
  getUserGeoDate?: Fetch;
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
    super(props);
    // console.log("props.state.location:", props?.state?.location);
    this.mapRef = React.createRef();

    const savedLatitude = JSON.parse(localStorage.getItem("latitude") as string);
    const savedLongitude = JSON.parse(localStorage.getItem("longitude") as string);
    const savedCity = JSON.parse(localStorage.getItem("city") as string);
    const savedCountry = JSON.parse(localStorage.getItem("country") as string);
    const savedIP = JSON.parse(localStorage.getItem("IP") as string);
    // console.log("savedLatitude & savedLongitude:", savedLatitude, savedLongitude);

    if (savedLatitude && savedLongitude) {
      this.state = {center: [savedLongitude, savedLatitude], zoom: 10, city: savedCity, country: savedCountry, IP: savedIP};
    } else if (props?.state?.location.longitude === undefined && props?.state?.location.latitude === undefined) {
      this.state = {center: [0, 0], zoom: 1}; //- center: [longitude, latitude]
    } else {
      this.state = {
        center: [props?.state?.location.longitude, props?.state?.location.latitude],
        zoom: 10,
        city: props?.state?.location.city,
        country: props?.state?.location.country,
        IP: props?.state?.location.ip,
      }; //- center: [longitude, latitude]
    }
    // console.log("this.state:", this.state);

    this.position = toStringHDMS(this.state.center);
    // console.log("this.position:", this.position);

    this.attribution = new Attribution({
      collapsible: true,
    });
    this.scaleLine = new ScaleLine({
      units: "metric",
    });

    this.OL_Map = new Map({
      interactions: defaults({mouseWheelZoom: false}),
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
        <Popover.Header as="h3">Yor are in: {`${this.state.city}, ${this.state.country}`}</Popover.Header>
        <Popover.Body>
          Your IP is: <strong>{`${this.state.IP}`}</strong>.<br />
          Your location is: <strong>{`${this.state.center[1].toFixed(5)}, ${this.state.center[0].toFixed(5)}`}</strong>.
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
                // title={this.state.center}  //- original tooltip
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
