import React, { useState } from 'react';
import { FaPen  } from 'react-icons/fa';
import styled from 'styled-components';
import moment from "moment";
import { useNavigate } from 'react-router-dom';

const DiaryListContainer = styled.div`
    width: 30%;
    background-color: #f5f5f5;
`;


const DiaryContainer = styled.div`
    background-color: #e9e4f0;
    padding: 4px 8px;
    margin-right: 4px;
    border-radius: 8px;
`;

const DiaryContent = styled.div`
  font-family: 'Roboto Bold';
  font-size: 20px;
`;

const TagWrapper = styled.div`
  display: inline-block;
  background-color: #D6A4A4;
  padding: 1px 8px;
  margin-right: 4px;
  border-radius: 8px;
`;
const CreateButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center; 
  width: 36px;
  height: 36px;
  border-radius: 50%;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
`;

const DiaryBoard = ({ date, diarys }) =>{
  const filteredDiarys = diarys.filter(diary => diary.date === moment(date).format("YYYY-MM-DD"));
  const navigate= useNavigate();

  const handleDiaryClick = (id) => {
    navigate(`/diary/${id}`);
  }

  return (
    <DiaryListContainer>

      <div style={{display: 'flex', alignItems: 'center', marginBottom: '16px'}}>
        <h2>{moment(date).format('YYYY년 M월 D일')} 일기 목록</h2>
        <CreateButton onClick={() => navigate('/new-diary')}>
          <FaPen size={24} />
        </CreateButton>
        <span>글쓰기</span>
      </div>

      <div>
        {filteredDiarys.map((diary) => (
        //클릭한 날짜와 일치하는 일기만 보여준다. 클릭하면 /diary/{id}로 이동
        <DiaryContainer key={diary.id} onClick={() => handleDiaryClick(diary.id)}>
            <DiaryContent>{diary.content} </DiaryContent> 
            <div style={{margin: '16px 0'}}>
                {diary.tag.map((tag , index)=>(
                <TagWrapper key={index}>
                        <p>{tag}</p>
                </TagWrapper>
                ))}
            </div>
        </DiaryContainer>
        ))}
      </div>

    </DiaryListContainer>
  );
 }
export default DiaryBoard;