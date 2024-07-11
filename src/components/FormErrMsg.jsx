import React from "react";

const FormErrMsg = ({ errors, inputName }) => {
  return (
    <span className="text-red-500 text-[1.2em] font-semibold text-center">
      {errors[inputName]?.message}
    </span>
  );
};

export default FormErrMsg;
