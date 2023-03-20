import api from "../api/api";
export const getNameUser = async (channel) => {
  const videoId = channel.items[0].id;

  try {
    const { data } = await api.get(`/video/info/${videoId}`);

    const nameUser = await data.videoDetails.user;

    return nameUser;
  } catch (error) {
    return { error: "No se pudo obtener el user" };
  }
};
