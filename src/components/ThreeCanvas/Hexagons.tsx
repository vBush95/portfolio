import React, { useRef } from "react";
import { useSnapshot } from "valtio";
import Hexagon from "./Hexagon";

const Hexagons = ({ state, set }: { state: any; set: any }) => {
  const ref = useRef(null);
  const snap = useSnapshot(state);
  return (
    <group
      ref={ref}
      dispose={null}
      onPointerOver={(e) => (e.stopPropagation(), set(e.object.name))}
      onPointerOut={(e) => e.intersections.length === 0 && set(null)}
      onPointerMissed={() => (state.current = null)}
      onClick={(e) => (e.stopPropagation(), (state.current = e.object.name))}
    >
      <Hexagon
        position={[-35, -10, 10]}
        scale={6.18}
        color={state.hexagons.sass}
        image="sass"
        rotation={0.01}
        name="sass"
      />
      <Hexagon
        position={[-25, -5, -20]}
        scale={10}
        color={state.hexagons.typescript}
        image="typescript"
        rotation={0.01}
        decalScale={[0.9, 0.9, 0.2]}
        name="typescript"
      />

      <Hexagon
        position={[0, 0, 0]}
        scale={16.18}
        color={state.hexagons.react}
        image="reactIcon2"
        rotation={0.01}
        name="react"
      />
      <Hexagon
        position={[25, -5, -20]}
        scale={10}
        color={state.hexagons.threejs}
        image="threejs"
        rotation={0.01}
        decalRotation={[Math.PI / 2, 0, Math.PI / 10]}
        decalPosition={[0.1, 0, -0]}
        name="threejs"
      />
      <Hexagon
        position={[35, -10, 10]}
        scale={6.18}
        color={state.hexagons.vite}
        image="vite"
        rotation={0.01}
        name="vite"
      />
    </group>
  );
};

export default Hexagons;
