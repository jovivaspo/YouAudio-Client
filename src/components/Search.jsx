import React from "react";
const Search = React.forwardRef((props, ref) => {
  const { handlerSearch, handlerChange, search } = props;

  return (
    <form
      ref={ref}
      className="absolute top-0 left-0 z-10 w-screen sm:relative sm:w-1/2 sm:translate-y-0 sm:ml-auto  lg:w-1/3"
      onSubmit={handlerSearch}
    >
      <input
        type="search"
        className="input-search w-full h-14 px-4  bg-dark text-white focus:outline-none focus:border-blue-700   sm:h-10 sm:border-2 rounded-l-full sm:border-gray-500 "
        placeholder="Buscar"
        value={search}
        onChange={handlerChange}
      />
    </form>
  );
});

export default Search;
