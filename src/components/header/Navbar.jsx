import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { FaCircleUser } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
const Navbar = () => {
  return (
    <div className="w-full sticky top-0 z-40 bg-gray-900 px-3 py-3">
      <header className="flex items-center justify-between">
        <div className="leftSide ">
          <div className="logo flex items-center gap-2">
            <Link to="/">
              <img src={logo} alt="logo" className="w-16" />
            </Link>
            <h1 className="font-semibold text-white text-2xl">Notes</h1>
          </div>
        </div>
        <div className="rightSide flex gap-3">
          <Link to="profile">
            <div className="p-2 rounded-sm h-full bg-primary-100">
              <FaCircleUser className="icon" />
            </div>
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
