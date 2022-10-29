import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Box from "./Box";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  OrthographicCamera,
} from "@react-three/drei";
import Hexagon from "./Hexagon";
import CustomContactShadow from "./CustomContactShadow";

const ThreeCanvas = () => {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <Environment preset="city" />
        <Hexagon
          position={[2, 0.5, 0]}
          scale={15}
          color="white"
          image="reactIcon2"
          rotation={0.01}
        />
        <OrbitControls
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
          enableZoom={false}
          enablePan={false}
        />

        <CustomContactShadow />
      </Suspense>
      {/* <ambientLight /> */}
      <spotLight
        intensity={0.5}
        angle={0.1}
        penumbra={1}
        position={[10, 15, 10]}
        castShadow
      />
      <pointLight position={[2, 2, 2]} />
      {/* <Box position={[0, 0, 0]} /> */}
    </Canvas>
  );
};

export default ThreeCanvas;
