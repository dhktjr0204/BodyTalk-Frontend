import React from 'react';
import styled from 'styled-components';
import { remove } from 'react-cookies';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

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
        const data={
            accessToken: localStorage.getItem("accessToken"),
            refreshToken: localStorage.getItem("refreshToken"),
        };
        console.log(data)
        axios
        .post(`/api/logout`,data,{
            headers:{
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
        }).then((res) => {
            console.log(res);
            alert("로그아웃 완료");
            remove('JSESSIONID');//쿠키삭제
            localStorage.clear();
            setIsLoggedIn(false);
            navigate(`/`);
        }).catch((err) => {
            console.log("로그아웃 에러",err);
        });
    };

    return(
        <Button onClick={onLogoutComplete}>로그아웃</Button>
    )
}
export default LogoutButton;