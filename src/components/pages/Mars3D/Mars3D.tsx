import React from "react";
import {Viewer, Entity, PointGraphics, EntityDescription, Globe, CameraFlyTo, CesiumComponentRef} from "resium";
import * as Cesium from "cesium";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import {useStore} from "react-redux";

import InSight from "../MarsWeather/Images/InSight.png";
import Curiosity from "../MarsWeather/Images/Curiosity.png";
import Perseverance from "../MarsWeather/Images/Perseverance.png";

import "./Mars3D.scss";
import Spinner from "../../../Spinner";
import MarsInfoPopover from "./MarsInfoPopover";
import VehicleInfo from "./VehicleInfo";

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

const Mars3D: React.FC<{}> = (): JSX.Element => {
  const ref = React.useRef<CesiumComponentRef<Cesium.Viewer>>(null);

  const Layers: string[] = ["MDIM21_color", "MOLA_THEMIS_blend"];

  const Mars3D_selectedLayer = JSON.parse(localStorage.getItem("Mars3D_selectedLayer") as string);

  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [selectedLayer, setSelectedLayer] = React.useState<string>(
    Mars3D_selectedLayer === null ? Layers[0] : Mars3D_selectedLayer
  );

  const storeVehicleInfo = useStore().getState().vehiclesInfo;
  // console.log("storeVehicleInfo:", storeVehicleInfo);

  const imageryProvider = new Cesium.WebMapServiceImageryProvider({
    url: "https://planetarymaps.usgs.gov/cgi-bin/mapserv?map=/maps/mars/mars_simp_cyl.map&service=WMS",
    layers: selectedLayer as string,
    credit: `<a href="https://www.usgs.gov/centers/astrogeology-science-center/maps" target="_blank">USGS - Astrogeology Science Center</a>`,
    parameters: {
      transparent: false,
      format: "image/png",
    },
    tilingScheme: new Cesium.GeographicTilingScheme({ellipsoid: ellipsoidMars}),
    tileWidth: 512,
    tileHeight: 512,
    enablePickFeatures: false,
  });

  React.useEffect(() => {
    setTimeout(() => {
      if (ref?.current?.cesiumElement?.scene?.globe?.tilesLoaded) {
        console.log("Mars 3D model is ready");
      }
      setIsLoading(false);
      // console.log("isLoading:", isLoading);
    }, 1200);
  }, [isLoading]);

  const options = {
    animation: false,
    baseLayerPicker: false,
    geocoder: false,
    homeButton: false,
    navigationHelpButton: false,
    sceneModePicker: false,
    timeline: false,
    fullscreenButton: true,
    selectionIndicator: true,
    navigationInstructionsInitiallyVisible: false,
    scene3DOnly: true,
  };

  // console.log("selectedLayer:", selectedLayer);
  localStorage.setItem("Mars3D_selectedLayer", JSON.stringify(selectedLayer));

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <div
        style={{
          zIndex: "9",
          position: "absolute",
          top: "69px",
          left: "50%",
          transform: " translate(-50%, 0)",
          color: "whiteSmoke",
          fontWeight: "bolder",
          backgroundColor: "inherit",
        }}
      >
        Change the Layer:{" "}
        <BootstrapSwitchButton
          onstyle="primary"
          offstyle="warning"
          checked={selectedLayer === Layers[0] ? true : false}
          onlabel={Layers[0]}
          offlabel={Layers[1]}
          width={180}
          onChange={(checked: boolean) => {
            checked ? setSelectedLayer(Layers[0]) : setSelectedLayer(Layers[1]);
          }}
        />
      </div>
      <div
        style={{
          zIndex: "9",
          position: "absolute",
          top: "110px",
          left: "10px",
          fontWeight: "bolder",
          fontStyle: "italic",
        }}
      >
        <MarsInfoPopover />
      </div>
      <h5
        style={{
          zIndex: "9",
          position: "absolute",
          top: "105px",
          left: "50%",
          transform: " translate(-50%, 0)",
          color: "lightyellow",
          fontWeight: "bolder",
          backgroundColor: "inherit",
          textAlign: "center",
        }}
      >
        Click on the colored point to see more...
      </h5>
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

        <Entity position={perseverancePosition} name="Info of Perseverance Mars Rover">
          <PointGraphics pixelSize={10} color={Cesium.Color.RED} />
          <EntityDescription>
            <h3>
              Mission:{" "}
              <span style={{float: "right"}}>
                <a
                  href="https://en.wikipedia.org/wiki/Mars_2020"
                  target="_blank"
                  rel="noreferrer"
                  style={{color: "#17A2B8", fontStyle: "italic"}}
                >
                  Mars 2020
                </a>
              </span>
            </h3>
            <VehicleInfo
              info={storeVehicleInfo.PerseveranceMarsRover}
              name="Perseverance Mars Rover"
              imgName={Perseverance}
            />
          </EntityDescription>
        </Entity>
        <Entity position={curiosityPosition} name="Info of Curiosity Mars Rover">
          <PointGraphics pixelSize={10} color={Cesium.Color.DEEPPINK} />
          <EntityDescription>
            <h3>
              Mission:{" "}
              <span style={{float: "right"}}>
                <a
                  href="https://en.wikipedia.org/wiki/Mars_Science_Laboratory"
                  target="_blank"
                  rel="noreferrer"
                  style={{color: "#17A2B8", fontStyle: "italic"}}
                >
                  Mars Science Laboratory
                </a>
              </span>
            </h3>
            <VehicleInfo info={storeVehicleInfo.CuriosityMarsRover} name="Curiosity Mars Rover" imgName={Curiosity} />
          </EntityDescription>
        </Entity>
        <Entity position={inSightPosition} name="Info of InSight Mars Lander">
          <PointGraphics pixelSize={10} color={Cesium.Color.DARKORANGE} />
          <EntityDescription>
            <h3>
              Mission:{" "}
              <span style={{float: "right"}}>
                <a
                  href="https://en.wikipedia.org/wiki/InSight"
                  target="_blank"
                  rel="noreferrer"
                  style={{color: "#17A2B8", fontStyle: "italic"}}
                >
                  InSight
                </a>
              </span>
            </h3>
            <VehicleInfo info={storeVehicleInfo.InSightMarsLander} name="InSight Mars Lander" imgName={InSight} />
            <br />
          </EntityDescription>
        </Entity>
      </Viewer>
    </>
  );
};

export default Mars3D;
