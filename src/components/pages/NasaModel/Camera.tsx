import React from "react";
import {extend, useThree, useFrame} from "@react-three/fiber";
import {OrbitControls, OrbitControlsProps} from "@react-three/drei";
import * as Three from "three";

extend({OrbitControls});

interface NewOrbitControls extends React.ForwardRefExoticComponent<OrbitControlsProps> {
  update(): void;
  getDistance(): void;
}

const Camera = (): JSX.Element => {
  const {camera, gl}: {camera: Three.PerspectiveCamera; gl: Three.WebGLRenderer} = useThree();
  // console.log("camera, gl:", camera, gl);

  const controls = React.useRef<NewOrbitControls>(null!);
  // console.log("controls:", controls);

  camera.position.z = 999;
  // console.log(camera.position, camera.zoom, camera.fov);

  useFrame(() => {
    controls.current.update();
    // console.log(controls.current.getDistance());
  });

  return (
    <OrbitControls
      //@ts-ignore
      ref={controls}
      args={[camera, gl.domElement]}
      autoRotate={true}
      enableZoom={false}
      autoRotateSpeed={0.05}
    />
  );
};

export default Camera;
