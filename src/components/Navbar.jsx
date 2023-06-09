import { Link } from "react-router-dom";
import logo from "../assets/Logo-dark.png"
import { useSearch } from "../hooks/useSearch";

import MenuButton from "./MenuButton";
import Search from "./Search";
import SearchButton from "./SearchButton";

const Navbar = ({ setOpen, open, size }) => {
  const { setActive, searchRef, handlerSearch, handlerChange, search } =
    useSearch(size);

  return (
    <nav className="fixed top-0 w-full z-50 border-b-2 border-gray-600 bg-dark sm:h-16">
      <div className="relative h-14 sm:h-16 px-4 flex items-center justify-between gap-1">
        <div className="flex gap-4 items-center">
          <MenuButton setOpen={setOpen} open={open} />
          <Link to="/">
            <div className="w-36 h-10 mb-2">
            <img src={logo} alt="logo-youaudio" className="w-full h-full object-cover"/>
            </div>
         
          </Link>
        </div>
        <Search
          ref={searchRef}
          handlerSearch={handlerSearch}
          handlerChange={handlerChange}
          search={search}
        />
        <SearchButton
          size={size}
          setActive={setActive}
          handlerSearch={handlerSearch}
        />
      </div>
    </nav>
  );
};

export default Navbar;
