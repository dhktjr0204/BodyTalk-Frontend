import axios from 'axios';
import HospitalDisplay from 'components/Hospital/HospitalDisplay';
import NaverMapAPI from 'components/Hospital/NaverMapAPI';
import { HospitalMenu } from 'components/MenuBar';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const MapAndHospitalsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 500px;
`;

const Hospital = () =>{
    const [hospitals, setHospitals] = useState([]);
    //그냥 디폴트값으로 아무지역 넣어줬음. 현재 사용자 좌표 나오면 지역 이동함
    const [userLocation, setUserLocation] = useState({lat: 37.54,lng: 126.99});
    const [clickHospital, setClickHospital]=useState(null);
    const [type, setType] = useState("내과");

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

    //진료과 바꾸면 동작
    const handleTypeChange = (event) => {
      setType(event.target.value);
    };


    //병원 찾기 버튼 누르면 서버와 통신
    const handleButtonClick = () => {
      const data = {
        type:type,
        lat: userLocation.lat,
        lon: userLocation.lng};
      console.log("보내는 데이터 확인",data);
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
      return (
          <div>
              <br></br><br></br><br></br>
              <HospitalMenu></HospitalMenu>
              <div>
          <label htmlFor="specialty-select">진료과목 선택: </label>
          <select
            id="specialty-select"
            value={type}
            onChange={handleTypeChange}
          >
            <option value="내과">내과</option>
            <option value="안과">안과</option>
            <option value="치과">치과</option>
            <option value="정형외과">정형외과</option>
            <option value="산부인과">산부인과</option>
            <option value="비뇨기과">비뇨기과</option>
            <option value="피부과">피부과</option>
            <option value="정신">정신과</option>
          </select>
          </div>
              <button onClick={handleButtonClick}>병원찾기</button>
              <MapAndHospitalsWrapper>
                  <NaverMapAPI
                    Latitude={userLocation.lat}
                    Longtitude={userLocation.lng}
                    hospitals={hospitals}
                    clickHospital={clickHospital} setClickHospital={setClickHospital}
                  />
              {hospitals.length>0&&(<HospitalDisplay hospitals={hospitals} clickHospital={clickHospital} setClickHospital={setClickHospital}/>)}
              </MapAndHospitalsWrapper>
          </div>
      );
}

export default Hospital;