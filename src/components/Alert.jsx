import React, { useContext, useEffect, useRef } from "react";
import { Globalcontext } from "../contexts/GlobalContext";

const Alert = () => {
  const { alert, setAlert } = useContext(Globalcontext);
  const refContainer = useRef(null);

  useEffect(() => {
    if (refContainer.current && alert) {
      refContainer.current.style.transform = "translateX(0)";
      const timeAlert = setTimeout(() => {
        refContainer.current.style.transform = "translateX(100%)";
      }, 2500);
      return () => clearTimeout(timeAlert);
    }
  }, [alert, refContainer.current]);

  useEffect(() => {
    if (alert) {
      const deleteAlert = setTimeout(() => {
        setAlert("");
      }, 3200);
      return () => clearTimeout(deleteAlert);
    }
  }, [alert]);

  return (
    <>
      {alert && (
        <div
          ref={refContainer}
          className="absolute top-20 right-0 bg-blue-600  p-4 rounded-l-xl translate-x-full ease-in duration-100 pr-6"
        >
          <p className="text-alert text-white">
            <strong>{alert}</strong>
          </p>
        </div>
      )}
    </>
  );
};

export default Alert;
