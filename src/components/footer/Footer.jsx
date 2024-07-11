import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white lg:py-8 py-3 ">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Logo */}
        <div className="mb-4 md:mb-0">
          <img src={logo} alt="Logo" className="h-18" />
        </div>

        {/* Site Links */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-4 md:mb-0">
          <Link to="/" className="text-gray-300 hover:text-white">
            Home
          </Link>
          <Link to="/profile" className="text-gray-300 hover:text-white">
            Profile
          </Link>
        </div>

        {/* Copyright and Developer Details */}
        <div className="text-center md:text-left">
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} DroineTech. All rights reserved.
          </p>
          <p className="text-gray-500">Developed by {"RabbitDaCoder"}</p>
          <div className="flex justify-center md:justify-start gap-4 mt-2 py-6">
            <a
              href="https://github.com/RabbitDaCoder59"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="text-gray-300 hover:text-white" size={30} />
            </a>
            <a
              href="https://www.linkedin.com/in/godwin-christain-0a4774253/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin
                className="text-gray-300 hover:text-white"
                size={30}
              />
            </a>
            <a
              href="https://x.com/EdehChinedu20"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="text-gray-300 hover:text-white" size={30} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
