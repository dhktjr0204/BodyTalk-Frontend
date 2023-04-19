import React, { useEffect, useState } from 'react';
import { Bar } from "react-chartjs-2";
import styled from 'styled-components';

const StyledBar = styled(Bar)`
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

const BarChart = ({typeInfo}) => {
    const data = {
        labels: typeInfo.map((info) => info.type),
        datasets: [
          {
            label: 'Type Count',
            backgroundColor: 'rgba(140,140,140,1)',
            borderWidth: 1,
            data: typeInfo.map((info) => info.cnt),
          },
        ],
    };
    const getMaxValue = (data) => {
        const values = data.datasets[0].data;
        const maxValue = Math.max(...values);
        if (maxValue <= 10) {
          return 15;
        } else {
          return Math.ceil(maxValue / 5) * 5 + 5;
        }
    }
    console.log(getMaxValue(data));
    const options =  {
        plugins: {
          title: {
            display: true,
            text: "부위 별 통계",
            font: {size: 18,},
          },
          legend: {
            position: "bottom",
          },
        },
    };
    
    return (
        <StyledBar data={data} options={options} />
    );
};

export default BarChart;