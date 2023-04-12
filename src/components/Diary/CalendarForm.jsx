import React from 'react';
import Calendar from 'react-calendar';
import moment from "moment";
import Dot from './Dot';
import styled from 'styled-components';

const CalendarPosition= styled.div`
    width: 70%;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

//캘린더 더 이쁘게 해주세요 고대로 냅둬도 되고...
const CalenderForm = ({ onChange, date, mark }) =>{
    return (
        <div>
            <Calendar 
                onChange={onChange}
                value={date}
                formatDay={(locale, date) => moment(date).format("DD")} // 날'일' 제외하고 숫자만 보이도록 설정
                showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정   
                tileContent={({ date, view }) => {//글 쓴 날짜에 동그라미 표시
                    if (mark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
                      return (
                       <>
                         <Dot></Dot>
                       </>
                     );
                    }
                  }}
            />
         </div>
);
    
}
export default CalenderForm;