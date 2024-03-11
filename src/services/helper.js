import axios from "axios";
import { getToken } from "../auth";

export const BASE_URL = "http://localhost:8080/api/v1";
export const myAxios = axios.create({
  baseURL: BASE_URL,
});

export const privateAxios = axios.create({
  baseURL: BASE_URL,
});


privateAxios.interceptors.request.use((req)=>{
  const token=getToken();
  // console.log(token)
  if(token){
    req.headers.Authorization=`Bearer ${token}`;
    console.log(req)
    return req
  }
},
(error)=>Promise.reject(error)
)


export default privateAxios;
