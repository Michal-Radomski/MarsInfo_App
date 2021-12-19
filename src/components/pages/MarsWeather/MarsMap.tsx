import {MapContainer, TileLayer, Marker, Popup, Tooltip, ScaleControl, Polyline} from "react-leaflet";
import L from "leaflet";
import styled from "styled-components";
import InSightIcon from "./Image/InSight.png";

const DivMap = styled.div`
  position: absolute;
  top: 400px;
  left: 5px;
  right: 5px;
  height: 400px;
  width: calc(100% -10px);
`;

const InSight = L.icon({
  iconUrl: InSightIcon,
  iconSize: [50, 63],
  iconAnchor: [25, 31.5],
});

type Position = [number, number];
const InSightPosition: Position = [4.5024, 135.6234];
// console.log("InSightPosition:", InSightPosition);

const corner1 = L.latLng(-90, -180);
const corner2 = L.latLng(90, 180);
const mapBounds = L.latLngBounds(corner1, corner2);

type Line = [[number, number], [number, number]];
const equator: Line = [
  [0, 0],
  [0, 360],
];
const equatorLine = {color: "green", weight: 2.0};
const primeMeridian: Line = [
  [90, 0],
  [-90, 0],
];
const primeMeridianLine = {color: "blue", weight: 2.0};
const primeMeridian2: Line = [
  [90, 360],
  [-90, 360],
];
const primeMeridianLine2 = {color: "blue", weight: 2.0};

const MarsMap = (): JSX.Element => {
  return (
    <DivMap>
      <h1 style={{textAlign: "center"}}>The location of InSight Mars Lander in Elysium Planitia on Mars</h1>
      <MapContainer
        center={InSightPosition}
        zoom={3}
        scrollWheelZoom={false}
        style={{width: "100%", height: "100%"}}
        bounds={mapBounds}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openplanetary.org/" target="_blank">Open Planetary</a>'
          url="https://cartocdn-gusc.global.ssl.fastly.net/opmbuilder/api/v1/map/named/opm-mars-basemap-v0-2/all/{z}/{x}/{y}.png"
        />
        <Marker position={InSightPosition} icon={InSight}>
          <Popup>
            <b>InSight Mars Lander:</b>
            <br />
            Landing site: <b>Elysium Planitia</b>
            <br />
            Coordinates: <b>4.5024°N 135.6234°E</b>
          </Popup>
          <Tooltip>
            <b>InSight Mars Lander:</b>
            <br />
            Landing site: <b>Elysium Planitia</b>
            <br />
            Coordinates: <b>4.5024°N 135.6234°E</b>
          </Tooltip>
        </Marker>
        <ScaleControl metric={true} position="topleft" maxWidth={100} />
        <Polyline positions={equator} pathOptions={equatorLine}>
          <Tooltip>The Equator</Tooltip>
        </Polyline>
        <Polyline positions={primeMeridian} pathOptions={primeMeridianLine}>
          <Tooltip>The Prime Meridian</Tooltip>
        </Polyline>
        <Polyline positions={primeMeridian2} pathOptions={primeMeridianLine2}>
          <Tooltip>The Prime Meridian</Tooltip>
        </Polyline>
      </MapContainer>
    </DivMap>
  );
};

export default MarsMap;
