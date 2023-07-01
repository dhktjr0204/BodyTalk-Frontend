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

const Select = styled.select`
  width: 10%;
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

const HintOption = styled(Option)`
  color: #888888;
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

const Hospital = () =>{
    const [hospitals, setHospitals] = useState([]);
    //현재 위치 저장(내 위치누르면 다시 내 위치로 돌아가게끔)
    const [curruentLocation, setCurruentLocation] = useState('');
    //그냥 디폴트값으로 아무지역 넣어줬음. 현재 사용자 좌표 나오면 지역 이동함
    const [userLocation, setUserLocation] = useState({lat: 37.54,lng: 126.99});
    //현재 클릭한 병원 정보(맵 마커, 병원 정보 창 서로 업뎃해줌/ 내 위치로 바꿀땐 초기화)
    const [clickHospital, setClickHospital]=useState(null);
    const [type, setType] = useState("-");

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
      if (type === "-") {
        alert('진료과목을 선택해주세요');
        return;
      }
      
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
    };
  
    return (
          <div>
            <br></br><br></br><br></br>
            <HospitalMenu></HospitalMenu>
            <Text>병원 찾기</Text>
            <Wrapper>
        
              <Select
                id="specialty-select"
                value={type}
                onChange={handleTypeChange}
              >
                <HintOption value="-">진료과목 선택</HintOption>
                <Option value="내과">내과</Option>
                <Option value="안과">안과</Option>
                <Option value="치과">치과</Option>
                <Option value="정형외과">정형외과</Option>
                <Option value="산부인과">산부인과</Option>
                <Option value="비뇨기과">비뇨기과</Option>
                <Option value="피부과">피부과</Option>
                <Option value="정신">정신과</Option>
              </Select>
            
            <button onClick={handleHospitalButtonClick}>병원찾기</button>
            <AddressSearch setUserLocation={setUserLocation} setClickHospital={setClickHospital} />
            <button onClick={handleCurrentLocationClick}>내 위치</button>

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