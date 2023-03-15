import React, { useContext, useState } from "react";
import Navbar from "./Navbar";
import Aside from "./Aside";
import { Globalcontext } from "../contexts/GlobalContext";
import { categories } from "../helpers/categories";

const Layout = ({ children }) => {
  const { selected, setSelected } = useContext(Globalcontext);
  const [open, setOpen] = useState(false);

  return (
    <div className="relative z-0 bg-dark h-screen w-screen overflow-x-hidden">
      <Navbar setOpen={setOpen} open={open} />
      <div className="flex w-screen">
        {
          <Aside
            categories={categories}
            selected={selected}
            setSelected={setSelected}
            open={open}
          />
        }
        <div className="grow grid grid-cols-1 grid-rows-1 gap-6 my-10 mx-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
