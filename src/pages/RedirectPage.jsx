import React from "react";
import { Navigate } from 'react-router-dom';

const RedirectPage = () => {
    const currentUrl = new URLSearchParams(window.location.search);
    const token = currentUrl.get("token");
    const isNew = currentUrl.get("isNew");


    if (token && isNew){
        sessionStorage.setItem('accessToken', token);
        alert('로그인하였습니다');
        return <Navigate to="/"></Navigate>;
    }else{
        alert("로그인이 성공적으로 이루어지지 않았습니다.")
        return <Navigate to="/"></Navigate>;
    }

}

export default RedirectPage; 