import React, { useContext, useState } from "react";
import Navbar from "./Navbar";
import Aside from "./Aside";
import { Globalcontext } from "../contexts/GlobalContext";
import { categories } from "../helpers/categories";
import Content from "./Content";
import { useResize } from "../hooks/useResize";
import Alert from "./Alert";

const Layout = ({ children }) => {
  const { selected, setSelected } = useContext(Globalcontext);
  const [open, setOpen] = useState(false);
  const size = useResize();

  return (
    <div className="relative z-0 bg-dark h-screen w-screen overflow-x-hidden">
      <Navbar setOpen={setOpen} open={open} size={size} />
      <div className="flex w-screen">
        {
          <Aside
            categories={categories}
            selected={selected}
            setSelected={setSelected}
            open={open}
            setOpen={setOpen}
            size={size}
          />
        }
        <Content open={open} size={size}>
          {children}
        </Content>
      </div>
      <Alert />
    </div>
  );
};

export default Layout;
