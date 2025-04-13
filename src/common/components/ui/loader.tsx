import React from "react";

function Loader() {
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <div className="spinner relative w-[22.4px] h-[22.4px]"></div>
    </div>
  );
}

export default Loader;
