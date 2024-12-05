import React from "react";
import Ilustration1 from "../../src/assets/home.png";
const Emptynote = () => {
  return (
    <div className="noContent mb-6">
      <div className="img flex lg:py-0 md:py-0 justify-center items-center">
        <img
          src={Ilustration1}
          alt="Ilustration1"
          className="lg:aspect-square h-[330px] lg:w-extraLgW lg:h-full"
        />
      </div>
      <h1 className="text-white text-center text-2xl font-bold">
        Create your first Note!
      </h1>
    </div>
  );
};

export default Emptynote;
