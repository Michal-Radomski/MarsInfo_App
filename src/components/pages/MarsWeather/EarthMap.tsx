// React + Redux + Other libraries
import React from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger, {OverlayTriggerType} from "react-bootstrap/OverlayTrigger";

// OpenLayers
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM, {ATTRIBUTION} from "ol/source/OSM";
import {fromLonLat} from "ol/proj";
import Overlay from "ol/Overlay";
import {Attribution, ScaleLine, defaults as defaultControls} from "ol/control";
import {toStringHDMS} from "ol/coordinate";
import {defaults, MouseWheelZoom} from "ol/interaction";
import LayerGroup from "ol/layer/Group";
import XYZ from "ol/source/XYZ";
import {platformModifierKeyOnly} from "ol/events/condition";
import "ol/ol.css";

// OpenLayers Switcher
import LayerSwitcher from "ol-layerswitcher";
import {BaseLayerOptions, GroupLayerOptions} from "ol-layerswitcher";
import "ol-layerswitcher/dist/ol-layerswitcher.css";

// Redux Global Store
import {getUserGeoData} from "../../../redux/actions";
import LocalWeather from "./LocalWeather";

const DivLocal = styled.div`
  left: 5px;
  right: 5px;
  width: calc(100% -10px);
  height: auto;
  display: flex;
  flex-direction: row;
  wrap: wrap;
  justify-content: center;
  align-items: flex-end;
  align-content: center;
`;

const DivMap = styled.div`
  left: 5px;
  right: 5px;
  width: 100%;
  height: auto;
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
  mapOSM!: TileLayer<OSM>;
  mapStamen!: TileLayer<XYZ>;
  mapArcGIS!: TileLayer<XYZ>;
  mouseWheelInt!: MouseWheelZoom;

  constructor(props: Props) {
    super(props);
    // console.log("props.state.location:", props?.state?.location);
    this.mapRef = React.createRef();

    const savedLatitude = JSON.parse(localStorage.getItem("latitude") as string);
    const savedLongitude = JSON.parse(localStorage.getItem("longitude") as string);
    const savedCity = JSON.parse(localStorage.getItem("city") as string);
    const savedCountry = JSON.parse(localStorage.getItem("country") as string);
    const savedIP = JSON.parse(localStorage.getItem("ip") as string);
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

    const mapOSM = new TileLayer({
      //@ts-ignore
      title: "OpenStreetMap",
      type: "base",
      visible: true,
      source: new OSM({
        attributions: [ATTRIBUTION, `<a href="https://openlayers.org" target="_blank">OpenLayers</a>`],
      } as BaseLayerOptions),
    });

    const mapStamen = new TileLayer({
      title: "Stamen-terrain",
      type: "base",
      visible: false,
      source: new XYZ({
        url: "http://{a-d}.tile.stamen.com/terrain/{z}/{x}/{y}.png",
        attributions: [
          'Map tiles by <a href="http://stamen.com" target="_blank">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0" target="_blank">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org" target="_blank">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0" target="_blank">CC BY SA</a>',
        ],
      }),
    } as BaseLayerOptions);

    const mapArcGIS = new TileLayer({
      title: "ArcGIS-WorldImagery",
      type: "base",
      visible: false,
      source: new XYZ({
        maxZoom: 18,
        url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        attributions: [
          'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer" target="_blank">ArcGIS</a>',
          "Source: <a href='https://www.esri.com/' target='_blank'>Esri</a>, Maxar, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community",
        ],
      }),
    } as BaseLayerOptions);

    const layerSwitcher = new LayerSwitcher({
      label: "«",
      reverse: false,
      groupSelectStyle: "group",
    });

    const baseMaps = new LayerGroup({
      title: "Base maps",
      layers: [mapOSM, mapStamen, mapArcGIS],
    } as GroupLayerOptions);

    this.OL_Map = new Map({
      interactions: defaults({mouseWheelZoom: false}),
      controls: defaultControls({attribution: false}).extend([this.attribution, this.scaleLine]),
      target: "olMap",

      layers: [baseMaps],

      view: new View({
        center: fromLonLat(this.state.center),
        zoom: this.state.zoom,
      }),
    });

    this.OL_Map.addControl(layerSwitcher);

    const mouseWheelInt = new MouseWheelZoom({
      condition: platformModifierKeyOnly,
    });
    this.OL_Map.addInteraction(mouseWheelInt);

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
    // localStorage.setItem("latitude", JSON.stringify(this.props.state?.location.latitude));
    // localStorage.setItem("longitude", JSON.stringify(this.props.state?.location.longitude));
    // localStorage.setItem("city", JSON.stringify(this.props.state?.location.city));
    // localStorage.setItem("country", JSON.stringify(this.props.state?.location.country));
    // localStorage.setItem("ip", JSON.stringify(this.props.state?.location.ip));
    // localStorage.setItem("country_flag", JSON.stringify(this.props.state?.location.country_flag));
    // localStorage.setItem("currency", JSON.stringify(this.props.state?.location.currency));
    // localStorage.setItem("currency_code", JSON.stringify(this.props.state?.location.currency_code));

    //* The same as above
    const localStorageEntries = Object.entries(this?.props?.state?.location ?? "No Data");
    localStorageEntries.forEach((entry) => localStorage.setItem(entry[0], JSON.stringify(entry[1])));
  }

  render() {
    return (
      <DivLocal>
        {this.state.center[0] !== 0 && this.state.center[1] !== 0 ? (
          <DivMap>
            <h1 style={{textAlign: "center"}}>Your location: {this.position}</h1>
            <div id="olMap" ref={this.mapRef} style={{height: "350px", cursor: "pointer"}}></div>
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
            <div id="olMap" ref={this.mapRef} style={{height: "350px", cursor: "pointer"}}></div>
          </DivMap>
        )}
        <LocalWeather />
      </DivLocal>
    );
  }
}

const mapStateToProps = (state: State) => {
  return {state: state.rootReducer};
};

export default connect(mapStateToProps, {getUserGeoData})(EarthMap);
