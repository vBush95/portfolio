import React, { useState, useRef } from "react";

import { HiMenuAlt4, HiX } from "react-icons/hi";
import { motion, useCycle } from "framer-motion";

import "./Navbar.scss";
import { images } from "../../constants";
import useDimensions from "../../hooks/useDimensions";
import { Navigation } from "./mobile/Navigation";
import { MenuToggle } from "./mobile/MenuToogle";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at calc(100% - 2.8rem) 2.375rem)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: `circle(30px at calc(100% - 2.8rem) 2.375rem)`,
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  return (
    <>
      <nav className="app__navbar">
        <div className="app__navbar-container">
          <div className="app__navbar-logo">
            {/* <img src={images.personalLogoNoBackground} alt="logo"></img> */}
            <div className="app__navbar-logo-text">
              <div>Jan-Ole</div>
              <div>Wiebusch</div>
            </div>
          </div>
          <ul className="app__navbar-links">
            {["start", "work", "skills", "contact"].map((item) => (
              <li className="app__flex p-text" key={`link-${item}`}>
                <div></div>
                <a href={`#${item}`}>{item}</a>
              </li>
            ))}
          </ul>

          {/* <div className="app__navbar-menu">
        <HiMenuAlt4 onClick={() => setToggle(true)} />
        {toggle && (
          <motion.div
            whileInView={{ x: [300, 0] }}
            transition={{ duration: 0.85, easy: "easeOut" }}
          >
            <HiX onClick={() => setToggle(false)} />
            <ul>
              {["start", "about", "work", "skills", "contact"].map((item) => (
                <li key={item}>
                  <a href={`#${item}`} onClick={() => setToggle(false)}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div> */}
          <motion.nav
            initial={false}
            animate={isOpen ? "open" : "closed"}
            custom={height}
            ref={containerRef}
            className={`app__navbar-menu ${isOpen ? "" : "menu__pointer-none"}`}
          >
            <MenuToggle toggle={() => toggleOpen()} />
            <motion.div className={`background `} variants={sidebar} />
            <Navigation toggleOpen={() => toggleOpen} />
          </motion.nav>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
