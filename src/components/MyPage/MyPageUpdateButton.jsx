import axios from 'axios';
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { remove } from 'react-cookies';

const UpdateButton = styled.button`
  background-color: #86A8E7;
  border: none;
  color: white;
  padding: 12px 24px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 16px;
`;

const MyPageUpdateButton = ({userInfo}) =>{
    const navigate= useNavigate();

    const onUserInfoUpdateComplete = () => {
        navigate(`/mypage`);
      };

    const handleUpdate = () =>{
        if (userInfo.name.length === 0) alert("닉네임을 정해주세요");
        else if (userInfo.sex.length === 0) alert("성별을 선택해주세요");
        else if (userInfo.age.length === 0 || isNaN(userInfo.age)) alert("나이를 숫자로 입력해주세요");
        else {
            const data = {
                name: userInfo.name,
                sex: userInfo.sex,
                age: userInfo.age
              };
            axios
                .post(`/api/mypage/update`, data, {
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
                },
                })
                .then((res) => {
                    console.log(res);
                    alert("수정이 완료되었습니다.");
                    onUserInfoUpdateComplete();
                })
                .catch((err) => {
                    if (err.response && err.response.status === 401) {
                        alert("로그인이 만료되어 로그아웃합니다.");
                        sessionStorage.removeItem("accessToken");
                        remove('JSESSIONID');//쿠키삭제
                        navigate("/");
                    } else {
                        alert("불러오기에 실패하였습니다.");
                    }
                    console.log("마이페이지 update 에러", err);
                });
        }
    };

    return(
        <UpdateButton onClick={handleUpdate}>확인</UpdateButton>
    )
}
export default MyPageUpdateButton;