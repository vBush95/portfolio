import React from "react";
import { BsTwitter, BsInstagram, BsLinkedin } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";

const SocialMedia = () => {
  return (
    <div className="app__social">
      {/* <div>
        <BsTwitter />
      </div>
      <div>
        <FaFacebookF />
      </div>
      <div>
        <BsInstagram />
      </div> */}

      <a href={`https://www.linkedin.com/in/jan-ole-wiebusch-b46a6424a/`}>
        <BsLinkedin />
      </a>
    </div>
  );
};

export default SocialMedia;
