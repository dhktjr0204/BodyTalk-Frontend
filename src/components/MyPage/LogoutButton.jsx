import React from 'react';
import styled from 'styled-components';
import { remove } from 'react-cookies';
import { useNavigate } from "react-router-dom";

const Button = styled.div`
    padding: 8px 50px;
    color: #FFFFFF;
    border: none;
    border-radius: 10px;
    font-size: 20px;
    cursor: pointer;
    margin: 10px;
    background: gray;
    align: center;
    flaot: left;

    &:hover {
    /* 클릭시 아래로 미세하게 움직임 */
    transform: translateY(3px);
    }
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