import React, { useContext, useEffect, useRef } from "react";
import { Globalcontext } from "../contexts/GlobalContext";

const Alert = () => {
  const { alert, setAlert } = useContext(Globalcontext);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      if (alert) {
        ref.current.style.transform = "translateX(0)";
        const timeAlert = setTimeout(() => {
          ref.current.style.transform = "translateX(100%)";
          setAlert("");
        }, 2500);
        return () => clearTimeout(timeAlert);
      }
    }
  }, [alert, ref]);

  return (
    <div
      ref={ref}
      className="absolute top-20 right-0 bg-blue-600  p-4 rounded-l-xl translate-x-full ease-in duration-100 pr-6"
    >
      <p className="text-white">
        <strong>{alert}</strong>
      </p>
    </div>
  );
};

export default Alert;
