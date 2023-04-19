import React from 'react';
import styled from 'styled-components';

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


const DiagnosisDetail = ({diagnosis}) => {
    const { disease, diseaseInfo, cause, type } = diagnosis;
    
    return (
        <CenterWrapper>
          <h1>증상</h1>
          <div>{disease}</div>
          <h1>설명</h1>
          <div>{diseaseInfo}</div>
          <h1>원인</h1>
          <div>{cause}</div>
          <h1>방문해야될 병원</h1>
          <div>{type}</div>
        <ReloadButton onClick={() => window.location.reload()}>다시 진단받기</ReloadButton>
      </CenterWrapper> 
    );
};

export default DiagnosisDetail;