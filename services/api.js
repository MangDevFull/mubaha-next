import axios from "axios";
import URL from "./../utils/api_url";
const getInstance = () => {
  const instance = axios.create({
    baseURL: URL.baseUrl,
    timeout: 30000,
  });
  instance.interceptors.request.use(
    async (config) => {
      let token = "";
      if (typeof window !== "undefined") {
        if (localStorage.getItem("token")) return localStorage.getItem("token");
        return "";
      }
      if (!token) {
        return config;
      }
      let header = {
        ...config.headers,
        Authorization: token,
      };

      config.headers = header;

      return config;
    },
    (err) => {
      console.log("err: " + err);
      return Promise.reject(err);
    }
  );
  return instance;
};

const API = {
  instance: getInstance(),
};

export default API;
