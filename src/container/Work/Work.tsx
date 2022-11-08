import React, { useState, useEffect } from "react";
import { AiFillEye, AiFillGithub } from "react-icons/ai";
import { SiCodesandbox } from "react-icons/si";
import { motion } from "framer-motion";

import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";

import "./Work.scss";

export type WorkProps = {
  title: string;
  description: string;
  codeLink: string;
  projectLink: string;
  sandboxLink: string;
  downloadFile: string;
  displayedDownloadName: string;
  downloadFileName: string;
  tags: string[];
  imgUrl: string;
  techStack: string[];
};

const Work = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });

  const [works, setWorks] = useState<WorkProps[]>([]);
  const [filterWork, setFilterWork] = useState<WorkProps[]>([]);

  const handleWorkFilter = (item: string) => {
    setActiveFilter(item);
    setAnimateCard({ y: 100, opacity: 0 });

    setTimeout(() => {
      setAnimateCard({ y: 0, opacity: 1 });

      if (item === "All") {
        setFilterWork(works);
      } else {
        setFilterWork(works.filter((work) => work.tags.includes(item)));
      }
    }, 500);
  };

  useEffect(() => {
    const query = '*[_type == "works"]';

    client.fetch(query).then((data) => {
      setWorks(data);
      setFilterWork(data);
      // console.log(data);
    });
  }, []);

  return (
    <div className="app__work-wrapper">
      <h2 className="head-text">
        My <span>Projects</span> so far...
      </h2>
      <div className="app__work-filter">
        {[
          "All",
          "IoT",
          "Portfolio",
          "Data",
          "Responsive",
          "Full Project",
          "Small Project",
          "API",
          "Algorithms",
        ].map((item, index) => (
          <div
            key={`item-${index}`}
            onClick={() => handleWorkFilter(item)}
            className={`app__work-filter-item app__flex p-text ${
              activeFilter === item ? "item-active" : ""
            }`}
          >
            {item}
          </div>
        ))}
      </div>

      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__work-portfolio"
      >
        {[...filterWork].reverse().map((work, index) => (
          // <div className="app__work-item app__flex" key={`${index}-${work}`}>
          <div className="app__work-item " key={`${index}-${work}`}>
            <div className="app__work-img app__flex">
              {work.imgUrl && (
                // @ts-ignore
                <img src={urlFor(work.imgUrl)} alt={work.name}></img>
              )}

              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{
                  duration: 0.25,
                  ease: "easeInOut",
                  staggerChildren: 0.5,
                }}
                className="app__work-hover app__flex"
              >
                {work.projectLink && (
                  <a href={work.projectLink} target="_blank" rel="noreferrer">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      whileHover={{ scale: [1, 0.9] }}
                      transition={{ duration: 0.25 }}
                      className="app__flex app__work-item-page"
                    >
                      <AiFillEye />
                    </motion.div>
                  </a>
                )}

                {work.codeLink && (
                  <a href={work.codeLink} target="_blank" rel="noreferrer">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      whileHover={{ scale: [1, 0.9] }}
                      transition={{ duration: 0.25 }}
                      className=" app__flex app__work-item-github"
                    >
                      <AiFillGithub />
                    </motion.div>
                  </a>
                )}
                {work.sandboxLink && (
                  <a href={work.sandboxLink} target="_blank" rel="noreferrer">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      whileHover={{ scale: [1, 0.9] }}
                      transition={{ duration: 0.25 }}
                      className=" app__flex app__work-item-sandbox"
                    >
                      <SiCodesandbox />
                    </motion.div>
                  </a>
                )}
              </motion.div>
            </div>

            <div className="app__work-content app__flex">
              <h4 className="bold-text">{work.title}</h4>
              <p className="p-text" style={{ marginTop: 10 }}>
                {work.description}
              </p>
              <div className="app__work-tag app__flex">
                <p className="p-text">{work.tags[0]}</p>
              </div>
              <a href={work.downloadFile} download={work.downloadFileName}>
                {work.displayedDownloadName}
              </a>
              <div className="app__work-techstack">Tech Stack</div>
              <div className="divider"></div>
              <div className="app__work-tech">
                {work.techStack.map((technology, index) => {
                  return (
                    <div
                      key={`${technology}-${index}`}
                      className="app__work-tech-item"
                    >
                      {technology}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default AppWrap(
  MotionWrap(Work, "app__works"),
  "work",
  "app__primarybg"
);
