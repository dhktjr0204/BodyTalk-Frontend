import React from 'react';
import styled from 'styled-components';


const RankList = styled.div`
    width: 50%;
    max-width: 500px; 
    height: auto; 
`;

const RankContent = ({diagObj}) => {
    return(
        <RankList>
            {diagObj.map((diagObj, index) => (
                <div key={index}>
                    <p>{index+1}.{diagObj.name} {diagObj.percent}%</p>
                </div>
        ))}
        </RankList>
    );
    
};
export default RankContent;