import axios from 'axios';
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { remove } from 'react-cookies';

const Button = styled.button`
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

const DiagnosisButton = ({inputText,setIsLoading,setDiagnosis}) =>{
    const navigate= useNavigate();

    const handleSubmit = () => {
        //formdata형식으로 서버에 전달
        const formData=new FormData();
        formData.append("content",inputText);
        console.log("diagnosisbutton에서",inputText);
  
        if (inputText === "") alert("내용을 입력해주세요");
        else{
          setIsLoading(true);
          //만약 비로그인 유저라면
          if (!sessionStorage.getItem("accessToken")) {
              axios
                .post(`/api/medi`, formData, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                })
                .then((res) => {
                  console.log(res.data);
                  setDiagnosis(res.data);
                  setIsLoading(false);
                })
                .catch((err) => {
                  console.log("진단 post 에러", err);
                });
            }
            //로그인 유저라면
            else {
              axios
                .post(`/api/medi`, formData, {
                  headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
                    "Content-Type": "multipart/form-data",
                  },
                })
                .then((res) => {
                  console.log(res.data);
                  setDiagnosis(res.data);
                  setIsLoading(false);
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
        }
    };

    return(
        <Button onClick={handleSubmit}>확인</Button>
    )
}
export default DiagnosisButton;