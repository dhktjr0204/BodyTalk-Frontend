import React from 'react';
import Calendar from 'react-calendar';
import './Calendar.css';
import moment from "moment";
import Dot from './Dot';
import styled from 'styled-components';

const CalendarWrapper= styled.div`
    width: 70%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px; 
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

const CalendarStyle = styled(Calendar)`
  width: 100%;
  height: 120%;
  font-size: 25px;
  border-radius: 10px;
`;

//가운데 정렬
const DotWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

//캘린더 디자인 구려서 바꾸고싶은데 다운받은거라 다 css파일 자체를 바꿔야된다는 문제점이 있음....
//걍 새로 만드는게 더나을수도
const CalenderForm = ({ onChange, date, mark }) =>{
    return (
      <>
        <CalendarStyle 
            onChange={onChange}
            value={date}
            formatDay={(locale, date) => moment(date).format("DD")} // 날'일' 제외하고 숫자만 보이도록 설정
            showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정   
            tileContent={({ date, view }) => {//글 쓴 날짜에 동그라미 표시
                if (mark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
                  return (
                    <DotWrapper>
                      <Dot></Dot>
                    </DotWrapper>
                  );
                }
              }}
        />
      </>
);
    
}
export default CalenderForm;