import { toast } from "react-toastify";
import request from "../../utils/request";
// import { useNavigate } from "react-router-dom";
import { passwordActions } from "../slices/passwordSlice";
export function forgotPassword(email){
    return async()=>{
        try {
            const {data}= await request.post("/api/password/reset-password-link",{email})
            toast.success(data.message)
        } catch (error) {
            toast.error(error.response.data.message )
        }
    }
}

export function getResetPassword(userId,token){
    return async(dispatch)=>{
        try {
            await request.get(`/api/password/reset-password/${userId}/${token}`)
        } catch (error) {
            dispatch(passwordActions.setError())
        }
    }
}

export function resetPassword(newPassword,user){
    return async()=>{
        try {
            // const navigate=useNavigate();
            const {data}=await request.post(`/api/password/reset-password/${user.userId}/${user.token}`,{password:newPassword})
            toast.success(data.message);
            // setTimeout(()=>{navigate("/")},2000)
        } catch (error) {
            toast.error(error.response.data.message )
        }
    }
}