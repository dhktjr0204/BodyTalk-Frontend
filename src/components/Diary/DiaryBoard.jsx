import React from 'react';
import { FaPen  } from 'react-icons/fa';
import styled from 'styled-components';
import moment from "moment";
import { useNavigate } from 'react-router-dom';
import DiaryDeleteButton from './DiaryDeleteButton';
import TagColorButton from './TagColorButton';

const DiaryBoardWrapper = styled.div`
    margin: 0 auto;
    width: 30%; 
    height: 100%;
    background-color: #f5f5f5;
    padding: 10px 10px;
    overflow-y: scroll;
    border-radius: 16px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
`;

const DiaryWrapper = styled.div`
    margin-bottom: 10px;
    background-color: #EEEEEE;
    padding: 8px 8px;
    margin-right: 4px;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
`;

const DiaryContentText = styled.div`
  font-family: 'monospace';
  font-weight:700;
  font-size: 30px;
  color: #8C8C8C;
`;

const TagWrapper = styled.div`
  background-color: #D6A4A4;
  display: inline-block;
  padding: 10px 20px;
  margin-right: 4px;
  border-radius: 8px;
  font-size: 16px;
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
    <DiaryBoardWrapper>
      <div style={{display: 'flex', alignItems: 'center', marginBottom: '16px'}}>
        <h2>{moment(date).format('YYYY년 M월 D일')} 일기 목록</h2>
        <CreateButton onClick={() => navigate('/new-diary',{ state: { date } })}>
          <FaPen size={24} />
        </CreateButton>
        <span>글쓰기</span>
      </div>
    
      <div>
        {filteredDiarys.map((diary) => (
        //클릭한 날짜와 일치하는 일기만 보여준다. 클릭하면 /diary/{id}로 이동
        <DiaryWrapper key={diary.id} onClick={() => handleDiaryClick(diary.id)}>
            <DiaryDeleteButton id={diary.id}></DiaryDeleteButton>

             <DiaryContentText>{diary.content} </DiaryContentText> 

            <div style={{margin: '16px 0'}}>
                <TagColorButton tags={diary.tag}></TagColorButton>
            </div>

        </DiaryWrapper>
        ))}
      </div>

    </DiaryBoardWrapper>
  );
 }
export default DiaryBoard;