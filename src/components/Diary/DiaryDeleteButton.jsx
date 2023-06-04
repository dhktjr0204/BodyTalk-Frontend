import axios from 'axios';
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { remove } from 'react-cookies';

const DeleteButton = styled.button`
  background-color: #FFFFFF;
  border: none;
  color: red;
  padding: 0;
  margin-top: 8px;
  text-align: right;
  display: inline-block;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  float: right;
`;


const DiaryDeleteButton = ({id}) =>{
  const navigate= useNavigate();
  
  //삭제가 완료되면 새로고침한다
  const onDiaryDeleteComplete = () => {
    window.location.reload()
    };


  const handleDelete = (e) =>{
    e.stopPropagation(); // 이벤트 버블링 막기
    axios
      .delete(`/api/diary/${id}`, {
      headers: {
          Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      },
      })
      .then((res) => {
        console.log(res);
        alert("삭제가 완료 되었습니다.");
        onDiaryDeleteComplete();
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
      });
   }


return(
  <DeleteButton onClick={handleDelete}>X</DeleteButton>
  )
}

export default DiaryDeleteButton;