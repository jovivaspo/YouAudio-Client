import React, { useEffect, useState } from "react";
import { categories } from "../helpers/categories";
import api from "../api/api";

const Home = () => {
  const [selected, setSelected] = useState(Object.keys(categories)[0]);
  console.log(selected);
  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await api.get(`/video/category/${selected}`);
        console.log(data);
      } catch (error) {
        console.log(error.response.data.error);
      }
    };

    getCategories();
  }, [selected]);
  return (
    <div className="flex w-screen">
      <aside className="text-white w-2/3 bg-red-300 h-screen">
        barra lateral
      </aside>
      <div className="text-white">contenedor de videos</div>
    </div>
  );
};

export default Home;
