import React from "react";
import {
  Viewer,
  Entity,
  PointGraphics,
  EntityDescription,
  ImageryLayer,
  Globe,
  CameraFlyTo,
  Scene,
  CesiumComponentRef,
} from "resium";
import * as Cesium from "cesium";

import "./Mars3D.scss";

//* Mars Vehicles' positions:
type Position = [number, number];
const InSightPosition: Position = [4.5024, 135.6234];
const CuriosityPosition: Position = [-4.5895, 137.4417];
const PerseverancePosition: Position = [18.4447, 77.4508];

// Setting the initial position
const position = Cesium.Cartesian3.fromDegrees(70, 0, 0);
const terrainProvider = Cesium.createWorldTerrain();

const ellipsoidMars = new Cesium.Ellipsoid(3396000, 3376000, 3389500);

const mapProjectionMars = new Cesium.GeographicProjection(ellipsoidMars);
const globeMars = new Cesium.Globe(ellipsoidMars);

// globeMars.showGroundAtmosphere = false; // necessary for tiles to show in non-earth ellipsoid
// globeMars.depthTestAgainstTerrain = true;

const optsMars = {
  mapProjection: mapProjectionMars,
  globe: globeMars,
  // baseLayerPicker: false,
  // skyAtmosphere: false,
};

// const viewer = new Cesium.Viewer("cesiumContainer", optsMars);

const imageryProvider = new Cesium.WebMapServiceImageryProvider({
  url: "https://planetarymaps.usgs.gov/cgi-bin/mapserv?map=/maps/mars/mars_simp_cyl.map&service=WMS",
  layers: "MDIM21_color,MOLA_THEMIS_blend",
  credit: `<a href="https://www.usgs.gov/centers/astrogeology-science-center/maps" target="_blank">USGS - Astrogeology Science Center</a>`,
  parameters: {
    transparent: false,
    format: "image/png",
  },
  tilingScheme: new Cesium.GeographicTilingScheme({ellipsoid: ellipsoidMars}),
  tileWidth: 512,
  tileHeight: 512,
});

const Mars3D = (): JSX.Element => {
  const ref = React.useRef<CesiumComponentRef<Cesium.Viewer>>(null);

  // React.useEffect(() => {

  //   if (ref.current && ref.current.cesiumElement) {
  //     // ref.current.cesiumElement is Cesium's Viewer
  //     // DO SOMETHING
  //   }
  // }, []);

  return (
    <Viewer
      ref={ref}
      style={{
        position: "absolute",
        top: 105,
        left: 0,
        right: 0,
        bottom: 0,
      }}
      animation={false}
      globe={globeMars}
      terrainProvider={terrainProvider}
      baseLayerPicker={false}
      geocoder={false}
      homeButton={false}
      navigationHelpButton={false}
      sceneModePicker={false}
      skyAtmosphere={false}
      timeline={false}
      fullscreenButton={true}
      selectionIndicator={false}
      navigationInstructionsInitiallyVisible={false}
      scene3DOnly={true}
    >
      <ImageryLayer imageryProvider={imageryProvider} />
      {/* <Globe enableLighting={false} showGroundAtmosphere={false} depthTestAgainstTerrain={false} /> */}
      <Entity position={position} name="Gdansk">
        <PointGraphics pixelSize={10} color={Cesium.Color.RED} />
        <EntityDescription>
          <h1>Hello world!</h1>
          <p>from Gdansk</p>
        </EntityDescription>
      </Entity>

      {/* <CameraFlyTo duration={5} destination={Cesium.Cartesian3.fromDegrees(139.767052, 35.681167, 1000000)} /> */}

      {/* <CameraFlyTo

destination={Cartesian3.fromDegrees(139.767052, 35.681167, 100)}

orientation={{ pitch: CesiumMath.toRadian(-60) }}

duration={3}

/> */}
    </Viewer>
  );
};

export default Mars3D;
