import Join from "components/Login/Join";
import HeaderContainer from "containers/Header/HeaderContainer";
import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const RedirectPage = ({ isLoggedIn, setIsLoggedIn }) => {
    const navigate= useNavigate();  

    const currentUrl = new URLSearchParams(window.location.search);
    const token = currentUrl.get("token");
    const isNew = currentUrl.get("isNew");

    useEffect(() => {
        if (token && isNew) {
          sessionStorage.setItem('accessToken', token);
          if (isNew === '0') {
            alert('로그인하였습니다');
            setIsLoggedIn(true);
            navigate(`/`);
          }
        } else {
          alert("로그인이 성공적으로 이루어지지 않았습니다.")
          navigate(`/`);
        }
      }, [isNew, navigate, token]);
    
      return (
        <>
          {isNew === "1" ? <Join isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/> : null}
        </>
      );
}

export default RedirectPage; 