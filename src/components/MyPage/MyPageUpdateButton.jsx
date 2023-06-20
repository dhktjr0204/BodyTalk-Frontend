import axios from 'axios';
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { remove } from 'react-cookies';
import oc from 'open-color';

const UpdateButton = styled.button`
    padding: 8px 30px;
    color: #FFFFFF;
    border: none;
    border-radius: 10px;
    font-size: 20px;
    cursor: pointer;
    margin-top: 10px;
    background: linear-gradient(to right, ${oc.teal[6]}, ${oc.cyan[5]});
    align: center;

    &:hover {
    /* 클릭시 아래로 미세하게 움직임 */
    transform: translateY(3px);
    }
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