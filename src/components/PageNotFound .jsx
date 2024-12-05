import React from "react";
import NotFoundImage from "./../assets/not-found-image.png";
const Searchui = () => {
  return (
    <div className="flex flex-col h-screen bg-bgColors p-4">
      <div className="">
        <div className="flex flex-col items-center">
          <img src={NotFoundImage} alt="Not Found" className="w-58 mb-4" />
          <h1 className="text-center text-5xl pb-6 font-extrabold text-gray-300">
            404 Page
          </h1>
          <p className="text-center text-2xl text-gray-300">
            There's probably Nothing here
          </p>
        </div>
      </div>
    </div>
  );
};

export default Searchui;
