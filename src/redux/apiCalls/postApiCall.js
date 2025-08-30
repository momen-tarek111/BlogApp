import { toast } from "react-toastify";
import request from "../../utils/request";
import { postActions } from "../slices/postSlice";
export function fetchPosts(pageNumber){
    return async(dispatch)=>{
        try {
            const {data}= await request.get(`/api/posts?pageNumber=${pageNumber}`)
            dispatch(postActions.setPosts(data));
        } catch (error) {
            toast.error(error.response.data.message )
        }
    }
}
export function getPostsCount(){
    return async(dispatch)=>{
        try {
            const {data}= await request.get(`/api/posts/count`)
            dispatch(postActions.setPostsCount(data));
        } catch (error) {
            toast.error(error.response.data.message )
        }
    }
}

export function fetchPostsBasedOnCategory(category){
    return async(dispatch)=>{
        try {
            const {data}= await request.get(`/api/posts?category=${category}`)
            dispatch(postActions.setPostsCategory(data));
        } catch (error) {
            toast.error(error.response.data.message )
        }
    }
}

export function createPost(newPost){
    return async(dispatch,getState)=>{
        try {
            dispatch(postActions.setLoading());
            await request.post(`/api/posts`, newPost,{
                headers:{
                    Authorization: "Bearer "+ getState().auth.user.token,
                    "Content-Type":"multipart/form-data"
                }
            })
            dispatch(postActions.setIsPostCreated());
            setTimeout(()=>{postActions.clearIsPostCreated()},2000)
        } catch (error) {
            toast.error(error.response.data.message )
            dispatch(postActions.clearLoading());
        }
    }
}

export function fetchSinglePost(postId){
    return async(dispatch)=>{
        try {
            const {data}= await request.get(`/api/posts/${postId}`)
            dispatch(postActions.setPost(data));
        } catch (error) {
            toast.error(error.response.data.message )
        }
    }
}

export function toggleLikePost(postId){
    return async(dispatch,getState)=>{
        try {
            const {data}= await request.put(`/api/posts/like/${postId}`,{},{
                headers:{
                    Authorization: "Bearer "+ getState().auth.user.token,
                }
            })
            dispatch(postActions.setLike(data));
        } catch (error) {
            toast.error(error.response.data.message )
        }
    }
}
export function updatePostImage(newImage,postId){
    return async(dispatch,getState)=>{
        try {
            console.log(newImage);
            await request.put(`/api/posts/upload-image/${postId}`,newImage,{
                headers:{
                    Authorization: "Bearer "+ getState().auth.user.token,
                    "Content-Type":"multipart/form-data"
                }
            })
            toast.success("New post image updated successfully")
        } catch (error) {
            toast.error(error.response.data.message )
        }
    }
}
export function updatePost(newPost,postId){
    return async(dispatch,getState)=>{
        try {
            const {data}=await request.put(`/api/posts/${postId}`,newPost,{
                headers:{
                    Authorization: "Bearer "+ getState().auth.user.token,
                }
            })
            dispatch(postActions.setPost(data));
        } catch (error) {
            toast.error(error.response.data.message )
        }
    }
}
export function deletePost(postId){
    return async(dispatch,getState)=>{
        try {
            const {data}=await request.delete(`/api/posts/${postId}`,{
                headers:{
                    Authorization: "Bearer "+ getState().auth.user.token,
                }
            })
            dispatch(postActions.deletePost(data.postId));
            toast.success(data.message);
        } catch (error) {
            toast.error(error.response.data.message )
        }
    }
}
export function fetchAllPosts(){
    return async(dispatch)=>{
        try {
            const {data}= await request.get(`/api/posts`)
            dispatch(postActions.setPosts(data));
        } catch (error) {
            toast.error(error.response.data.message )
        }
    }
}