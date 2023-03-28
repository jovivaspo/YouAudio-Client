import React from "react";
import loader from "../assets/loader.svg";

const Loader = () => {
  return (
    <div className="w-full flex justify-center mt-10">
      <img src={loader} alt="Cargando..." width={80} height={80} />
    </div>
  );
};

export default Loader;
