import axios from 'axios';
import DeleteAccountButton from 'components/MyPage/DeleteAccountButton';
import LogoutButton from 'components/MyPage/LogoutButton';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { remove } from 'react-cookies';
import oc from 'open-color';
import DefaultMenu from 'components/MenuBar/DefaultMenu';

const MypageWrapper = styled.div`
  font-size: 30px;
  font-weight: bold;
  width: 75%;
  margin: auto;
  cursor: pointer;
  font-family: 'NanumGothic', sans-serif;
  margin-bottom: 24px;
  border-left: 4px solid;
  border-image: linear-gradient(to bottom, ${oc.teal[6]}, ${oc.cyan[5]});
  border-image-slice: 1;
  padding: 10px 24px;
`;

const IText = styled.div`
    font-size: 16px;
    padding: 5px;
    font-family: 'NanumGothic', sans-serif;
    font-weight: lighter;
`;

const UserWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Text = styled.div`
    font-size: 30px;
    color: transparent;
    letter-spacing: 1px;
    font-family: 'NanumGothic', sans-serif;
    width: 80%;
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 20px;
    font-weight: bold;
    background: linear-gradient(to right, ${oc.teal[6]}, ${oc.cyan[5]});
    -webkit-background-clip: text; /* Safari */
    -webkit-text-fill-color: transparent; /* Safari */
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0px;
`;

const Button = styled.button`
  padding: 8px 50px;
  color: #FFFFFF;
  border: none;
  border-radius: 10px;
  font-size: 20px;
  cursor: pointer;
  margin-top: 0px;
  background: linear-gradient(to right, ${oc.teal[6]}, ${oc.cyan[5]});
  align: center;

  &:hover {
    /* 클릭시 아래로 미세하게 움직임 */
    transform: translateY(3px);
  }
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
      <Text>마이페이지</Text>
      <MypageWrapper>
        내정보
        <IText><br></br>닉네임: {userInfo.name}</IText>
        <IText>이메일: {userInfo.email}</IText>
        <IText>성별: {userInfo.sex === "female" ? "여자" : userInfo.sex === "male" ? "남자" : ""}</IText>
        <IText>나이: {userInfo.age}</IText>
      </MypageWrapper>
      <Wrapper><Button onClick={handleUpdateClick}>내정보 수정</Button></Wrapper>
      <br></br><br></br><br></br>
      <MypageWrapper onClick={handleHistoryClick}>
        최근 진료기록 보기
      </MypageWrapper>
      <UserWrapper>
        <DeleteAccountButton isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></DeleteAccountButton>
        <LogoutButton isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></LogoutButton>
      </UserWrapper>
    </div>
    );
  }
  
  export default MyPage;