import HomeMenu from 'components/MenuBar/HomeMenu';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import HomeContent from 'components/Home/HomeContent';
import axios from "axios";
import RankContent from 'components/Home/RankContent';
import { useNavigate } from 'react-router-dom';

//요소를 가로로 나열, 요소 사이의 간격 자동 조정, 요소들을 수직 중앙 정렬
const Middle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const Home = () => {
  const navigate= useNavigate();

  const navigateToPurchase = () =>{
    navigate("/medi")
  }
  const [diagObj, setDiagObj] = useState([]);
  useEffect(() => {
    axios({
      method: "GET",
      url:`/api`
    })
      .then((res) => {
        console.log(res.data);
        setDiagObj(res.data);
      })
      .catch((err) => {
        alert("불러오기에 실패하였습니다.");
        console.log("데이터 가져오기 에러", err);
      });
  }, []);

  return (
  <div>
    <br></br><br></br><br></br>
    <HomeMenu></HomeMenu>
    <Middle>
      <HomeContent diagObj={diagObj}/>
      <RankContent diagObj={diagObj}/>
    </Middle>
    <div>
      <button 
      size="large" 
      onClick={navigateToPurchase}>
        증상 진단 받기
      </button>
    </div>
  </div>
  );
}

export default Home;