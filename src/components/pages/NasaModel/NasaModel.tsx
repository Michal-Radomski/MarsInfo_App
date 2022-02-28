import React from "react";
import styled from "styled-components";
import {Canvas} from "@react-three/fiber";

import Model3D from "./Model3D";
import {Loader} from "./Model3D";
import Camera from "./Camera";
import "./NasaModel.scss";

const CanvasContainer = styled.div`
  width: 100%;
  height: auto;
  background-color: "#010718";
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #1756dd31;
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
  return (
    <CanvasContainer>
      <Background />
      <Canvas>
        <Camera />
        <directionalLight intensity={0.7} color={0xf4e99b} />
        <ambientLight intensity={0.6} color={0xf4e99b} />
        <React.Suspense fallback={null}>
          <Model3D />
        </React.Suspense>
      </Canvas>
    </CanvasContainer>
  );
}

export default NasaModel;
