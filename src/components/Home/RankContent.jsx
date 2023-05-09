import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';


const RankList = styled.div`
    width: 50%;
    height: 400px;
    width: 600px;
    max-width: 500px; 
    height: auto; 
    margin: 0 auto;
`;

const Line = styled.div`
  width: ${({ length }) => (length ? length : '100%')};
  height: 2px;
  background: linear-gradient(to right, ${oc.teal[6]}, ${oc.cyan[5]});
`;

const Text = styled.span`
    font-size: 20px;
    color: black;
    letter-spacing: 1px;
    fontFamily: 'Bazzi';
`;

const NumText = styled.span`
    font-size: 20px;
    color: black;
    letter-spacing: 1px;
    font-family: 'Bazzi';
`;
const RankContent = ({diagObj}) => {
    const slicedDiagObj = diagObj.slice(0, -1);
    return(
        <RankList>
            <Line length="60%" />
            {slicedDiagObj.map((diagObj, index) => (
                <div key={index}>
                    <br></br>
                    <NumText>{index+1}.</NumText>
                    <Text> {diagObj.name}</Text>
                    <Text> {diagObj.percent}%</Text>
                </div>
        ))}
        </RankList>
    );
    
};
export default RankContent;