import ItemAside from "./ItemAside";
import { useEffect, useRef } from "react";

const Aside = ({ categories, selected, setSelected, open }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = "calc(100% - 56px)"
     
      open
        ? (ref.current.style.transform = "translateX(0)")
        : (ref.current.style.transform = "translateX(-100%)");
    }
  }, [open]);

  return (
    <aside
      ref={ref}
      className="fixed top-0 left-0 z-10 bg-black opacity-90 lg:bg-transparent text-white w-80 my-14 p-10  border-r-2 border-gray-500 ease-linear duration-100 -translate-x-full"
    >
      <ul className="h-full flex flex-col justify-around ">
        {selected &&
          Object.keys(categories).map((category, index) => {
            return (
              <ItemAside
                key={index}
                active={category === selected}
                setSelected={setSelected}
                value={categories[category]}
                category={category}
              />
            );
          })}
      </ul>
    </aside>
  );
};

export default Aside;
