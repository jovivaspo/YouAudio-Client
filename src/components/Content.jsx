import React, { useRef, useEffect } from "react";

const Content = ({ open, size, children }) => {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = "calc(100% - 56px)";
      if (open && size > 1024) {
        const sizeContent = (size - 320).toString();
        ref.current.style.transform = "translateX(320px)";
        ref.current.style.width = `${sizeContent}px`;
      } else {
        ref.current.style.transform = "translateX(0)";
        ref.current.style.width = "100vw";
      }
    }
  }, [open, size]);

  return <div ref={ref}>{children}</div>;
};

export default Content;
