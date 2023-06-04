import React, { useState } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import moment from "moment";
import DiarySaveButton from './DiarySaveButton';
import Calendar from 'react-calendar';
import TagHeader from './TagHeader';

const CenterWrapper = styled.div`
  width: 75%;
  margin: auto;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 24px;
  padding-top: 1px;
  border-radius: 16px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
`;

const ButtonWrapper = styled.div`
width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

const Text = styled.textarea`
  font-size: 25px;
  margin: 0 20px 16px;
  border: 1px solid ${oc.teal[6]};
  padding: 24px;
  display: flex;
  align-items: flex-start;
  width: 96.5%;
  height: 200px;
  white-space: pre-wrap;
  border-radius: 3px;
  overflow-wrap: break-word;

  &:focus {
    border-color: ${oc.teal[6]};
    box-shadow: 0 0 5px ${oc.teal[6]};
    outline: none;
  }
`;

const MText = styled.div`
    font-size: 30px;
    color: transparent;
    letter-spacing: 1px;
    font-family: 'NanumGothic';
    width: 80%;
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 20px;
    font-weight: bold;
    background: linear-gradient(to right, ${oc.teal[6]}, ${oc.cyan[5]});
    -webkit-background-clip: text; /* Safari */
    -webkit-text-fill-color: transparent; /* Safari */
`;

const TText = styled.div`
  font-family: 'NanumGothic';
  font-size: 35px;
  margin-top: 16px;
  margin-bottom: 16px;
  text-align: center;
  font-weight: bold;
  span {
    margin: 0 8px;
  }
`;

const CalendarWrapper = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  float: right;
  padding: 8px 10px;
  color: #FFFFFF;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  cursor: pointer;
  margin-top: 1px;
  margin-right: 20px;
  background: linear-gradient(to right, ${oc.teal[6]}, ${oc.cyan[5]});
  align: center;

  &:hover {
    /* 클릭시 아래로 미세하게 움직임 */
    transform: translateY(1px);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
}
`;

const getDayOfWeek = (dayOfWeek) => {
  const daysOfWeekMap = {
    Mon: "월요일",
    Tue: "화요일",
    Wed: "수요일",
    Thu: "목요일",
    Fri: "금요일",
    Sat: "토요일",
    Sun: "일요일"
  };

  return daysOfWeekMap[dayOfWeek];
};



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
        diary.date=date;
    };
    
    return(
      <>
      <MText>증상 일기 쓰기</MText>
      <CenterWrapper>
        <TText>
          <span>{moment(diary.date).format('YYYY년')}</span>
          <span>{moment(diary.date).format('M월')}</span>
          <span>{moment(diary.date).format('D일')}</span>
          <span>{getDayOfWeek(moment(diary.date).format('ddd'))}</span>
          <Button onClick={handleCalendarClick}>날짜 변경</Button>
          <CalendarWrapper>
            {showCalendar && (
              <Calendar
                value={selectedDate}
                onChange={handleDateChange}
                formatDay={(locale, date) => moment(date).format("DD")}
                onClickDay={handleDateChange}
                showNeighboringMonth={false} 
              />
            )}
          </CalendarWrapper>
          
        </TText>
        
        <TagHeader diary={diaryInfo} setDiary={setDiaryInfo}></TagHeader>

        <Text  
          type="text" 
          value={diaryInfo.content} 
          onChange={(e) => handleContentChange(e.target.value)} >
        </Text>
        <ButtonWrapper><DiarySaveButton diary={diaryInfo} ></DiarySaveButton></ButtonWrapper>
      </CenterWrapper>
    </>
  );  
 }

export default DiaryForm;