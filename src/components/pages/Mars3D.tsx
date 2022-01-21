import React from "react";
import {Viewer, Entity, PointGraphics, EntityDescription, ImageryLayer} from "resium";
import {Cartesian3, createWorldTerrain, ArcGisMapServerImageryProvider} from "cesium";
import * as Cesium from "cesium";

const position = Cartesian3.fromDegrees(77.4508, 18.4447);
const terrainProvider = createWorldTerrain();

// const imageryProvider = new ArcGisMapServerImageryProvider({
//   url: "//services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer",
// });

var ellipsoidMars = new Cesium.Ellipsoid(3396000, 3396000, 3396000);

const imageryProvider = new Cesium.WebMapServiceImageryProvider({
  url: "https://planetarymaps.usgs.gov/cgi-bin/mapserv?map=/maps/mars/mars_simp_cyl.map&service=WMS",
  layers: "MDIM21_color",
  parameters: {
    transparent: false,
    format: "image/png",
  },
  tilingScheme: new Cesium.GeographicTilingScheme({ellipsoid: ellipsoidMars}),
  tileWidth: 512,
  tileHeight: 512,
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
