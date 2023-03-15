import { createContext, useState } from "react";
import { categories } from "../helpers/categories";

const Globalcontext = createContext();

const GlobalProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [videos, setVideos] = useState([]);
  const [selected, setSelected] = useState(Object.keys(categories)[0]);

  const data = {
    loading,
    setLoading,
    alert,
    setAlert,
    videos,
    setVideos,
    selected,
    setSelected,
  };

  return (
    <Globalcontext.Provider value={data}>{children}</Globalcontext.Provider>
  );
};

export { GlobalProvider, Globalcontext };
