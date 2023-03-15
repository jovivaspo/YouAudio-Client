import { useResize } from "../hooks/useResize";
import { useSearch } from "../hooks/useSearch";

import MenuButton from "./MenuButton";
import Search from "./Search";
import SearchButton from "./SearchButton";

const Navbar = ({ setOpen, open, size }) => {
  const { setActive, searchRef, handlerSearch, handlerChange, search } =
    useSearch(size);

  return (
    <nav className="sticky top-0 w-full z-50 border-b-2 border-gray-600 bg-dark sm:h-16">
      <div className="relative h-14 sm:h-16 px-4 flex items-center justify-between gap-1">
        <div className="flex gap-4">
          <MenuButton setOpen={setOpen} open={open} />
          <h2 className="text-white text-xl justify-items-start">YouAudio</h2>
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
