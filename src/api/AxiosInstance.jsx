import axios from "axios";

const axiosInstence=axios.create({
    baseURL:process.env.REACT_APP_URL

})

axiosInstence.interceptors.request.use(
    async function (config) {
      const token =
        localStorage.getItem("userToken") || sessionStorage.getItem("userToken");
      if (token !== null || token !== undefined) {
        config.headers["x-access-token"] = token;
      }
      return config;
    },
    function (err) {
      return Promise.reject(err);
    }
  );

export default axiosInstence


