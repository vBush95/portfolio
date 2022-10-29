import { useRef, useState } from "react";
import { useGLTF, useTexture, Decal } from "@react-three/drei";
import images from "../../constants/images";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";

export type HexagonProps = {
  position: [number, number, number];
  scale: number;
  color: string;
  image: string;
  rotation: number;
  decalRotation?: [number, number, number];
  decalPosition?: [number, number, number];
  decalScale?: [number, number, number];
  name?: string;
};

export default function Hexagon({
  position,
  scale,
  color,
  image,
  rotation,
  decalRotation = [Math.PI / 2, 0, Math.PI],
  decalPosition = [0, 0, 0],
  decalScale = [1, 1, 0.2],
  name,
}: HexagonProps) {
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  const mesh = useRef<Mesh>(null!);
  const { nodes, materials } = useGLTF("hexagon.glb");
  //@ts-ignore
  const texture = useTexture(images[image]);

  // useHelper(mesh, BoxHelper, "royalblue");
  // useHelper(mesh, VertexNormalsHelper, 1, 0xff0000);

  useFrame((state, delta) => (mesh.current.rotation.z -= rotation));

  //@ts-ignore

  return (
    <>
      <group dispose={null} position={position} scale={scale}>
        <mesh
          receiveShadow
          castShadow
          // @ts-ignore
          geometry={nodes.hexagon.geometry}
          material-color={"orange"}
          rotation={[Math.PI / 2, 0, Math.PI]}
          ref={mesh}
          onClick={(event) => setActive(!active)}
          onPointerOver={(event) => setHover(true)}
          onPointerOut={(event) => setHover(false)}
          name={name}
        >
          <meshStandardMaterial color={color} />

          <Decal
            position={decalPosition}
            rotation={decalRotation}
            scale={decalScale}
            map={texture}
            map-anisotropy={16}
          />
        </mesh>
      </group>
    </>
  );
}
