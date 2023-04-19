import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { remove } from 'react-cookies';
import DefaultMenu from 'components/MenuBar/DefaultMenu';

const MypageWrapper = styled.div`
  width: 60%;
  margin: auto;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  margin-bottom: 24px;
`;

const HistoryDetail = () => {
  const [HistoryInfo, setHistoryInfo] = useState([]);
  const { id } = useParams();
  const navigate= useNavigate();

  useEffect(() => {
    axios.get(`/api/mypage/${id}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        console.log(res.data);
        setHistoryInfo(res.data);
      })
      .catch((err) => {
         if (err.response && err.response.status === 401) {
          alert("로그인이 만료되어 로그아웃합니다.");
          sessionStorage.removeItem("accessToken");
          remove('JSESSIONID');//쿠키삭제
          navigate("/");
      } else {
          alert("불러오기에 실패하였습니다.");
      }
      });
  }, [id]);

  return (
    <div>
      <br /><br /><br />
      <DefaultMenu></DefaultMenu>
      <MypageWrapper>
        <h1>질문 내용</h1>
        <h1>{HistoryInfo.content}</h1>
        <br />
        <h1>증상</h1>
        <h2>{HistoryInfo.disease}</h2>
        <br />
        <h1>설명</h1>
        <h2>{HistoryInfo.info}</h2>
        <br />
        <h1>원인</h1>
        <h2>{HistoryInfo.cause}</h2>
        <br />
        <h1>방문해야될 병원</h1>
        <h2>{HistoryInfo.type}</h2>
      </MypageWrapper>
    </div>
  );
};

export default HistoryDetail;