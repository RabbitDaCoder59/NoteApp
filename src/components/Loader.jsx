// src/components/Loader.jsx
import React, { useEffect } from "react";
import { useLoading } from "../context/LoadingContext";

const Loader = () => {
  const { loading, setLoading } = useLoading();

  // Rotate the loader for 4 seconds on every loading state change
  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 4000); // 4 seconds
      return () => clearTimeout(timer);
    }
  }, [loading, setLoading]);

  if (!loading) return null;

  return (
    <div className="loader w-12 h-12 scale-75 relative border-4 border-solid border-[#8f44fd] border-t-white border-b-white rounded-full animate-spin">
      <div className="absolute top-0 left-0 border-2 border-transparent border-b-white transform translate-x-[10px] rotate-[-35deg]"></div>
      <div className="absolute top-0 left-0 border-2 border-[#8f44fd] border-l-transparent transform translate-x-[32px] rotate-[-35deg]"></div>
    </div>
  );
};

export default Loader;
