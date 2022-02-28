import React from "react";
import * as THREE from "three";
import {useFrame} from "@react-three/fiber";
import {OrbitControls, Stars, useGLTF, Html, useProgress} from "@react-three/drei";
import {GLTF} from "three-stdlib";

//* Loader
export function Loader(): JSX.Element {
  const {progress} = useProgress();
  return (
    <Html center>
      <h1 style={{width: "350px", color: "#0D6EFD", fontWeight: "bold", fontStyle: "italic"}}>
        {progress.toFixed(2)} % loaded...
      </h1>
    </Html>
  );
}

type GLTFResult = GLTF & {
  nodes: {
    Cube008: THREE.Mesh;
  };
  materials: {
    ["Default OBJ.005"]: THREE.MeshStandardMaterial;
  };
};

const Model3D: React.FC<{}> = (): JSX.Element => {
  const MarsRef = React.useRef<THREE.Mesh>(null!);

  const {nodes, materials} = useGLTF("NasaMars3D.glb") as GLTFResult;
  // console.log("nodes, materials:", nodes, materials);

  useFrame(({clock}) => {
    const elapsedTime = clock.getElapsedTime();
    // console.log("elapsedTime:", elapsedTime);
    MarsRef!.current!.rotation.y = elapsedTime / 60;
  });

  // React.useEffect(() => {
  //   console.log("MarsRef:", MarsRef);
  // });

  return (
    <React.Fragment>
      <Stars
        radius={600} // Radius of the inner sphere (default=100)
        depth={40} // Depth of area where stars should fit (default=50)
        count={10000} // Amount of stars (default=5000)
        factor={20} // Size factor (default=4)
        saturation={0} // Saturation 0-1 (default=0)
        fade={true} // Faded dots (default=false)
      />
      <mesh
        ref={MarsRef}
        visible={true}
        position={[0, 0, 0]}
        geometry={nodes.Cube008.geometry}
        material={materials["Default OBJ.005"]}
        // onClick={() => alert("This is 3D Mars Model")}
      >
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

useGLTF.preload("NasaMars3D.glb");
