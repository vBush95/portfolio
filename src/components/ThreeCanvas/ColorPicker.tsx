import { useState, useEffect } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import { useSnapshot } from "valtio";

function ColorPicker({ state }: { state: any }) {
  const snap = useSnapshot(state);

  //console.log("colorpicker", snap.hexagons[snap.current]);
  return (
    // <div style={{ display: snap.current ? "block" : "none" }}>
    <div
      style={{ display: snap.current ? "flex" : "none" }}
      className="app__header-color-wrapper"
    >
      <HexColorPicker
        className="picker"
        color={snap.hexagons[snap.current]}
        onChange={(color) => (state.hexagons[snap.current] = color)}
      />
      <HexColorInput
        color={snap.hexagons[snap.current]}
        onChange={(color) => (state.hexagons[snap.current] = color)}
      />
      <h1>{snap.current ? snap.current : "..."}</h1>
    </div>
  );
}

export default ColorPicker;
