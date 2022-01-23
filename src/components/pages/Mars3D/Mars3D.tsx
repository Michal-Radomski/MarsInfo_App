//* credits +USGS, oraz spinner i modal? //map by state, attribution, camera Bilbord, moons

import React from "react";
import {Viewer, Entity, PointGraphics, EntityDescription, Globe, CameraFlyTo, CesiumComponentRef} from "resium";
import * as Cesium from "cesium";

import "./Mars3D.scss";

//* Mars Vehicles' positions:
type Position = [number, number];
const PerseverancePosition: Position = [18.4447, 77.4508];
const CuriosityPosition: Position = [-4.5895, 137.4417];
const InSightPosition: Position = [4.5024, 135.6234];

// Setting the initial position
const initialPosition = Cesium.Cartesian3.fromDegrees(105, 0, 25000000);
// Setting the Mars Vehicles Positions
const perseverancePosition = Cesium.Cartesian3.fromDegrees(PerseverancePosition[1], PerseverancePosition[0], 0);
const curiosityPosition = Cesium.Cartesian3.fromDegrees(CuriosityPosition[1], CuriosityPosition[0], 0);
const inSightPosition = Cesium.Cartesian3.fromDegrees(InSightPosition[1], InSightPosition[0], 0);

const ellipsoidMars = new Cesium.Ellipsoid(3396190, 3376200, 3396190);

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

  React.useEffect(() => {
    if (ref?.current?.cesiumElement?.scene?.globe?.tilesLoaded) {
      console.log("Mars 3D is ready");
    }
  }, []);

  const options = {
    animation: false,
    baseLayerPicker: false,
    geocoder: false,
    homeButton: false,
    navigationHelpButton: false,
    sceneModePicker: false,
    timeline: false,
    fullscreenButton: true,
    selectionIndicator: false,
    navigationInstructionsInitiallyVisible: false,
    scene3DOnly: true,
  };

  return (
    <Viewer
      ref={ref}
      imageryProvider={imageryProvider}
      style={{
        position: "absolute",
        top: 105,
        left: 0,
        right: 0,
        bottom: 0,
      }}
      {...options}
      skyAtmosphere={false}
    >
      <Globe enableLighting={false} showGroundAtmosphere={false} depthTestAgainstTerrain={false} />
      <CameraFlyTo duration={5} destination={initialPosition} />

      <Entity position={perseverancePosition} name="Perseverance Position">
        <PointGraphics pixelSize={10} color={Cesium.Color.RED} />
        <EntityDescription>
          <h1>Hello world!</h1>
          <p>from Perseverance Position</p>
        </EntityDescription>
      </Entity>
      <Entity position={curiosityPosition} name="Curiosity Position">
        <PointGraphics pixelSize={10} color={Cesium.Color.DEEPPINK} />
        <EntityDescription>
          <h1>Hello world!</h1>
          <p>from Curiosity Position</p>
        </EntityDescription>
      </Entity>
      <Entity position={inSightPosition} name="InSight Position">
        <PointGraphics pixelSize={10} color={Cesium.Color.DARKORANGE} />
        <EntityDescription>
          <h1>Hello world!</h1>
          <p>from InSight Position</p>
        </EntityDescription>
      </Entity>
    </Viewer>
  );
};

export default Mars3D;
