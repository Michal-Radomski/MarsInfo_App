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

import {getUserGeoData} from "../../../redux/actions";

const DivMap = styled.div`
  position: absolute;
  top: 110px;
  left: 5px;
  right: 5px;
  width: calc(100% -10px);
  cursor: pointer;
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
      country_flag: string;
      currency: string;
      currency_code: string;
    };
  };
  getUserGeoData?: Fetch;
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
    const savedCountryFlag = JSON.parse(localStorage.getItem("country_flag") as string);
    // console.log("savedLatitude & savedLongitude:", savedLatitude, savedLongitude);

    if (savedLatitude && savedLongitude) {
      this.state = {
        center: [savedLongitude, savedLatitude],
        zoom: 10,
        city: savedCity,
        country: savedCountry,
        IP: savedIP,
        country_flag: savedCountryFlag,
      };
    } else if (props?.state?.location.longitude === undefined && props?.state?.location.latitude === undefined) {
      this.state = {center: [0, 0], zoom: 1}; //- center: [longitude, latitude]
    } else {
      this.state = {
        center: [props?.state?.location.longitude, props?.state?.location.latitude],
        zoom: 10,
        city: props?.state?.location.city,
        country: props?.state?.location.country,
        IP: props?.state?.location.ip,
        country_flag: props?.state?.location.country_flag,
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
      <Popover id="popover-basic" style={{minWidth: "20%"}}>
        <Popover.Header as="h3">
          Yor are in:
          <span style={{float: "right"}}>
            {`${this.state.city}, ${this.state.country}`}
            {"\u00A0 \u00A0"}
            <img
              src={this.state.country_flag}
              height="16px"
              alt="Country flag"
              style={{marginBottom: "5px", border: "1px solid #666"}}
            />
          </span>
        </Popover.Header>
        <Popover.Body>
          Your IP is: <strong style={{float: "right"}}>{`${this.state.IP}`}</strong>
          <br />
          Your location is:
          <strong style={{float: "right"}}>{`${this.state.center[1].toFixed(5)}, ${this.state.center[0].toFixed(
            5
          )}`}</strong>
        </Popover.Body>
      </Popover>
    );
  }

  componentDidMount() {
    if (this.props?.state?.location.longitude === undefined && this.props?.state?.location.latitude === undefined) {
      this.props.getUserGeoData();
    }

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

  componentDidUpdate() {
    localStorage.setItem("latitude", JSON.stringify(this.props.state?.location.latitude));
    localStorage.setItem("longitude", JSON.stringify(this.props.state?.location.longitude));
    localStorage.setItem("city", JSON.stringify(this.props.state?.location.city));
    localStorage.setItem("country", JSON.stringify(this.props.state?.location.country));
    localStorage.setItem("IP", JSON.stringify(this.props.state?.location.ip));
    localStorage.setItem("country_flag", JSON.stringify(this.props.state?.location.country_flag));
    localStorage.setItem("currency", JSON.stringify(this.props.state?.location.currency));
    localStorage.setItem("currency_code", JSON.stringify(this.props.state?.location.currency_code));
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

export default connect(mapStateToProps, {getUserGeoData})(EarthMap);
