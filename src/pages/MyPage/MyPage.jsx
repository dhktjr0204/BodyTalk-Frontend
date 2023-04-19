import axios from 'axios';
import DeleteAccountButton from 'components/MyPage/DeleteAccountButton';
import LogoutButton from 'components/MyPage/LogoutButton';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { remove } from 'react-cookies';
import DefaultMenu from 'components/MenuBar/DefaultMenu';

const MypageWrapper = styled.div`
  width: 60%;
  margin: auto;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  margin-bottom: 24px;
`;

const UserWrapper = styled.div`
    width: 60%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const MyPage = ({ isLoggedIn, setIsLoggedIn }) => {
    const [userInfo, setUserInfo]= useState([]);
    const navigate= useNavigate();

    const handleUpdateClick = () => {
      navigate(`/mypage/update`,{ state: { userInfo } });
    }

    const handleHistoryClick = () => {
        navigate(`/mypage/history`);
      }

    useEffect(() => {
        axios({
            method: "GET",
            url: `/api/mypage`,
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("accessToken")
            }
        })
        .then((res) => {
            console.log(res.data);
            setUserInfo(res.data);
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            alert("로그인이 만료되어 로그아웃합니다.");
            sessionStorage.removeItem("accessToken");
            remove('access_Token');//쿠키삭제
            navigate("/");
        } else {
            alert("불러오기에 실패하였습니다.");
        }
        });
    }, []);

    return (
    <div>
      <br></br><br></br><br></br>
      <DefaultMenu></DefaultMenu>
      <MypageWrapper>
        <h1>사용자 정보
            <button onClick={handleUpdateClick}>수정</button>
        </h1>
        <p>닉네임: {userInfo.name}</p>
        <p>이메일: {userInfo.email}</p>
        <p>닉네임: {userInfo.sex}</p>
        <p>나이: {userInfo.age}</p>
      </MypageWrapper>

      <MypageWrapper onClick={handleHistoryClick}>
        <h1>최근 진료기록 보기</h1>
      </MypageWrapper>
      <UserWrapper>
        <DeleteAccountButton isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></DeleteAccountButton>
        <LogoutButton isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></LogoutButton>
      </UserWrapper>
    </div>
    );
  }
  
  export default MyPage;