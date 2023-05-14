import axios from "axios";
import { selectUserAgent } from "../utils/agent";

export const api = axios.create({
  baseURL: "https://tame-cyan-dog-veil.cyclic.app/gogoanime",
  headers: {
    "Content-type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  config.headers["user-agent"] = selectUserAgent();

  return config;
});
