import {MapContainer, TileLayer, Marker, Popup, Tooltip} from "react-leaflet";
import styled from "styled-components";

const DivMap = styled.div`
  position: absolute;
  top: 200px;
  left: 50px;
  right: 0;
  bottom: 0;
  margin: 30px;
`;

type Position = [number, number];
const defaultPosition: Position = [51.505, -0.09];
console.log("defaultPosition:", defaultPosition);

const MarsMap = (): JSX.Element => {
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
