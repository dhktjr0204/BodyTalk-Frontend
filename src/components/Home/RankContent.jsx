import React from 'react';
import styled from 'styled-components';


const RankList = styled.div`
    width: 50%;
    height: 400px;
    width: 600px;
    max-width: 500px; 
    height: auto; 
    margin: 0 auto;
`;

const Text = styled.span`
    font-size: 30px;
    color: black;
    letter-spacing: 1px;
    fontFamily: 'Bazzi';
`;

const NumText = styled.span`
    font-size: 30px;
    color: black;
    letter-spacing: 1px;
    font-family: 'Rajdhani';
`;
const RankContent = ({diagObj}) => {
    return(
        <RankList>
            {diagObj.map((diagObj, index) => (
                <div key={index}>
                    <br></br>
                    <NumText>{index+1}.</NumText>
                    <Text>{diagObj.name}</Text>
                    <Text>{diagObj.percent}%</Text>
                </div>
        ))}
        </RankList>
    );
    
};
export default RankContent;