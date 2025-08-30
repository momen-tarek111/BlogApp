import "./form.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getResetPassword,
  resetPassword,
} from "../../redux/apiCalls/passwordApiCall";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isError } = useSelector((state) => state.password);
  const { userId, token } = useParams();
  const navigate =useNavigate()
  useEffect(() => {
    dispatch(getResetPassword(userId, token));
  }, [dispatch, userId, token]);
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (password.trim() === "") return toast.error("Password is required");
    dispatch(resetPassword(password, { userId, token }));
    setTimeout(()=>{navigate("/login")},2000)
  };
  return (
    <section className="form-container">
      {isError ? (
        <>
          <h1>Not Found</h1>
        </>
      ) : (
        <>
          <h1 className="form-title">Reset Password</h1>
          <form onSubmit={formSubmitHandler} className="form">
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-input"
                id="password"
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="form-btn" type="submit">
              Submit
            </button>
          </form>
        </>
      )}
    </section>
  );
};

export default ResetPassword;
