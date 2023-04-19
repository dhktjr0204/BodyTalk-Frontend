import React from 'react';
import styled from 'styled-components';

const DotStyle = styled.div`
    height: 8px;
    width: 8px;
    background-color: #f87171;
    border-radius: 50%;
`;

const Dot = () =>{
    return(
        <div className="flex justify-center items-center absoluteDiv">
            <DotStyle></DotStyle>
        </div>
    );
    
 }
export default Dot;