import HomeMenu from 'components/MenuBar/HomeMenu';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import HomeContent from 'components/Home/HomeContent';
import axios from "axios";
import oc from 'open-color';
import RankContent from 'components/Home/RankContent';
import { useNavigate } from 'react-router-dom';

//요소를 가로로 나열, 요소 사이의 간격 자동 조정, 요소들을 수직 중앙 정렬
const HomeWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    margin: 0 auto;
`;
const Button = styled.button`
  padding: 8px 50px;
  color: #FFFFFF;
  border: none;
  border-radius: 10px;
  font-size: 20px;
  cursor: pointer;
  margin-top: 16px;
  background: linear-gradient(to right, ${oc.teal[6]}, ${oc.cyan[5]});

  &:hover {
    /* 클릭시 아래로 미세하게 움직임 */
    transform: translateY(3px);
}
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const VerticalLine = styled.div`
  border-left: 1px solid gray;
  height: 450px;
`;

const Text = styled.div`
    font-size: 30px;
    color: transparent;
    letter-spacing: 1px;
    font-family: 'NanumGothic', sans-serif;
    width: 80%;
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 10px;
    font-weight: bold;
    background: linear-gradient(to right, ${oc.teal[6]}, ${oc.cyan[5]});
    -webkit-background-clip: text; /* Safari */
    -webkit-text-fill-color: transparent; /* Safari */
`;

const QText = styled.div`
    font-size: 20px;
    color: black;
    letter-spacing: 1px;
    fontFamily: 'Bazzi';
    width: 80%;
    margin: 0 auto;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SText = styled.div`
    font-size: 15px;
    color: gray;
    letter-spacing: 1px;
    font-family: 'NanumGothic', sans-serif;
    width: 79%;
    margin: 0 auto;
    margin-bottom: 20px;
    font-weight: bold;
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
    <Text>진단 결과 순위</Text>
    <SText>사용자들이 많이 진단받는 진단명들 순위입니다.</SText>
    <HomeWrapper>
      <HomeContent diagObj={diagObj} style={{ width: '45%' }}/>

      <RankContent diagObj={diagObj} style={{ width: '45%' }}/>
    </HomeWrapper>
    <div>
      <br /><br /><br />
      <Wrapper>
        <QText>바디톡에 질문해보세요!</QText>
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