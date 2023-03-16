import { useState, useEffect, useRef } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const useSearch = (size) => {
  const [active, setActive] = useState(false);
  const searchRef = useRef();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handlerChange = (e) => {
    setSearch(e.target.value);
  };

  const handlerSearch = async (e) => {
    e.preventDefault();
    if (!search) {
      return;
    }
    navigate(`/search/${search}`);
  };

  useEffect(() => {
    if (!active && size <= 640) {
      searchRef.current.style.transform = "translateY(-56px)";
    } else {
      searchRef.current.style.transform = "translateY(0px)";
    }
  }, [active, size]);

  useEffect(() => {
    function handlerClick(e) {
      if (active && !searchRef.current.contains(e.target) && size <= 640) {
        setActive(false);
      }
    }
    if (searchRef.current) {
      document.addEventListener("mousedown", handlerClick);
      return () => {
        document.removeEventListener("mousedown", handlerClick);
      };
    }
  }, [active, searchRef]);

  return { active, setActive, searchRef, handlerSearch, handlerChange, search };
};

export { useSearch };
