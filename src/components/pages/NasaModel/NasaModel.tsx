import React from "react";
import styled from "styled-components";
import {Canvas} from "@react-three/fiber";

import Model3D, {Loader} from "./Model3D";
import Camera from "./Camera";
import "./NasaModel.scss";
import Spinner from "../../../Spinner";
import FlyingText from "./FlyingText";

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #010718;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: transparent;
  z-index: 9;
`;

//* WebGL compatibility check
// if (typeof WebGLRenderingContext === "undefined") {
//   // This browser doesn't even know what WebGL is
//   console.log("This browser doesn't even know what WebGL is");
// } else {
//   let WebGL = document.createElement("canvas").getContext("webgl");
//   console.log("WebGL:", WebGL);
//   if (!WebGL) {
//     // webgl failed to initialize for any number of reasons
//     // including it's turned off, the browser blacklisted the drivers,
//     // it's out of memory, other.
//     console.log("WebGL failed to initialize");
//   }
// }

function NasaModel(): JSX.Element {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  }, [isLoading]);

  return isLoading ? (
    <Spinner />
  ) : (
    <CanvasContainer>
      <Background />
      <Canvas>
        <Camera />
        {/* //* Sunlight Color: #F4E99B */}
        <directionalLight intensity={0.7} color={0xf4e99b} />
        <ambientLight intensity={0.6} color={0xf4e99b} />
        <React.Suspense fallback={<Loader />}>
          <Model3D />
          {/* {console.log("Model3D:", Model3D)} */}
        </React.Suspense>
      </Canvas>
      <FlyingText />
    </CanvasContainer>
  );
}

export default NasaModel;
