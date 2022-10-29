import React, { useRef } from "react";
import {
  useHelper,
  useDepthBuffer,
  SpotLight as Spotlight,
} from "@react-three/drei";
import { SpotLightHelper } from "three";

import { SpotLight } from "three";

export type SpotlightProps = {
  color: string;
};

const CustomSpotlight = ({ color }: SpotlightProps) => {
  const light1 = React.useRef<SpotLight>(null!);
  //   useHelper(light1, SpotLightHelper, "blue");

  const depthBuffer = useDepthBuffer({ size: 256 });

  return (
    <Spotlight
      ref={light1}
      intensity={50}
      angle={3}
      penumbra={0.5}
      position={[-25, 25, -25]}
      castShadow
      color={color}
      // depthBuffer={depthBuffer}
      distance={70}
      power={30}
      attenuation={0}
      anglePower={10}
    />
  );
};

export default CustomSpotlight;
