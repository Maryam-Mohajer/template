import { errorToast, successToast } from "@/core/utils/toasts";
import axios, { AxiosResponse } from "axios";
import { getAccessToken } from "../authentication/authentication.service";

axios.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    // successToast()
    return response;
  },
  (error: any) => {
    const { response, message } = error;
    if (response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx
      const { data, status, statusText } = response;

      if (status === 401) {
        // Handle unauthorized error
        console.error("Unauthorized error:", data);
      } else if (status === 403) {
        // Handle forbidden error
        console.error("Forbidden error:", data);
      } else if (status >= 400 && status < 500) {
        // Handle client errors
        errorToast(data.message[0]);
        console.error(`Client error: ${status} ${statusText}`, data.message[0]);
      } else if (status >= 500 && status < 600) {
        // Handle server errors
        console.error(`Server error: ${status} ${statusText}`, data);
      } else {
        // Handle other errors
        console.error(`Error: ${status} ${statusText}`, data);
      }
    } else if (message === "Network Error") {
      // Handle network error
      console.error("Network error:", message);
    } else {
      // Handle other errors
      console.error("Error:", message);
    }
    errorToast();
    return Promise.reject(error);
  }
);

const methods = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default methods;
