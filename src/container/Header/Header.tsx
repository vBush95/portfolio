import React from "react";

import { motion } from "framer-motion";
import { BsFillArrowDownSquareFill } from "react-icons/bs";
import { images } from "../../constants";

import { AppWrap } from "../../wrapper";

import "./Header.scss";
import ThreeCanvas from "../../components/ThreeCanvas/ThreeCanvas";
import HexagonCanvas from "../../components/ThreeCanvas/HexagonCanvas";

const scaleVariants = {
  whileInView: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

const Header = () => {
  return (
    <div className="app__header app__flex">
      <div className="app__header-canvas">
        <HexagonCanvas />
      </div>

      <div className="app__header-mobile-scroll">
        <a href={`#work`}>
          <BsFillArrowDownSquareFill />
        </a>
      </div>
    </div>
  );
};

export default AppWrap(Header, "start", "");
