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
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      })
      .then((res) => {
        console.log(res);
        alert("삭제가 완료 되었습니다.");
        onDiaryDeleteComplete();
      })
      .catch((err) => {});
   }


return(
  <DeleteButton onClick={handleDelete}>X</DeleteButton>
  )
}

export default DiaryDeleteButton;