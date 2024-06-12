import React from 'react'
import { Outlet, Navigate } from "react-router-dom";

const Validations = () => {
    // localStorage.setItem("LoginData","Hello")
    const authority = localStorage.getItem("login");
    console.log(authority);
    return authority ? <Outlet /> : <Navigate to='/' />
}

export default Validations