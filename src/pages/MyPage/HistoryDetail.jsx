import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { remove } from 'react-cookies';
import DefaultMenu from 'components/MenuBar/DefaultMenu';
import oc from 'open-color';

const MypageWrapper = styled.div`
  width: 79%;
  margin: auto;
  padding: 0px;
  border-radius: 16px;
  margin-bottom: 24px;
`;

const Text = styled.div`
    font-size: 30px;
    color: transparent;
    letter-spacing: 1px;
    font-family: 'NanumGothic', sans-serif;
    width: 80%;
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 20px;
    font-weight: bold;
    background: linear-gradient(to right, ${oc.teal[6]}, ${oc.cyan[5]});
    -webkit-background-clip: text; /* Safari */
    -webkit-text-fill-color: transparent; /* Safari */
`;

const BackButton = styled.button`
  padding: 8px 50px;
  color: #FFFFFF;
  border: none;
  border-radius: 10px;
  font-size: 20px;
  cursor: pointer;
  margin-top: 16px;
  background: linear-gradient(to right, ${oc.teal[6]}, ${oc.cyan[5]});
  align: center;

  &:hover {
    /* 클릭시 아래로 미세하게 움직임 */
    transform: translateY(3px);
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

const DiaWrapper = styled.div`
  font-weight: normal;
  width: 99%;
  margin: auto;
  cursor: pointer;
  font-family: 'NanumGothic', sans-serif;
  border-left: 4px solid;
  border-image: linear-gradient(to bottom, ${oc.teal[6]}, ${oc.cyan[5]});
  border-image-slice: 1;
  padding: 10px 24px;
`;

const HistoryDetail = () => {
  const [HistoryInfo, setHistoryInfo] = useState([]);
  const { id } = useParams();
  const navigate= useNavigate();

  useEffect(() => {
    axios.get(`/api/mypage/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        console.log(res.data);
        setHistoryInfo(res.data);
      })
      .catch((err) => {});
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };


  return (
    <div>
      <br/><br/><br/>
      <DefaultMenu></DefaultMenu>
      <Text>진료 기록</Text>
      <MypageWrapper>
        <h2>질문 내용</h2>
        <DiaWrapper>{HistoryInfo.content}</DiaWrapper>
        <br/>
        <h2>증상</h2>
        <DiaWrapper>{HistoryInfo.disease}</DiaWrapper>
        <br/>
        <h2>설명</h2>
        <DiaWrapper>{HistoryInfo.info}</DiaWrapper>
        <br/>
        <h2>원인</h2>
        <DiaWrapper>{HistoryInfo.cause}</DiaWrapper>
        <br/>
        <h2>방문해야될 병원</h2 >
        <DiaWrapper>{HistoryInfo.type}</DiaWrapper>
        <ButtonWrapper>
          <BackButton onClick={handleGoBack}>돌아가기</BackButton>
        </ButtonWrapper>
      </MypageWrapper>
    </div>
  );
};

export default HistoryDetail;