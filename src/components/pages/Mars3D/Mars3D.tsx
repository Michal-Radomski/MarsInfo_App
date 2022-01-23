import React from "react";
import {Viewer, Entity, PointGraphics, EntityDescription, Globe, CameraFlyTo, CesiumComponentRef} from "resium";
import * as Cesium from "cesium";

import "./Mars3D.scss";

//* Mars Vehicles' positions:
// type Position = [number, number];
// const InSightPosition: Position = [4.5024, 135.6234];
// const CuriosityPosition: Position = [-4.5895, 137.4417];
// const PerseverancePosition: Position = [18.4447, 77.4508];

// Setting the initial position
const initialPosition = Cesium.Cartesian3.fromDegrees(105, 0, 0);
const terrainProvider = Cesium.createWorldTerrain();
const ellipsoidMars = new Cesium.Ellipsoid(3396200, 3376200, 3396200);

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
    if (ref.current && ref.current.cesiumElement) {
      console.log("ref:", ref);
    }
  }, []);

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
      animation={false}
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
      <Globe enableLighting={false} showGroundAtmosphere={false} depthTestAgainstTerrain={false} />
      <Entity position={initialPosition} name="Gdansk">
        <PointGraphics pixelSize={10} color={Cesium.Color.RED} />
        <EntityDescription>
          <h1>Hello world!</h1>
          <p>from Gdansk</p>
        </EntityDescription>
      </Entity>

      <CameraFlyTo duration={5} destination={initialPosition} />
    </Viewer>
  );
};

export default Mars3D;
