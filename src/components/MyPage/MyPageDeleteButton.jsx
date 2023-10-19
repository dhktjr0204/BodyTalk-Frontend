import axios from 'axios';
import React from 'react';
import styled from 'styled-components';
import { remove } from 'react-cookies';
import { useNavigate } from 'react-router-dom';
import oc from 'open-color';

const DeleteButton = styled.button`
    border: none;
    color: red;
    text-align: center;
    display: inline-block;
    font-family: 'NanumGothic', sans-serif;
    font-size: 16px;
    border-radius: 8px;
    cursor: pointer;
    float: right;

    &:hover::after {
        content: '삭제하기';
        position: absolute;
        top: -25px;
        right: 0;
        padding: 4px 8px;
        background: linear-gradient(to right, ${oc.teal[6]}, ${oc.cyan[5]});
        color: #fff;
        border-radius: 4px;
        font-size: 12px;
        opacity: 1;
        z-index: 2;
      }
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
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
            })
            .then((res) => {
                console.log(res);
                alert("삭제가 완료되었습니다.");
                onHistoryDeleteComplete();
            })
            .catch((err) => {
                console.log("마이페이지 delete 에러", err);
            });
    }

    return(
        <DeleteButton onClick={handleDelete}>X</DeleteButton>
    )
}
export default MyPageDeleteButton;