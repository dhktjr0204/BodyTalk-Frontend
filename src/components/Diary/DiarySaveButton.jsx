import axios from 'axios';
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { remove } from 'react-cookies';


const SaveButton = styled.button`
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

const DiarySaveButton = ({diary}) =>{
    const navigate= useNavigate();

    const onDiaryPostComplete = () => {
        navigate(`/diary`);
      };
    //클릭하면 실행되는 함수
    //백엔드에 업데이트 요청하는 post를 보낸다.
    //정상적으로 저장되면 /diary화면으로 이동
    const handleSave = () =>{
        const data = {
            content: diary.content,
            tags: diary.tag.join(","),
            date: diary.date
        };

        if (diary.content.length === 0) alert("내용을 입력해주세요");
        else if (diary.tag.length === 0) alert("태그를 1개 이상 선택해주세요");
        else if(!diary.id) {
            axios
                .post(`/api/diary`, data, {
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
                },
                })
                .then((res) => {
                    onDiaryPostComplete();
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
                    console.log("다이어리 save 에러", err);
                });
            }
        else {
            axios
                .post(`/api/diary/${diary.id}`, data, {
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
                },
                })
                .then((res) => {
                    onDiaryPostComplete();
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
                    console.log("다이어리 post 에러", err);
                });
        }
    };

    return(
        <SaveButton onClick={handleSave}>확인</SaveButton>
    )
}
export default DiarySaveButton;