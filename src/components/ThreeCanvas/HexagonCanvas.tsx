// @ts-nocheck
import React, { Suspense } from "react";
import * as THREE from "three";
import { useRef, useState, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Text,
  TrackballControls,
  useHelper,
  Environment,
  ContactShadows,
  Plane,
  OrbitControls,
} from "@react-three/drei";
import { HexColorPicker } from "react-colorful";
import { proxy, useSnapshot } from "valtio";

import Box from "./Box";
import CustomSpotlight from "./CustomSpotlight";
import CustomContactShadow from "./CustomContactShadow";
import CameraController from "./CameraController";
import Hexagons from "./Hexagons";
import Loader from "./Loader";
import ColorPicker from "./ColorPicker";

const hexagonState = proxy({
  current: null,
  hexagons: {
    react: "#808080",
    vite: "#fff",
    typescript: "#ADD8E6",
    threejs: "#FF69B4",
    sass: "#fff",
  },
});

export default function HexagonCanvas() {
  const snap = useSnapshot(hexagonState);

  // Cursor showing current color
  const [hovered, set] = useState(null);
  const [onCanvas, setOnCanvas] = useState(null);
  useEffect(() => {
    if (onCanvas) {
      const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${snap.hexagons[hovered]}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="white-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`;
      const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`;
      if (hovered) {
        document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(
          cursor
        )}'), auto`;
        return () =>
          (document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(
            auto
          )}'), auto`);
      } else {
        //document.body.style.cursor = "default";
        return () => (document.body.style.cursor = "default");
      }
    }
  }, [hovered, onCanvas]);

  // useEffect(() => {
  //   console.log("snap", snap.current, snap.hexagons);
  // }, [snap]);

  return (
    <>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 60], fov: 90 }}
        onPointerOver={() => setOnCanvas(true)}
        onPointerOut={() => setOnCanvas(false)}
      >
        <Suspense fallback={<Loader />}>
          <Hexagons state={hexagonState} set={set} />

          <CustomContactShadow />
          {/* <Environment preset="city" resolution={512} /> */}
          <Environment
            background={false}
            files={"hdr1.hdr"}
            path={import.meta.env.Mode === "production" ? "/portfolio/" : "/"}
          />

          <OrbitControls
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
            enableZoom={false}
            enablePan={false}
          />
        </Suspense>
        <ambientLight intensity={0.3} />
        <CustomSpotlight color="orange" />
      </Canvas>
      <ColorPicker state={hexagonState} />
    </>
  );
}
