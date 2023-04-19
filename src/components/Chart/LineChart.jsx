import React, { useEffect, useState } from 'react';
import { Line } from "react-chartjs-2";
import styled from 'styled-components';

const StyledLine = styled(Line)`
  max-height: 400px;
  max-width: 600px;
  margin: 0 auto;
  .chartjs-render-monitor {
    -webkit-transition: height 0.2s ease-in-out;
    -moz-transition: height 0.2s ease-in-out;
    -o-transition: height 0.2s ease-in-out;
    transition: height 0.2s ease-in-out;
    height: 400px !important;
  }
`;

const LineChart = ({top3SymptomInfo,startDate, endDate}) => {
    const [data, setData] = useState({
        labels: [], // x축 날짜
        datasets: [], // 꺾은선 그래프 데이터
      });
//-----------------------------3달을 7등분하는 과정----------------------------------------------
    const dateDiff = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);
    const interval = Math.ceil(dateDiff / 7); // 한 주를 7등분

    const xLabels = []; // x축 라벨을 저장할 배열
    const showXLables=[]
    for (let i = 0; i <= 7; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i * interval);
    xLabels.push(d.toISOString().substring(0, 10));
    if(i!==7){
        showXLables.push(d.toISOString().substring(0, 10));
        }
    }
//-------------------------------------------------------------------------------------------------
    // 꺾은선 그래프 데이터 만들기
    useEffect(() => {
        const datasets = [];
        top3SymptomInfo.forEach((symptom, index) => {
            const dataset = {
                label: symptom.symtomRank,
                data: [],
                fill: false,
                borderColor: ['rgb(54, 162, 235, 0.7)', 'rgb(255, 99, 132, 0.7)','rgb(75, 192, 192, 0.7)'][index],
                borderWidth: 2,
                tension: 0.3
            };

            for (let i=0; i<xLabels.length; i++){
                let cnt=0;
                //해쉬태그를 쓴 날짜들
                symptom.dates.forEach((date)=>{
                    if (i !== xLabels.length-1){
                        if(xLabels[i] <= date && date < xLabels[i+1]){
                            cnt++;
                        }
                    } else {
                        if(date >= xLabels[i]){
                            cnt++;
                        }
                    }
                });

                dataset.data.push(cnt);
            }
            datasets.push(dataset);
        });
        setData({
            labels:showXLables,
            datasets: datasets, // 이전 state 그대로 사용
          });
    }, []);

    const options = {
        plugins: {
            title: {
              display: true,
              text: "최근 3개월 동안의 자주 나타난 증상 통계",
              font: {size: 18,},},
            legend: { position: "bottom",},
        },
    };
    
    return (
            <StyledLine data={data} options={options} height={400} width={600}/>
    );
};

export default LineChart;