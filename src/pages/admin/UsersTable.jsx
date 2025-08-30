import "./admin-table.css"
import AdminSidebar from "./AdminSidebar"
import { Link, useNavigate } from "react-router-dom"
import swal from "sweetalert"
import { useDispatch,useSelector } from "react-redux"
import { useEffect } from "react";
import { deleteProfile, getAllUsersProfile } from "../../redux/apiCalls/profileApiCall";
import { logoutUser } from "../../redux/apiCalls/authApiCall"

const UsersTable = () => {
    const dispatch=useDispatch();
    const {profiles , isProfileDeleted}=useSelector(state=>state.profile)
    const {user} =useSelector(state=>state.auth)
    const navigate=useNavigate()
    useEffect(()=>{
      dispatch(getAllUsersProfile())
    },[dispatch])
    useEffect(()=>{
        if(isProfileDeleted&&!user){
            navigate("/")
        }
    },[isProfileDeleted,dispatch,navigate,user])
    const deleteUserHandler = (userId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this user!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        if(userId===user._id){
            dispatch(deleteProfile(user?._id))
            dispatch(logoutUser())
        }
        else{
            dispatch(deleteProfile(userId)) 
        }
      }
    });
  };
  return (
    <div className="table-container">
        <AdminSidebar/>
        <div className="table-wrapper">
            <h1 className="table-title">Users</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Count</th>
                        <th>User</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {profiles.map((item,index) => (
                        <tr key={item._id}>
                            <td>{index+1}</td>
                            <td>
                                <div className="table-image">
                                    <img 
                                        src={item.profilePhoto.url}
                                        alt=""
                                        className="table-user-image"
                                    />
                                    <span className="table-username">{item.username}</span>
                                </div>
                            </td>
                            <td>{item.email}</td>
                            <td>
                                <div className="table-button-group">
                                    <button>
                                        <Link to={`/profile/${item._id}`}>
                                            View Profile
                                        </Link>
                                    </button>
                                    <button onClick={()=>deleteUserHandler(item._id)}>Delete User</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default UsersTable