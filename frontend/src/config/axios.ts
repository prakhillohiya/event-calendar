import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URI}`,
  timeout: 5000,
});

axiosInstance.interceptors.response.use(
  (response) => {


    return response;
  },
  (error) => {

    // if (error.response && error.response.status === 401) {
    //   window.location.href = '/login';
    // }

    // if (axios.isAxiosError(error) && error.code === ("ERR_NETWORK" || "ECONNABORTED" || "ETIMEDOUT ")) {
    //   return "SERVER_DOWN"
    // }


    return Promise.reject(error);
  }
);

export default axiosInstance;

