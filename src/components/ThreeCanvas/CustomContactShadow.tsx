import { ContactShadows, useHelper } from "@react-three/drei";
import React, { useRef } from "react";
import { BoxHelper } from "three";

const CustomContactShadow = () => {
  const shadow = useRef(null!);
  //   useHelper(shadow, BoxHelper);
  return (
    <ContactShadows
      ref={shadow}
      position={[0, -20, 0]}
      opacity={0.75}
      scale={100}
      blur={1.5}
      far={20}
      resolution={256}
    />
  );
};

export default CustomContactShadow;
