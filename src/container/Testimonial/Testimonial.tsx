import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";

import "./Testimonial.scss";

export type TestimonialProps = {
  name: string;
  company: string;
  imageurl: string;
  feedback: string;
};

export type BrandProps = {
  name: string;
  imageurl: string;
};

const Testimonial = () => {
  const [brands, setBrands] = useState<BrandProps[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialProps[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleClick = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const query = '*[_type == "testimonials"]';
    const brandsQuery = '*[_type == "brands"]';

    client.fetch(query).then((data) => {
      console.log(data);
      setTestimonials(data);
    });

    client.fetch(brandsQuery).then((data) => {
      console.log(data);
      setBrands(data);
    });
  }, []);

  const testi = testimonials[currentIndex];

  return (
    <>
      {testimonials.length && (
        <>
          <div className="app__testimonial-item app__flex">
            {
              <img
                // @ts-ignore
                src={urlFor(testi.imageurl)}
                alt="testimonials"
              />
            }
            <div className="app__testimonial-content">
              <p className="p-text">{`„ ${testi.feedback} “`} </p>
              <div>
                <h4 className="bold-text">{testi.name}</h4>
                <h5 className="p-text">{testi.company}</h5>
              </div>
            </div>
          </div>

          <div className="app__testimonial-btns app__flex">
            <div
              className="app__flex"
              onClick={() =>
                handleClick(
                  currentIndex === 0
                    ? testimonials.length - 1
                    : currentIndex - 1
                )
              }
            >
              <HiChevronLeft />
            </div>
            <div
              className="app__flex"
              onClick={() =>
                handleClick(
                  currentIndex === testimonials.length - 1
                    ? 0
                    : currentIndex + 1
                )
              }
            >
              <HiChevronRight />
            </div>
          </div>
        </>
      )}

      <div className="app__testimonial-brands app__flex">
        {brands.map((brand, index) => (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, type: "tween" }}
            key={`${brand.name}-${index}`}
          >
            {
              <img
                // @ts-ignore
                src={urlFor(brand.imgUrl)}
                alt={brand.name}
              />
            }
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Testimonial, "app__testimonial"),
  "testimonial",
  "app__primarybg"
);
