import React, { useState } from "react";

import { images } from "../../constants";
import { AppWrap, MotionWrap } from "../../wrapper";
import { client } from "../../client";

import "./Footer.scss";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { name, email, message } = formData;

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (name && email) {
      setLoading(true);

      const contact = {
        _type: "contact",
        name,
        email,
        message,
      };

      client.create(contact).then((res) => {
        console.log(`message was sent ${res._id}`);
        setLoading(false);
        setIsFormSubmitted(true);
      });
    }
  };

  return (
    <div className="app__footer app__flex">
      <h2 className="head-text">
        Send an <span>Email</span> at:
      </h2>
      <div className="app__footer-cards">
        <div className="app__footer-card">
          {/* <img src={images.email} alt="email" /> */}
          <a href="mailto:janole.wiebusch@t-online.de" className="p-text">
            janole.wiebusch@t-online.de
          </a>
        </div>
        {/* <div className="app__footer-card">
          <img src={images.mobile} alt="mobile" />
          <a href="tel: +1 (123) 456-789" className="p-text">
            +1 (123) 456-789
          </a>
        </div> */}
      </div>
      <h2 className="head-text">
        Or Leave a <span>Message</span> ...
      </h2>

      {!isFormSubmitted ? (
        <div className="app__footer-form app__flex">
          <div className="app__flex">
            <input
              className="p-text"
              type="text"
              placeholder="Your Name"
              name="name"
              value={name}
              onChange={handleInputChange}
            />
          </div>
          <div className="app__flex">
            <input
              className="p-text"
              type="email"
              placeholder="Your Email"
              name="email"
              value={email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <textarea
              className="p-text"
              placeholder="Your Message"
              value={message}
              name="message"
              onChange={handleInputChange}
            />
          </div>
          <button type="button" className="p-text" onClick={handleSubmit}>
            {loading ? "Sending" : "Send Message"}
          </button>
        </div>
      ) : (
        <h3 className="head-text">Thank You For Getting in Touch!</h3>
      )}
    </div>
  );
};

export default AppWrap(
  MotionWrap(Footer, "app__footer"),
  "contact",
  "app__primarybg"
);
