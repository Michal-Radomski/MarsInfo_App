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
const defaultPosition: Position = [4.5024, 135.6234];
console.log("defaultPosition:", defaultPosition);

const MarsMap = (): JSX.Element => {
  return (
    <DivMap>
      <MapContainer center={defaultPosition} zoom={3} scrollWheelZoom={false} style={{width: "100%", height: "100%"}}>
        <TileLayer
          attribution='&copy; <a href="https://www.openplanetary.org/" target="_blank">Open Planetary</a>'
          url="https://cartocdn-gusc.global.ssl.fastly.net/opmbuilder/api/v1/map/named/opm-mars-basemap-v0-2/all/{z}/{x}/{y}.png"
        />
        <Marker position={defaultPosition}>
          <Popup>Elysium Planitia</Popup>
          <Tooltip>InSight Landing site</Tooltip>
        </Marker>
      </MapContainer>
    </DivMap>
  );
};

export default MarsMap;
