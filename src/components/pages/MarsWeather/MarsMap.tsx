import {MapContainer, TileLayer, Marker, Popup, Tooltip} from "react-leaflet";
import L from "leaflet";
import styled from "styled-components";
import InSightIcon from "./Image/InSight.png";

const DivMap = styled.div`
  position: absolute;
  top: 200px;
  left: 50px;
  right: 0;
  bottom: 0;
  margin: 30px;
`;

const InSight = L.icon({
  iconUrl: InSightIcon,
  iconSize: [100, 126],
  iconAnchor: [50, 63],
});

type Position = [number, number];
const defaultPosition: Position = [4.5024, 135.6234];
console.log("defaultPosition:", defaultPosition);

const corner1 = L.latLng(-90, -180);
const corner2 = L.latLng(90, 180);
const mapBounds = L.latLngBounds(corner1, corner2);

const MarsMap = (): JSX.Element => {
  return (
    <DivMap>
      <MapContainer
        center={defaultPosition}
        zoom={3}
        scrollWheelZoom={false}
        style={{width: "100%", height: "100%"}}
        bounds={mapBounds}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openplanetary.org/" target="_blank">Open Planetary</a>'
          url="https://cartocdn-gusc.global.ssl.fastly.net/opmbuilder/api/v1/map/named/opm-mars-basemap-v0-2/all/{z}/{x}/{y}.png"
        />
        {/* <Marker position={defaultPosition}>
          <Popup>Elysium Planitia</Popup>
          <Tooltip>InSight Landing site</Tooltip>
        </Marker> */}
        <Marker position={defaultPosition} icon={InSight}></Marker>
      </MapContainer>
    </DivMap>
  );
};

export default MarsMap;
