import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DiaryMenu } from 'components/MenuBar';
import LineChart from 'components/Chart/LineChart';
import styled from 'styled-components';
import BarChart from 'components/Chart/BarChart';
import { useNavigate } from 'react-router-dom';
import { remove } from 'react-cookies';
import oc from 'open-color';

//차트랑 버튼 수직으로 배치하기
const ChartAndButtonWrapper = styled.div`
    margin-top: auto;
    margin-bottom: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

//차트 가운데 배치하기
const ChartWrapper = styled.div`
    display: flex;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
`;

const ButtonWrapper=styled.div`
    margin-top: auto;
    margin-bottom: auto;
    display:flex;
    height:20vh;
    justify-content: center;
    align-items: center;
`;

const CenterWrapper=styled.div`
    display:flex;
    height:80vh;
    justify-content: center;
    align-items: center;
`;

const ReturnButton = styled.button`
    padding: 8px 50px;
    color: #FFFFFF;
    border: none;
    border-radius: 10px;
    font-size: 20px;
    cursor: pointer;
    margin-top: 0px;
    background: linear-gradient(to right, ${oc.teal[6]}, ${oc.cyan[5]});
    align: center;

    &:hover {
    /* 클릭시 아래로 미세하게 움직임 */
    transform: translateY(3px);
    }
`;

const DiaryChart = () => {
    const [top3SymptomInfo, setTop3SymptomInfo] = useState([]);
    const [typeInfo, setTypeInfo] = useState([]);
    const navigate= useNavigate();

    const onClickDiary = () => {
        navigate("/diary");
    }

    const currentDate = new Date();
    const threeMonthsAgo = new Date(currentDate);
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    const startDate = threeMonthsAgo.toISOString().substring(0, 10);
    const endDate = currentDate.toISOString().substring(0, 10);

    //서버에서 데이터 받아오기
    useEffect(() => {
        const data = {
            start: startDate,
            end: endDate,
        };
        axios
        .post(`/api/diary/chart`, data, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
            },
        })
        .then((res) => {
            console.log(res.data.symptomInfo);
            setTop3SymptomInfo(res.data.symptomInfo);
            setTypeInfo(res.data.typeInfo);
        })
        .catch((err) => {

             //만약 로그인 시간이 만료된다면 이 오류띄움
             if (err.response && err.response.status === 401) {
                alert("로그인이 만료되어 로그아웃합니다.");
                sessionStorage.removeItem("accessToken");
                remove('JSESSIONID');//쿠키삭제
                navigate("/");
            } else {
                alert("불러오기에 실패하였습니다.");
            }
            console.log("차트 에러", err);
        });
    }, []);
    
    return (
        <div>
            <br />
            <br />
            <br />
            <DiaryMenu />
            <CenterWrapper>
                <ChartAndButtonWrapper>
                    <ChartWrapper>
                        {top3SymptomInfo.length > 0 && (
                            <LineChart 
                                top3SymptomInfo={top3SymptomInfo} 
                                startDate={startDate} 
                                endDate={endDate} 
                                style={{ width: '50%' }}
                            />
                        )}
                        {typeInfo.length > 0 && (
                            <BarChart
                                typeInfo={typeInfo}
                                style={{ width: '50%' }}
                            />
                        )}
                    </ChartWrapper>
                    <ButtonWrapper>
                        <ReturnButton onClick={onClickDiary}>돌아가기</ReturnButton>
                        </ButtonWrapper>
                    
                </ChartAndButtonWrapper>
            </CenterWrapper>
        </div>
    );
};

export default DiaryChart;