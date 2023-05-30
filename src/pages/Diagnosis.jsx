import DiagnosisButton from 'components/Diagnosis/DiagnosisButton';
import DiagnosisDetail from 'components/Diagnosis/DiagnosisDetail';
import { DiagnosisMenu } from 'components/MenuBar';
import Loading from 'components/Loading/Loading'
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const CenterWrapper = styled.div`
  width: 75%;
  margin: auto;
`;


const TextInput = styled.textarea`
  font-size: 25px;
  margin-bottom: 16px;
  border: 1px solid ${oc.teal[6]};
  padding: 24px;
  display: flex;
  align-items: flex-start;
  width: 100%;
  height: 300px;
  white-space: pre-wrap;
  border-radius: 3px;
  overflow-wrap: break-word;

  &:focus {
    border-color: ${oc.teal[6]};
    box-shadow: 0 0 5px ${oc.teal[6]};
    outline: none;
  }
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

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
`;

const Diagnosis = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState("");
  const [diagnosis, setDiagnosis] = useState(null); 
  const [hospitals, setHospitals] = useState([]);
  const [userLocation, setUserLocation] = useState({lat: 37.54,lng: 126.99});

  //글 수정
  const handleInputChange = (value) => {
    setInputText(value);
  };
  //내 위치 좌표 구하기
  useEffect(() => {
    const getLocation = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      } catch (error) {
        console.log(error);
      }
    };
    getLocation();
  }, []);

  //사용자가 증상을 입력하고 확인 누르면 이 화면띄움
  if (diagnosis){
    return(
    <div>
      <br></br><br></br><br></br>
      <DiagnosisMenu></DiagnosisMenu>
      <div>
        <DiagnosisDetail diagnosis={diagnosis} userLocation={userLocation} hospitals={hospitals} setHospitals={setHospitals} />
      </div>
    </div>
    )
  }
  //증상 입력받기전에 띄우는 화면
  return (
  <div>
    <br></br><br></br><br></br>
    <DiagnosisMenu></DiagnosisMenu>
    <Text>증상 진단</Text>
    <CenterWrapper>
      {isLoading ? (
        <Wrapper>
          <Loading></Loading>
        </Wrapper>
        ):(
        <div>
          <TextInput type="text" value={inputText} onChange={(e) => handleInputChange(e.target.value)}></TextInput>

          <Wrapper>
            <DiagnosisButton inputText={inputText} setIsLoading={setIsLoading} setDiagnosis={setDiagnosis}></DiagnosisButton>
          </Wrapper>
        </div>
         )}
    </CenterWrapper>
    
</div>
);
};

export default Diagnosis;