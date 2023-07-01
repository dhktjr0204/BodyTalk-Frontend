import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const HospitalBoardWrapper = styled.div`
    margin: 0 auto;
    width: 40%; 
    height: 100%;
    background-color: #f5f5f5;
    padding: 10px 10px;
    overflow-y: scroll;
    border-radius: 16px;
    border-left: 4px solid;
    border-image: linear-gradient(to bottom, ${oc.teal[6]}, ${oc.cyan[5]});
    border-image-slice: 1;
    text-align: center;
`;

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
    &.selected {
      background-color: #b5b5b5;
    }
`;

const HospitalDisplay = ({hospitals, clickHospital, setClickHospital}) =>{
    //스크롤 하는 div에 대한 ref
    const scrollRef = useRef(null);

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

    //병원 정보 클릭하면 해당 병원이 맵 가운데로 오게끔 설정(클릭한 병원 정보 저장)
    const handleHospitalClick = (hospital) =>{
      setClickHospital(hospital);
    };

    //맵에서 병원 선택했을때 스크롤 이동하는 코드
    useEffect(() => {
      if (clickHospital && scrollRef.current) {
        const selectedDiv = scrollRef.current.querySelector(`div[data-key="${clickHospital.id}"]`);
        if (selectedDiv) {
          selectedDiv.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
          selectedDiv.classList.add('selected');
          return () => {
            selectedDiv.classList.remove('selected');
          };
        }
      }
    }, [clickHospital]);

    return (
        <HospitalBoardWrapper ref={scrollRef}>
          <h2>병원 목록</h2>
            {hospitals.map((hospital, index) => (
                <HospitalWrapper key={hospital.id}
                  data-key={hospital.id}
                  onClick={() => handleHospitalClick(hospital)}>
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