import HospitalDisplay from 'components/Hospital/HospitalDisplay';
import NaverMapAPI from 'components/Hospital/NaverMapAPI';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import oc from 'open-color';

const CenterWrapper = styled.div`
  width: 79%;
  margin: auto;
  padding: 0px;
  border-radius: 16px;
  margin-bottom: 24px;
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

const ReloadButton = styled.button`
  padding: 8px 50px;
  color: #FFFFFF;
  border: none;
  border-radius: 10px;
  font-size: 20px;
  cursor: pointer;
  margin-top: 16px;
  background: linear-gradient(to right, ${oc.teal[6]}, ${oc.cyan[5]});
  align: center;

  &:hover {
    /* 클릭시 아래로 미세하게 움직임 */
    transform: translateY(3px);
  }
`;

const ReloadButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

const MapAndHospitalsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 500px;
`;

const DiaWrapper = styled.div`
  font-weight: normal;
  width: 99%;
  margin: auto;
  cursor: pointer;
  font-family: 'NanumGothic', sans-serif;
  border-left: 4px solid;
  border-image: linear-gradient(to bottom, ${oc.teal[6]}, ${oc.cyan[5]});
  border-image-slice: 1;
  padding: 10px 24px;
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
      <>
        <Text>진단 결과</Text>
        <CenterWrapper>
          <h2>증상</h2>
          <DiaWrapper>{disease}</DiaWrapper>
          <h2>설명</h2>
          <DiaWrapper>{diseaseInfo}</DiaWrapper>
          <h2>원인</h2>
          <DiaWrapper>{cause}</DiaWrapper>
          <h2>추천병원</h2>
          <DiaWrapper>
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
          </DiaWrapper>
        <ReloadButtonWrapper>
          <ReloadButton onClick={() => window.location.reload()}>다시 진단받기</ReloadButton>
        </ReloadButtonWrapper>
      </CenterWrapper> 
    </>
  );
};

export default DiagnosisDetail;