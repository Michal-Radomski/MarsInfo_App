import React from "react";
import {Viewer, Entity, PointGraphics, EntityDescription, ImageryLayer} from "resium";
import * as Cesium from "cesium";

import "./Mars3D.module.scss";

// Mars Vehicles' positions:
type Position = [number, number];
const InSightPosition: Position = [4.5024, 135.6234];
const CuriosityPosition: Position = [-4.5895, 137.4417];
const PerseverancePosition: Position = [18.4447, 77.4508];

// Setting the initial position
const position = Cesium.Cartesian3.fromDegrees(70, 0, 0);
// const terrainProvider = Cesium.createWorldTerrain();

// const imageryProvider2 = new Cesium.ArcGisMapServerImageryProvider({
//   url: "//services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer",
// });

const ellipsoidMars = new Cesium.Ellipsoid(3396000, 3376000, 3389500);

const mapProjectionMars = new Cesium.GeographicProjection(ellipsoidMars);
const globeMars = new Cesium.Globe(ellipsoidMars);

const materialMars = new Cesium.Color(1, 0, 0).withAlpha(0.7);

globeMars.showGroundAtmosphere = false; // necessary for tiles to show in non-earth ellipsoid
// globeMars.depthTestAgainstTerrain = true;

const optsMars = {
  mapProjection: mapProjectionMars,
  globe: globeMars,
  // baseLayerPicker: false,
  // skyAtmosphere: false,
};

// const viewer = new Cesium.Viewer('cesiumContainer', optsMars);

const imageryProvider = new Cesium.WebMapServiceImageryProvider({
  url: "https://planetarymaps.usgs.gov/cgi-bin/mapserv?map=/maps/mars/mars_simp_cyl.map&service=WMS",
  layers: "MDIM21_color",
  // layers: "MOLA_THEMIS_blend",
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
      skyAtmosphere={false}
      timeline={false}
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
