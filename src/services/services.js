import axios from "axios";
import axiosInstance from "../api/axiosInstance"
import axiosInternalInstance from "../api/InternalAxiosInstance";

// Login 

export const Login = async (formData) => {
  try {
    const response = await axiosInstance.post('/authentication/clinic/user/login', formData);
    return response;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};


// calling Cache

export const callCahce = async () => {

  try {
    const response = await axiosInternalInstance.get(`/common/cache`);
    return response;
  } catch (err) {
    console.error("callCahce error:", err);
    throw err;
  }
};


// getting payor details

export const getPayor = async () => {
  try{
    const response = await axiosInternalInstance.get('common/list/83622');
    // console.log(response)
    return response
  } catch (err) {
    console.error("getPayor error:", err);
    throw err;
  }
}

// getting filtered list

export const getList = async (params) => {
  try {
    const response = await axiosInternalInstance.get('/ArManagement/list/range', {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("List error:", error); 
    throw error; 
  }
};
