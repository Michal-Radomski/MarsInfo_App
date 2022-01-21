import React from "react";
import {Viewer, Entity, PointGraphics, EntityDescription, ImageryLayer} from "resium";
import {Cartesian3, createWorldTerrain, ArcGisMapServerImageryProvider} from "cesium";

const position = Cartesian3.fromDegrees(18, 54, 100);
const terrainProvider = createWorldTerrain();

const imageryProvider = new ArcGisMapServerImageryProvider({
  // url: "//services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer",
  url: "https://cartocdn-gusc.global.ssl.fastly.net/opmbuilder/api/v1/map/named/opm-mars-basemap-v0-2/all/{z}/{x}/{y}.png",
});

const Mars3D = (): JSX.Element => {
  return (
    <Viewer
      full
      terrainProvider={terrainProvider}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <Entity position={position} name="Gdansk">
        <PointGraphics pixelSize={10} />
        <EntityDescription>
          <h1>Hello world!</h1>
          <p>from Gdansk</p>
        </EntityDescription>
      </Entity>

      <ImageryLayer imageryProvider={imageryProvider} />
    </Viewer>
  );
};

export default Mars3D;
