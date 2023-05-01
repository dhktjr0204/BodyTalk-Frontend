import DiagnosisButton from 'components/Diagnosis/DiagnosisButton';
import DiagnosisDetail from 'components/Diagnosis/DiagnosisDetail';
import { DiagnosisMenu } from 'components/MenuBar';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const CenterWrapper = styled.div`
  width: 60%;
  margin: auto;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
`;


const TextInput = styled.textarea`
  font-size: 18px;
  margin-bottom: 16px;
  border: 1px solid gray;
  padding: 24px;
  display: flex;
  align-items: flex-start;
  width: 100%;
  height: 200px;
  white-space: pre-wrap;
  overflow-wrap: break-word;
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
    <CenterWrapper>
      {isLoading ? (
        <div>
        <span>Loading...</span>
        </div>
        ):(
        <div>
        <h2>증상을 입력해주세요!</h2>
        <TextInput type="text" value={inputText} onChange={(e) => handleInputChange(e.target.value)}></TextInput>
        <DiagnosisButton inputText={inputText} setIsLoading={setIsLoading} setDiagnosis={setDiagnosis}>진단받기</DiagnosisButton>
         </div>
         )}
    </CenterWrapper>
</div>
);
};

export default Diagnosis;