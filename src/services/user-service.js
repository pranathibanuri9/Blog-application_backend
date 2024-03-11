import { myAxios ,privateAxios} from "./helper";

export const signup=(user)=>{

    return myAxios.post('/auth/register',user)
    .then((response)=>response.data);
}

export const loginUser=(loginDetail)=>{
    return myAxios.post('/auth/login',loginDetail)
    .then((response)=>response.data)
}

export const getUser=(userId)=>{
    return myAxios.get(`/users/${userId}`).then(res=>res.data)
}

export const updateUserupdate=(newuser,userId)=>{
    // console.log(newuser)
    console.log(newuser)
    
    return privateAxios.put(`/users/${userId}`,newuser).then((res)=>res.data)
}
