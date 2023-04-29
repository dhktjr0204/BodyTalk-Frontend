import React from 'react';
import styled from 'styled-components';

//다이어리 모음 감싸주는거
const HospitalBoardWrapper = styled.div`
    margin: 0 auto;
    width: 40%; 
    height: 100%;
    background-color: #f5f5f5;
    padding: 10px 10px;
    overflow-y: scroll;
    border-radius: 16px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);

`;
//다이어리 컨텐츠 감싸주는거
const HospitalWrapper = styled.div`
    margin-bottom: 10px;
    background-color: #EEEEEE;
    padding: 8px 8px;
    margin-right: 4px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
    &:active {
        /* 클릭시 아래로 미세하게 움직임 */
        transform: translateY(3px);
    }
`;

const HospitalDisplay = ({hospitals}) =>{
    const daysOfWeek = ["월", "화", "수", "목", "금", "토"];


    const getDisplayTime = (hospital) => {
        const openTimes = [hospital.dutyTime1s,hospital.dutyTime2s,hospital.dutyTime3s,hospital.dutyTime4s,hospital.dutyTime5s,hospital.dutyTime6s,hospital.dutyTime7s];
        const closeTimes = [hospital.dutyTime1c,hospital.dutyTime2c,hospital.dutyTime3c,hospital.dutyTime4c,hospital.dutyTime5c,hospital.dutyTime6c,hospital.dutyTime7c];
    
        const displayTime = [];
    
        for (let i = 0; i < 6; i++) {
          if (openTimes[i] === "" && closeTimes[i] === "") {
            displayTime.push(`${daysOfWeek[i]}: 휴무`);
          } else {
            const openHour = Math.floor(parseInt(openTimes[i]) / 100);
            const openMinute =parseInt(openTimes[i]) % 100;
            const closeHour = Math.floor(parseInt(closeTimes[i]) / 100);
            const closeMinute =parseInt(closeTimes[i]) % 100;
            displayTime.push(`${daysOfWeek[i]}: ${openHour}:${openMinute === 0 ? '00' : openMinute}~${closeHour}:${closeMinute === 0 ? '00' : closeMinute}`);
          }
        }
        return displayTime;
      };

    return (
        <HospitalBoardWrapper>
            {hospitals.map((hospital, index) => (
                <HospitalWrapper key={index}>
                    <h3>{hospital.dutyName}</h3>
                    <p>주소: {hospital.dutyAddr}</p>
                    <p>전화번호: {hospital.dutyTel1}</p>
                    <div>{getDisplayTime(hospital).map((time, index) => (<div key={index}>{time}</div>))}</div>  
                </HospitalWrapper>
        ))}
        </HospitalBoardWrapper>
    );
}
export default HospitalDisplay;