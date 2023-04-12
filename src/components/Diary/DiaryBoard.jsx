import React, { useState } from 'react';
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

const DiaryBoard = ({ date, diarys }) =>{
  const filteredDiarys = diarys.filter(diary => diary.date === moment(date).format("YYYY-MM-DD"));
  const navigate= useNavigate();

  const handleDiaryClick = (id) => {
    navigate(`/diary/${id}`);
  }
  
  return (
    <DiaryListContainer>
      <h2>{moment(date).format('YYYY년 M월 D일')} 일기 목록</h2>
      <div>
        {filteredDiarys.map((diary) => (
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