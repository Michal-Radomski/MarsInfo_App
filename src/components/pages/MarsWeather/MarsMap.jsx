import React from "react";
import {MapContainer, TileLayer, Marker, Popup, Tooltip} from "react-leaflet";
import styled from "styled-components";

const DivMap = styled.div`
  width: 500px !important;
  height: 280px !important;
  margin: 8px 16px !important;
`;

const defaultPosition = [51.505, -0.09];
console.log("defaultPosition:", defaultPosition);

const MarsMap = () => {
  return (
    <DivMap>
      <MapContainer center={defaultPosition} zoom={13} scrollWheelZoom={false} style={{width: "100%", height: "100%"}}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={defaultPosition}>
          <Popup>Text</Popup>
          <Tooltip>You are here...</Tooltip>
        </Marker>
      </MapContainer>
    </DivMap>
  );
};

export default MarsMap;
