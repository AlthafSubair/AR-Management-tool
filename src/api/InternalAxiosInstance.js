import axios from "axios";
import useAuthStore from "../store/authStore";

const baseURL =  import.meta.env.VITE_INTERNAL_API_URL; // accessind api url from .env

// creating base instance of axios for internal services

const axiosInternalInstance = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        'application-id': '8',
    }
});

// appending bearer token to header

    axiosInternalInstance.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken;
    if(token){
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config;
})

export default axiosInternalInstance