import React from 'react'
import { Outlet, Navigate } from "react-router-dom";

const LoginValid = () => {
    // localStorage.setItem("LoginData","Hello")
    const authority = localStorage.getItem("login");
    console.log(authority);
    return authority ? <Navigate to='/main'/> : <Outlet/> 
}

export default LoginValid