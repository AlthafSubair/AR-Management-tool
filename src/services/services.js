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

// export and download table data

export const exportTable = async (params) => {
   try {
    const response = await axiosInternalInstance.get('/ArManagement/export', {
      params,
      responseType: 'blob'
    });
    return response.data;
  } catch (error) {
    console.error("export table error:", error); 
    throw error; 
  }
}


// multi select owner update

export const multiUpdateOwner = async (formData) => {
  try {

    const response = await axiosInternalInstance.put('/ArManagement/list', formData);
    return response.data;
    
  } catch (error) {
    console.error("multiple owner updation error:", error); 
    throw error; 
  }
}

// geeting notes

export const getNotes = async ({ patientId, claimId }) => {
  try {
    let url = 'common/claim/note/list';
    if (claimId) {
      url += `/${claimId}`;
    }

    const response = await axiosInternalInstance.get(url, {
      params: { patientId }
    });

    return response.data;
  } catch (error) {
    console.error("error in getting notes:", error); 
    throw error; 
  }
}


// getting eob details

export const getEob = async (claimId) => {
  try{
    const response = await axiosInternalInstance.get(`/common/payment/eob/list/${claimId}`)
    return response.data
  }catch(error){
     console.error("error in getting eob:", error); 
    throw error;
  }
}

// download eob

export const downloadEob = async({claimId, clinicId, fileId, fileName}) => {
  try {
    const response = await axiosInternalInstance.get(`/coderPortal/download${claimId}/${clinicId}/${fileId}/${fileName}`)
    return response.data
  } catch (error) {
    console.error("error in downloading eob:", error); 
    throw error;
  }
}