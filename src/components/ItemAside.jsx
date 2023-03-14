const ItemAside = ({ active, setSelected, value, category }) => {
  return (
    <li onClick={() => setSelected(category)}>
      <p
        style={{ background: active ? "#4A5568" : "transparent" }}
        className="w-2/3 p-2 rounded-lg mx-auto text-center hover:bg-gray-700 cursor-pointer ease-in duration-200"
      >
        {value}
      </p>
    </li>
  );
};

export default ItemAside;
