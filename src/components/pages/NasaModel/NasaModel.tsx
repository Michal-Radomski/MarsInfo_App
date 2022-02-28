import React from "react";
import styled from "styled-components";
import {Canvas} from "@react-three/fiber";

import "./NasaModel.scss";
import Model3D from "./Model3D";

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #1756dd31; //*  #RRGGBBAA => rgba(23, 86, 221, 0.192)
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 9;
`;

//* WebGL compatibility check
if (typeof WebGLRenderingContext === "undefined") {
  // This browser doesn't even know what WebGL is
  console.log("This browser doesn't even know what WebGL is");
} else {
  let WebGL = document.createElement("canvas").getContext("webgl");
  console.log("WebGL:", WebGL);
  if (!WebGL) {
    // webgl failed to initialize for any number of reasons
    // including it's turned off, the browser blacklisted the drivers,
    // it's out of memory, other.
    console.log("WebGL failed to initialize");
  }
}

function NasaModel(): JSX.Element {
  return (
    <div style={{backgroundColor: "#010718"}}>
      <CanvasContainer>
        <Background />
        <Canvas>
          <React.Suspense fallback={null}>
            <Model3D />
          </React.Suspense>
        </Canvas>
      </CanvasContainer>
    </div>
  );
}

export default NasaModel;
