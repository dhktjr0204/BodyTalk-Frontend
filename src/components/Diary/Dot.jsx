import React from 'react';
import styled from 'styled-components';

const DotStyle = styled.div`
    height: 8px;
    width: 8px;
    background-color: #f87171;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

//빨간점 가운데 정렬이 안돼용 ㅜ 수정 부탁드려용
const Dot = () =>{
    return(
        <div className="flex justify-center items-center absoluteDiv">
            <DotStyle></DotStyle>
        </div>
    );
    
 }
export default Dot;