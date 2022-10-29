import * as React from "react";
import { motion } from "framer-motion";
import { images } from "../../../constants";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];

export const MenuItem = ({
  item,
  index,
  toggleOpen,
}: {
  item: any;
  index: number;
  toggleOpen: any;
}) => {
  // const style = { border: `2px solid ${colors[index]}` };
  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {" "}
      <a
        className="text-placeholder"
        // style={style}
        href={`#${item}`}
        onClick={toggleOpen()}
      >
        <div
          className="icon-placeholder"
          // style={style}
        >
          <img src={images.react} alt="img" />
        </div>

        {item}
      </a>
    </motion.li>
  );
};
