import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="relative z-0 bg-dark h-screen w-screen overflow-x-hidden">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
