import axios from "axios"
import { privateAxios } from "./helper"
import { myAxios } from "./helper"
import React from "react"
// createpost function

export const ceratePostserver=(postData)=>{
    
    return privateAxios.post(`/user/${postData.userId}/category/${postData.categoryId}/posts`,postData).then(response=>response.data)


}


export const loadAllPosts=(pageNumber,pageSize)=>{
    return myAxios.get(`/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`).then(response=>response.data)
}
// get all posts

// load single post by id

export const loadPost=(postId)=>{
    return myAxios.get("/post/"+postId).then(response=>response.data);


}

export const createComment=(Comment,postId)=>{
    return privateAxios.post(`/post/${postId}/comments`,Comment)
}


export const UploadpostImage=(image,postId)=>{
    let formData=new FormData();
    formData.append("image",image);
    return privateAxios.post(`/post/image/upload/${postId}`,formData,{
        headers:{'Content-Type':'multipart/form-data'}
    }).then((response)=>response.data)

}

// get posts by category
export const loadPostCategorywise=(categoryId)=>{
    return myAxios.get(`/category/${categoryId}/posts`).then(res=>res.data)
}

export const loadPostByUserId=(userId)=>{
    return privateAxios.get(`user/${userId}/posts`).then(response=>response.data)
}


export function deletePostbyId(postId){
    return privateAxios.delete(`/postd/${postId}`).then((res)=>res.data)
}

export function updatePostupdate(post,postId){
    console.log(post)
    return privateAxios.put(`/post/${postId}`,post).then((resp)=>resp.data)
}


