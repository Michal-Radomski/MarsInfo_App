import React from "react";
import {MapContainer, TileLayer, Marker, Popup, Tooltip, ScaleControl, Polyline, LayersControl} from "react-leaflet";
import * as L from "leaflet";
import styled from "styled-components";
import InSightIcon from "./Images/InSight.png";
import CuriosityIcon from "./Images/Curiosity.png";
import PerseveranceIcon from "./Images/Perseverance.png";

import WeatherTable from "./CurrentWeather/WeatherTable";
import MarsLegend from "./MarsLegend";

const DivMap = styled.div`
  position: absolute;
  top: 580px;
  left: 5px;
  right: 5px;
  height: 500px;
  width: calc(100% -10px);
`;

const InSight = L.icon({
  iconUrl: InSightIcon,
  iconSize: [50, 63],
  iconAnchor: [25, 31.5],
});
const Curiosity = L.icon({
  iconUrl: CuriosityIcon,
  iconSize: [50, 46.25],
  iconAnchor: [25, 23.125],
});
const Perseverance = L.icon({
  iconUrl: PerseveranceIcon,
  iconSize: [80, 40.8],
  iconAnchor: [40, 20.4],
});

type Position = [number, number];
const InSightPosition: Position = [4.5024, 135.6234];
// console.log("InSightPosition:", InSightPosition);
const CuriosityPosition: Position = [-4.5895, 137.4417];
const PerseverancePosition: Position = [18.4447, 77.4508];

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

const MarsMap = (props: {weatherLast: Sol}): JSX.Element => {
  // console.log("props:", props);
  const [map, setMap] = React.useState(null);

  return (
    <DivMap>
      <h1 style={{textAlign: "center"}}>Nasa's Operational Mars Lander and Rovers Locations</h1>
      <h3 style={{textAlign: "center"}}>Click the Icon to see more...</h3>
      <MapContainer
        center={[0, 70]}
        zoom={3}
        scrollWheelZoom={false}
        style={{width: "100%", height: "100%"}}
        bounds={mapBounds}
        zoomControl={true}
        doubleClickZoom={false}
        // @ts-ignore
        whenCreated={setMap}
      >
        <MarsLegend map={map} />
        <LayersControl position="topright">
          <LayersControl.BaseLayer name="Mars BaseMap v0.2">
            <TileLayer
              tms={false}
              attribution='&copy; <a href="https://www.openplanetary.org/" target="_blank">Open Planetary</a>'
              url="https://cartocdn-gusc.global.ssl.fastly.net/opmbuilder/api/v1/map/named/opm-mars-basemap-v0-2/all/{z}/{x}/{y}.png"
              maxZoom={16}
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Mars Shaded Colour MOLA Elevation" checked={true}>
            <TileLayer
              tms={true}
              attribution='&copy; <a href="https://www.openplanetary.org/" target="_blank">Open Planetary</a>'
              url="http://s3-eu-west-1.amazonaws.com/whereonmars.cartodb.net/mola-color/{z}/{x}/{y}.png"
              maxZoom={6}
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Mars Viking MDIM2.1">
            <TileLayer
              tms={true}
              attribution='&copy; <a href="https://www.openplanetary.org/" target="_blank">Open Planetary</a>'
              url="http://s3-eu-west-1.amazonaws.com/whereonmars.cartodb.net/viking_mdim21_global/{z}/{x}/{y}.png"
              maxZoom={7}
            />
          </LayersControl.BaseLayer>
        </LayersControl>
        {/* // InSight Lander */}
        <Marker position={InSightPosition} icon={InSight}>
          <Tooltip direction="bottom">Click the Icon...</Tooltip>
          <Popup>
            <b>InSight Mars Lander:</b>
            <br />
            Launch Date: <b>5 May 2018</b>
            <br />
            Landing site: <b>Elysium Planitia</b>
            <br />
            Coordinates: <b>4.5024°N 135.6234°E</b>
            <br />
            <a href="https://en.wikipedia.org/wiki/InSight" target="_blank" rel="noreferrer">
              Read more...
            </a>
          </Popup>
        </Marker>
        {/* //- Curiosity Rover */}
        <Marker position={CuriosityPosition} icon={Curiosity}>
          <Tooltip direction="bottom">Click the Icon...</Tooltip>
          <Popup>
            <b>Curiosity Mars Rover:</b>
            <br />
            Launch Date: <b>26 November 2011</b>
            <br />
            Landing site: <b>Gale Crater</b>
            <br />
            Coordinates: <b>4.5895°S, 137.4417°E</b>
            <br />
            <a href="https://en.wikipedia.org/wiki/Curiosity_(rover)" target="_blank" rel="noreferrer">
              Read more...
            </a>
          </Popup>
        </Marker>
        {/* //+ Perseverance Rover */}
        <Marker position={PerseverancePosition} icon={Perseverance}>
          <Tooltip direction="bottom">Click the Icon...</Tooltip>
          {/* @ts-ignore */}
          <Popup>
            <b style={{backgroundColor: "orange"}}>
              Perseverance Mars Rover:
              <span style={{float: "right", fontStyle: "italic"}}>
                <a href="https://en.wikipedia.org/wiki/Perseverance_(rover)" target="_blank" rel="noreferrer">
                  Read more...
                </a>
              </span>
            </b>
            <br />
            Launch Date: <b>30 July 2020</b>
            <br />
            Landing site: <b>Jezero Crater</b>
            <br />
            Coordinates: <b>18.4447°N, 77.4508°E</b>
            <br />
            {props.weatherLast ? <WeatherTable weatherLast={props.weatherLast} /> : <div>Loading...</div>}
          </Popup>
        </Marker>
        <ScaleControl metric={true} position="topleft" maxWidth={100} />
        <Polyline positions={equator} pathOptions={equatorLine}>
          <Tooltip direction="top">The Equator</Tooltip>
        </Polyline>
        <Polyline positions={primeMeridian} pathOptions={primeMeridianLine}>
          <Tooltip>The Prime Meridian</Tooltip>
        </Polyline>
        <Polyline positions={primeMeridian2} pathOptions={primeMeridianLine2}>
          <Tooltip>The Prime Meridian</Tooltip>
        </Polyline>
      </MapContainer>
      <br />
    </DivMap>
  );
};

export default MarsMap;
