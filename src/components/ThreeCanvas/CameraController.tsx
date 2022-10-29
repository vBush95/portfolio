import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const CameraController = () => {
  const { camera, gl } = useThree();

  useEffect(() => {
    camera.position.set(477.18, 809.18, 483.26);
    camera.rotation.set(0.96, 0.36, 0.46);
    camera.far = 3000;
    camera.near = 0.1;

    const controls = new OrbitControls(camera, gl.domElement);

    controls.minPolarAngle = 0;
    controls.maxPolarAngle = Math.PI / 3;
    controls.enableZoom = false;

    return () => {
      controls.dispose();
    };
  }, [camera, gl]);

  return null;
};

export default CameraController;
