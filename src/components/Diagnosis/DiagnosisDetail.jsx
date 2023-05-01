import HospitalDisplay from 'components/Hospital/HospitalDisplay';
import NaverMapAPI from 'components/Hospital/NaverMapAPI';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const CenterWrapper = styled.div`
  width: 60%;
  margin: auto;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
`;

const ReloadButton = styled.button`
  background-color: #86A8E7;
  border: none;
  color: white;
  padding: 12px 24px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 16px;
`;

const MapAndHospitalsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 500px;
`;

const DiagnosisDetail = ({diagnosis, userLocation, hospitals, setHospitals}) => {
    const [clickHospital, setClickHospital]=useState(null);

    const { disease, diseaseInfo, cause, type } = diagnosis;

    //병원 리스트 가져오기
    useEffect(() => {
      const getHospitals = async () => {
        if (userLocation.lat !== 37.54) {
          const data = {
            type: type,
            lat: userLocation.lat,
            lon: userLocation.lng
          };
          try {
            const res = await axios.post(`/api/hospital`, data);
            setHospitals(res.data);
          } catch (err) {
            console.log(err);
            alert("불러오기에 실패하였습니다.");
          }
        }
      };
      getHospitals();
    }, [userLocation]);


    return (
        <CenterWrapper>
          <h1>증상</h1>
          <div>{disease}</div>
          <h1>설명</h1>
          <div>{diseaseInfo}</div>
          <h1>원인</h1>
          <div>{cause}</div>
          <h1>추천병원</h1>
          
          <MapAndHospitalsWrapper>
            <NaverMapAPI
                  Latitude={userLocation.lat}
                  Longtitude={userLocation.lng}
                  hospitals={hospitals}
                  clickHospital={clickHospital} setClickHospital={setClickHospital}
            />
            {hospitals.length>0&&(<HospitalDisplay hospitals={hospitals} clickHospital={clickHospital} setClickHospital={setClickHospital}/>)}
          </MapAndHospitalsWrapper>

        <ReloadButton onClick={() => window.location.reload()}>다시 진단받기</ReloadButton>
      </CenterWrapper> 
    );
};

export default DiagnosisDetail;