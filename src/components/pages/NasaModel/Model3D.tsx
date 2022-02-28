import React from "react";
import {useFrame} from "@react-three/fiber";
import {OrbitControls, Stars} from "@react-three/drei";
import * as THREE from "three";

const Model3D: React.FC<{}> = (): JSX.Element => {
  const MarsRef = React.useRef<THREE.Mesh>();

  useFrame(({clock}) => {
    const elapsedTime = clock.getElapsedTime();
    // console.log("elapsedTime:", elapsedTime);
    MarsRef!.current!.rotation.y = elapsedTime / 15;
  });

  React.useEffect(() => {
    console.log("MarsRef:", MarsRef);
  });

  return (
    <React.Fragment>
      <ambientLight intensity={0.4} color={0xffffff} />
      <pointLight color="#f6f3ea" position={[2, 0, 5]} intensity={1.2} />
      <Stars
        radius={200} // Radius of the inner sphere (default=100)
        depth={60} // Depth of area where stars should fit (default=50)
        count={10000} // Amount of stars (default=5000)
        factor={7} // Size factor (default=4)
        saturation={0} // Saturation 0-1 (default=0)
        fade={true} // Faded dots (default=false)
      />

      <mesh ref={MarsRef} position={[0, 0, 3]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhongMaterial />
        <meshStandardMaterial metalness={0.4} roughness={0.7} />
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          zoomSpeed={0.6}
          panSpeed={0.5}
          rotateSpeed={0.4}
        />
      </mesh>
    </React.Fragment>
  );
};

export default Model3D;
