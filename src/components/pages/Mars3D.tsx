import React from "react";
import {Viewer, Entity} from "resium";
import {Cartesian3} from "cesium";

const position = Cartesian3.fromDegrees(18, 54, 100);
const pointGraphics = {pixelSize: 10};

const Mars3D = (): JSX.Element => {
  return (
    <div>
      Mars3D
      <Viewer full>
        <Entity position={position} point={pointGraphics} />
      </Viewer>
    </div>
  );
};

export default Mars3D;
