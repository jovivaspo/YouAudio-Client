import React, { useEffect, useState } from "react";
import { categories } from "../helpers/categories";
import api from "../api/api";
import Aside from "../components/Aside";

const Home = () => {
  const [selected, setSelected] = useState(Object.keys(categories)[0]);
  const [videos, setVideos] = useState([]);

  console.log(selected);
  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await api.get(`/video/category/${selected}`);
        setVideos(data.results);
      } catch (error) {
        console.log(error.response.data.error);
      }
    };

    getCategories();
  }, [selected]);
  console.log(videos);
  return (
    <div className="flex w-screen">
      {
        <Aside
          categories={categories}
          selected={selected}
          setSelected={setSelected}
        />
      }
      <div className="grow grid grid-cols-4 grid-rows-4 gap-4 m-16">
        {videos.length > 0 &&
          videos.map((video, index) => {
            return (
              <div key={index}>
                <img
                  src={video.snippet.thumbnails.medium.url}
                  alt=""
                  className="rounded-xl"
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
