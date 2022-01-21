import React from "react";
import {Viewer, Entity, PointGraphics, EntityDescription, ImageryLayer} from "resium";
import * as Cesium from "cesium";

import "./Mars3D.module.scss";

const position = Cesium.Cartesian3.fromDegrees(77.4508, 18.4447);
// const terrainProvider = Cesium.createWorldTerrain();

// const imageryProvider2 = new Cesium.ArcGisMapServerImageryProvider({
//   url: "//services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer",
// });

const ellipsoidMars = new Cesium.Ellipsoid(3396000, 3396000, 3396000);

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
      // terrainProvider={terrainProvider}
      style={{
        position: "absolute",
        top: 105,
        left: 0,
        right: 0,
        bottom: 0,
      }}
      baseLayerPicker={false}
      geocoder={false}
      homeButton={false}
      // infoBox={false}
      navigationHelpButton={false}
      sceneModePicker={false}
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
