import axios from 'axios';
import AddressSearch from 'components/Hospital/AddressSearch';
import HospitalDisplay from 'components/Hospital/HospitalDisplay';
import NaverMapAPI from 'components/Hospital/NaverMapAPI';
import { HospitalMenu } from 'components/MenuBar';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Wrapper = styled.div`
  width: 79%;
  margin: auto;
  padding: 0px;
  border-radius: 16px;
  margin-bottom: 24px;
`;

const SelectWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Select = styled.select`
  width: 30%;
  height: 30px;
  border: 2px solid black;
  border-radius: 4px;
  transition: border-color 0.3s ease-in-out;
  text-align: center;

  &:focus {
    border-color: ${oc.teal[6]};
    outline: none;
  }
`;

const Option = styled.option`
  height: 30px;
`;

const MapAndHospitalsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 500px;
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

const SText = styled.div`
    display: flex;
    justify-content: center;
    font-size: 20px;
    color: gray;
    letter-spacing: 1px;
    font-family: 'NanumGothic', sans-serif;
    width: 79%;
    margin: 0 auto;
    margin-bottom: 20px;
    font-weight: bold;
    align-items: center;
`;

const Button = styled.button`
  width: 250px;
  padding: 8px 20px;
  color: #FFFFFF;
  border: none;
  border-radius: 10px;
  font-size: 20px;
  cursor: pointer;
  margin: 5px;
  background: linear-gradient(to right, ${oc.teal[6]}, ${oc.cyan[5]});
  align: center;

  &:hover {
    /* 클릭시 아래로 미세하게 움직임 */
    transform: translateY(3px);
}
`;

const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
`;

const ConfirmDialog = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'NanumGothic', sans-serif;
  font-weight: bold;
  width: 400px;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 16px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  z-index: 9999;
  text-align: center;

  button{
    font-family: 'NanumGothic', sans-serif;
    font-weight: bold;
    cursor: pointer;
    background-color: gray;
    color: white;
    border-radius: 5px;
    font-size: 16px;
    height: 30px;

    &:hover {
      /* 클릭시 아래로 미세하게 움직임 */
      transform: translateY(2px);
    }
  }

  input{
    margin: 10px;
    font-size: 16px;
    height: 30px;

    &:focus {
      border-color: ${oc.teal[6]};
      outline: none;
    }
  }
`;

const Hospital = () =>{
    const [hospitals, setHospitals] = useState([]);
    //현재 위치 저장(내 위치누르면 다시 내 위치로 돌아가게끔)
    const [curruentLocation, setCurruentLocation] = useState('');
    //그냥 디폴트값으로 아무지역 넣어줬음. 현재 사용자 좌표 나오면 지역 이동함
    const [userLocation, setUserLocation] = useState({lat: 37.54,lng: 126.99});
    //현재 클릭한 병원 정보(맵 마커, 병원 정보 창 서로 업뎃해줌/ 내 위치로 바꿀땐 초기화)
    const [clickHospital, setClickHospital]=useState(null);
    const [type, setType] = useState("내과");
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    //내 위치 좌표 구하기
    useEffect(() => {
      const getLocation = async () => {
        try {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
          //동기적인 위치(병원 클릭시 병원 위치로 업뎃함)
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          //비동기적인 위치(현재 내 위치 저장)
          setCurruentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        } catch (error) {
          console.log(error);
        }
      };
      getLocation();
    }, []);


    //병원 찾기 버튼 누르면 서버와 통신
    const handleHospitalButtonClick = () => {
      const data = {
        type:type,
        lat: userLocation.lat,
        lon: userLocation.lng};
      axios.post(`/api/hospital`,data)
        .then((res) => {
          console.log(res.data);
          setHospitals(res.data);
        })
        .catch((err) => {
          console.log(err);
          alert("불러오기에 실패하였습니다.");
        });
    }


    //진료과 바꾸면 동작
    const handleTypeChange = (event) => {
      setType(event.target.value);
    };


    //내 위치 버튼 누르면 현재 위치로 돌아가기
    const handleCurrentLocationClick = () => {
      setClickHospital(null);
      setUserLocation(curruentLocation);
      handleHospitalButtonClick();
    };

    const handleConfirmNo = () => {
      setShowConfirmDialog(false);
      handleHospitalButtonClick();
    };

    useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.keyCode === 27) {
          handleConfirmNo();
        }
      };
  
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, [handleConfirmNo]);

    useEffect(() => {
      handleConfirmNo();
    }, [userLocation]);
  
    return (
          <div>
            <br></br><br></br><br></br>
            <HospitalMenu></HospitalMenu>
            <Text>병원 찾기</Text>
            <br></br>
            <Wrapper>
              <ButtonWrapper>
                <div>
                  <SelectWrapper>
                    <Button onClick={handleCurrentLocationClick}>내 주변 병원찾기</Button>
                  </SelectWrapper>
                </div>
                <div>
                <SText>진료과목을 선택해주세요!</SText>
                <SelectWrapper>
                  <Select
                    id="specialty-select"
                    value={type}
                    onChange={handleTypeChange}
                  >
                    <Option value="내과">내과</Option>
                    <Option value="안과">안과</Option>
                    <Option value="치과">치과</Option>
                    <Option value="정형외과">정형외과</Option>
                    <Option value="산부인과">산부인과</Option>
                    <Option value="비뇨기과">비뇨기과</Option>
                    <Option value="피부과">피부과</Option>
                    <Option value="정신">정신과</Option>
                  </Select>
                </SelectWrapper>
                </div>
                <div>
                  <SelectWrapper>
                    <Button onClick={() => setShowConfirmDialog(true)}>지역명으로 병원찾기</Button>
                  </SelectWrapper>
                </div>
              </ButtonWrapper>

            {showConfirmDialog && (
              <ConfirmDialog>
                <AddressSearch setUserLocation={setUserLocation} setClickHospital={setClickHospital}/>
              </ConfirmDialog>
            )}
            <br></br><br></br>
            <MapAndHospitalsWrapper>
                <NaverMapAPI
                  Latitude={userLocation.lat}
                  Longtitude={userLocation.lng}
                  hospitals={hospitals}
                  clickHospital={clickHospital} setClickHospital={setClickHospital}
                />
            {hospitals.length>0&&(<HospitalDisplay hospitals={hospitals} clickHospital={clickHospital} setClickHospital={setClickHospital}/>)}
            {hospitals.length>0||(<HospitalDisplay hospitals={hospitals} clickHospital={clickHospital} setClickHospital={setClickHospital}/>)}
            </MapAndHospitalsWrapper>
            </Wrapper>
          </div>
    );
}

export default Hospital;