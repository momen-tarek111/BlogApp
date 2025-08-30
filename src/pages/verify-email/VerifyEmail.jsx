import React, { useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom';
import {useDispatch,useSelector} from "react-redux"
import "./verify-email.css"
import { verifyEmail } from '../../redux/apiCalls/authApiCall';
const VerifyEmail = () => {
    const dispatch=useDispatch()
    const {userId,token}=useParams()
    const {isEmailVerified}=useSelector(state=>state.auth);
    const calledRef=useRef(false)
    useEffect(()=>{
        if(calledRef.current) return;
        dispatch(verifyEmail(userId,token))
        calledRef.current=true
    },[dispatch,userId,token])
  return (
    <section className="verify-email">
        {isEmailVerified ? 
        <>
            <i className="bi bi-patch-check verify-email-icon"></i> 
            <h1 className="verify-email-title">
                Your email address has been successfully verified
            </h1>
            <Link to="/login" className='verify-email-link'>
                Go To Login Page
            </Link>
        </>
        :<>
            <h1 className='verify-email-not-found'>
                Not Found
            </h1>
        </>}
    </section>
  )
}

export default VerifyEmail