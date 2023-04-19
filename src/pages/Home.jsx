import HomeMenu from 'components/MenuBar/HomeMenu';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import HomeContent from 'components/Home/HomeContent';
import axios from "axios";
import RankContent from 'components/Home/RankContent';
import { useNavigate } from 'react-router-dom';

//요소를 가로로 나열, 요소 사이의 간격 자동 조정, 요소들을 수직 중앙 정렬
const HomeWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const Button = styled.button`
  padding: 8px 16px;
  background-color: #0077c2;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 16px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const VerticalLine = styled.div`
  border-left: 1px solid gray;
  height: 450px;
`;

const Home = ({setIsLoggedIn}) => {
  const navigate= useNavigate();

  const navigateToPurchase = () =>{
    navigate("/medi")
  }
  const [diagObj, setDiagObj] = useState([]);

  //만약 세션에 토큰이 없으면 비로그인화면으로 바꿈, 세션 만료시 사용
  useEffect(() => {
    if (!sessionStorage.getItem("accessToken")){
      setIsLoggedIn(false);
    }
  }, []);


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
    <HomeWrapper>
      <HomeContent diagObj={diagObj} style={{ width: '45%' }}/>
      <VerticalLine />
      <RankContent diagObj={diagObj} style={{ width: '45%' }}/>
    </HomeWrapper>
    <div>
      <br /><br /><br />
      <Wrapper>
        <Button 
        size="large" 
        onClick={navigateToPurchase}>
          증상 진단 받기
        </Button>
      </Wrapper>
    </div>
  </div>
  );
}

export default Home;