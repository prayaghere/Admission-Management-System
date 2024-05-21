// interceptor
 
import axios from "axios"; 
 
const axiosInstance = axios.create({ 
  // eslint-disable-next-line no-undef 
  baseURL: import.meta.env.VITE_API_BASE_URL,  
}); 
 
axiosInstance.interceptors.request.use( 
  (config) => { 
    const token = localStorage.getItem("token"); 
    if (token) { 
      config.headers.Authorization = `Bearer ${token}`; 
    } 
    return config; 
  }, 
  (error) => { 
    return Promise.reject(error); 
  } 
); 
 
axiosInstance.interceptors.response.use( 
  (response) => { 
    return response; 
  }, 
  (error) => { 
    return Promise.reject(error); 
  } 
); 
 
export default axiosInstance; 
