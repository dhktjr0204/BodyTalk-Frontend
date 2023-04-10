import React from 'react';

const DiagnosisDetail = ({diagnosis}) => {
    const { disease, diseaseInfo, cause, type } = diagnosis;
    return (
        <div>
        <p>
          <div>증상: {disease}</div>
          <div>설명: {diseaseInfo}</div>
          <div>원인: {cause}</div>
          <div>방문해야될 병원: {type}</div>
        </p>
        <button onClick={() => window.location.reload()}>다시 진단받기</button>
      </div> 
    );
};

export default DiagnosisDetail;