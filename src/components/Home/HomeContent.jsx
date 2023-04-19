import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import styled from 'styled-components';
 //도넛 그래프의 최대 너비 설정
 //너비에 따라 높이 자동 조정 

 const BigHomeGraph = styled.div`
    height: 400px;
    width: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
`;


const HomeContent = ({diagObj}) => {
  if (diagObj.length === 0) {
    return <div>Loading...</div>;
  }

  const data = {
    labels: diagObj.map((obj) => obj.name),
    datasets: [
      {
        data: diagObj.map((obj) => obj.percent),
        backgroundColor: ["#FF6384","#36A2EB","#FFCE56","#2E8B57","#9370DB","#00BFFF"],
        hoverBackgroundColor: ["#FF6384","#36A2EB","#FFCE56","#2E8B57","#9370DB","#00BFFF"],
      },
    ],
  };
  console.log(data)
  return (
    <BigHomeGraph>
        <Doughnut data={data} />
    </BigHomeGraph>
      );
};
  export default HomeContent;