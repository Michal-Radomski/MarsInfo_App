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
    MarsRef!.current!.rotation.y = elapsedTime / 120;
  });

  // React.useEffect(() => {
  //   console.log("MarsRef:", MarsRef);
  // });

  return (
    <React.Fragment>
      <Stars
        radius={200} // Radius of the inner sphere (default=100)
        depth={55} // Depth of area where stars should fit (default=50)
        count={2500} // Amount of stars (default=5000)
        factor={3} // Size factor (default=4)
        saturation={0.5} // Saturation 0-1 (default=0)
        fade={false} // Faded dots (default=false)
      />
      <mesh
        ref={MarsRef}
        visible={true}
        position={[0, 0, 0]}
        geometry={nodes.Cube008.geometry}
        material={materials["Default OBJ.005"]}
        // onClick={() => alert("This is 3D Mars Model")}
        scale={0.1}
      >
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          zoomSpeed={0.6}
          panSpeed={0.5}
          rotateSpeed={0.3}
        />
      </mesh>
    </React.Fragment>
  );
};

export default Model3D;

useGLTF.preload("NasaMars3D.glb");
