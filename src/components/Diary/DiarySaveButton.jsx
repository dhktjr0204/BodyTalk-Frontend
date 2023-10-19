import axios from 'axios';
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { remove } from 'react-cookies';
import oc from 'open-color';


const SaveButton = styled.button`
    display: flex;
    justify-content: center;
    padding: 8px 50px;
    color: #FFFFFF;
    border: none;
    border-radius: 10px;
    font-size: 20px;
    margin-top: 16px;
    background: linear-gradient(to right, ${oc.teal[6]}, ${oc.cyan[5]});

    &:hover {
    /* 클릭시 아래로 미세하게 움직임 */
    transform: translateY(3px);
    }
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
                    Authorization: "Bearer " + localStorage.getItem("accessToken"),
                },
                })
                .then((res) => {
                    onDiaryPostComplete();
                })
                .catch((err) => {});
            }
        else {
            axios
                .post(`/api/diary/${diary.id}`, data, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("accessToken"),
                },
                })
                .then((res) => {
                    onDiaryPostComplete();
                })
                .catch((err) => {});
        }
    };

    return(
        <SaveButton onClick={handleSave}>일기 저장</SaveButton>
    )
}
export default DiarySaveButton;