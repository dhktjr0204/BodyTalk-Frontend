import React from 'react';
import { FaPen  } from 'react-icons/fa';
import styled from 'styled-components';
import moment from "moment";
import oc from 'open-color';
import { useNavigate } from 'react-router-dom';
import DiaryDeleteButton from './DiaryDeleteButton';
import TagColorButton from './TagColorButton';

//다이어리 모음 감싸주는거
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
//다이어리 컨텐츠 감싸주는거
const DiaryWrapper = styled.div`
    margin-bottom: 10px;
    padding: 0 8px;
    margin-right: 4px;
    border-radius: 8px;
    border: 2px solid gray;
    justify-content: space-between;
    position: relative;

    &:hover::after {
    content: '수정하기';
    position: absolute;
    top: -25px;
    right: 0;
    padding: 4px 8px;
    background: linear-gradient(to right, ${oc.teal[6]}, ${oc.cyan[5]});
    color: #fff;
    border-radius: 4px;
    font-size: 12px;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }

  &:hover::after {
    opacity: 1;
  }
`;
//다이어리 내용 폰트
const DiaryContentText = styled.div`
  font-family: 'NanumGothic';
  font-weight:700;
  font-size: 25px;
  color: #495057;
  margin-bottom: 10px;
`;
//글쓰기 버튼
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
  position: relative;
  margin-left: auto;

  &::before {
    content: '글쓰기';
    position: absolute;
    top: -75%;
    left: 40%;
    transform: translateX(-50%);
    background-color: #000;
    color: #fff;
    padding: 4px 8px;
    font-size: 14px;
    border-radius: 4px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease-in-out;
    white-space: nowrap;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const DiaryBoard = ({ date, diarys }) =>{
  const filteredDiarys = diarys.filter(diary => diary.date === moment(date).format("YYYY-MM-DD"));

  const navigate= useNavigate();

  const handleDiaryClick = (id) => {
    navigate(`/diary/${id}`);
  }

  return (
    <>
      <div style={{display: 'flex', alignItems: 'center', marginBottom: '16px', backgroundColor: 'white'}}>
        <h2>{moment(date).format('YYYY년 M월 D일')} 일기 목록</h2>
        <CreateButton onClick={() => navigate('/new-diary',{ state: { date } })}>
          <FaPen size={24} />
        </CreateButton>
      </div>
    
      <div>
        {filteredDiarys.map((diary) => (
        //클릭한 날짜와 일치하는 일기만 보여준다. 클릭하면 /diary/{id}로 이동
        <DiaryWrapper key={diary.id} onClick={() => handleDiaryClick(diary.id)}>
              <DiaryDeleteButton id={diary.id}></DiaryDeleteButton>
              <br></br>

              <div style={{margin: '16px 0'}}>
                  <TagColorButton tags={diary.tag}></TagColorButton>
              </div>

              <DiaryContentText>{diary.content} </DiaryContentText> 
        </DiaryWrapper>
        ))}
      </div>
    </>
  );
 }
export default DiaryBoard;