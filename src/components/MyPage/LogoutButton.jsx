import React from 'react';
import styled from 'styled-components';
import { remove } from 'react-cookies';
import { useNavigate } from "react-router-dom";

const Button = styled.div`
  width: 60%;
  cursor: pointer;
  margin: auto;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  margin-bottom: 24px;
`;


const LogoutButton = ({ isLoggedIn, setIsLoggedIn }) =>{
    const navigate= useNavigate();

    const onLogoutComplete = () => {
        alert("로그아웃 완료");
        remove('JSESSIONID');//쿠키삭제
        sessionStorage.clear();
        setIsLoggedIn(false);
        navigate(`/`);
    };

    return(
        <Button onClick={onLogoutComplete}>로그아웃</Button>
    )
}
export default LogoutButton;