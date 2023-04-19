import axios from 'axios';
import React from 'react';
import styled from 'styled-components';
import { remove } from 'react-cookies';
import { useNavigate } from 'react-router-dom';

const DeleteButton = styled.button`
    background-color: #C4282B;
    border: none;
    color: white;
    padding: 12px 24px;
    text-align: center;
    display: inline-block;
    font-size: 16px;
    border-radius: 8px;
    cursor: pointer;
    margin-top: 16px;
`;

const MyPageDeleteButton = ({id}) =>{
    const navigate= useNavigate();
    
    //최근 진료 기록 삭제완료하면 새로고침
    const onHistoryDeleteComplete = () => {
        window.location.reload()
        };

    const handleDelete = (e) =>{
        e.stopPropagation(); // 이벤트 버블링 막기
        axios
            .delete(`/api/mypage/${id}`, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
            },
            })
            .then((res) => {
                console.log(res);
                alert("삭제가 완료되었습니다.");
                onHistoryDeleteComplete();
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
                console.log("마이페이지 delete 에러", err);
            });
    }

    return(
        <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
    )
}
export default MyPageDeleteButton;