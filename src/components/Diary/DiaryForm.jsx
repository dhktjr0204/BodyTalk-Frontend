import React, { useState } from 'react';
import styled from 'styled-components';
import moment from "moment";
import DiarySaveButton from './DiarySaveButton';
import Calendar from 'react-calendar';
import TagHeader from './TagHeader';

const DiaryWrapper = styled.div`
  width: 60%;
  margin: auto;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
`;

const DateButton = styled.button`
  margin-bottom: 16px;
  padding: 12px;
  border: 2px solid black;
  background-color: transparent;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const DiaryInfo = styled.textarea`
  font-size: 18px;
  margin-bottom: 16px;
  border: 1px solid gray;
  padding: 24px;
  display: flex;
  align-items: flex-start;
  width: 100%;
  height: 200px;
  white-space: pre-wrap;
  overflow-wrap: break-word;
`;


const DiaryForm = ({diary}) =>{
    const [diaryInfo, setDiaryInfo] = useState(diary);
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(diary.date);

    //글 수정
    const handleContentChange = (value) => {
        setDiaryInfo((prev) => ({...prev,content: value,}));
    };
    
    //날짜 클릭하면 캘린더 나오게 하는 거
    const handleCalendarClick = () => {
    setShowCalendar(!showCalendar);
    };
    
    //달력에 날짜 클릭할때마다 date바꿔줌
    const handleDateChange = (date) => {
        setDiaryInfo({ ...diaryInfo, date: moment(date).format("YYYY-MM-DD")})
        setSelectedDate(date);
        setShowCalendar(false);
    };
    
    return(
    <DiaryWrapper>
        <TagHeader diary={diaryInfo} setDiary={setDiaryInfo}></TagHeader>
        <DateButton onClick={handleCalendarClick}>{moment(selectedDate).format("YYYY-MM-DD")}</DateButton>
        {showCalendar && (
            <Calendar
            value={selectedDate}
            onChange={handleDateChange}
            formatDay={(locale, date) => moment(date).format("DD")}
            onClickDay={handleDateChange}
            showNeighboringMonth={false} 
          />
        )}
        <DiaryInfo  
            type="text" 
            value={diaryInfo.content} 
            onChange={(e) => handleContentChange(e.target.value)} >
        </DiaryInfo>
        <DiarySaveButton diary={diaryInfo} ></DiarySaveButton>
    </DiaryWrapper>
    );
    
 }
export default DiaryForm;