import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";

import "./About.scss";

export type AboutProps = {
  title: string;
  description: string;
  imgUrl: string;
};

const About = () => {
  const [abouts, setAbouts] = useState<AboutProps[]>([]);

  useEffect(() => {
    const query = '*[_type == "abouts"]';

    client.fetch(query).then((data) => {
      setAbouts(data);
    });
  }, []);

  return (
    <>
      <h2 className="head-text">
        I Know That <span>Good Dev</span>
        <br />
        means <span>Good Business</span>
      </h2>

      <div>This is about me</div>
      <div className="app__profiles">
        {abouts &&
          abouts.map((about, index) => (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5, type: "tween" }}
              className="app__profile-item"
              key={about.title + index}
            >
              {
                // @ts-ignore
                <img src={urlFor(about.imgUrl)} alt={about.title} />
              }
              <div className="bold-text" style={{ marginTop: 10 }}>
                {about.title}
              </div>
              <p className="p-text" style={{ marginTop: 10 }}>
                {about.description}
              </p>
            </motion.div>
          ))}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(About, "app__about"),
  "about",
  "app__whitebg"
);
