import axios from "axios";
import { getVariables } from "../helpers/getVariables";

const { VITE_API_URL } = getVariables();

const api = axios.create({
  baseURL: VITE_API_URL,
});

export default api;
