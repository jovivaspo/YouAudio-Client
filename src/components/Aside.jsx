import ItemAside from "./ItemAside";

const Aside = ({ categories, selected, setSelected }) => {
  console.log(selected);
  return (
    <aside className="text-white w-2/3 max-w-xs h-screen border-r-2 border-gray-500">
      <ul className="h-full flex flex-col justify-around">
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
