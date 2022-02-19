import axios from "axios";
import URL from "./../utils/api_url";

const getInstance = () => {
  const instance = axios.create({
    baseURL: URL.baseUrl,
    timeout: 30000,
  });
  instance.interceptors.request.use(
    async (config) => {
     
      if (typeof window !== "undefined") {
        let token = localStorage.getItem("token");
        config.headers.Authorization = token ? `Bearer ${token}` : "";
      }
      // if (!token) {
      //   return config;
      // }
      // let header = {
      //   ...config.headers,
      //   Authorization: token,
      // };

      

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
