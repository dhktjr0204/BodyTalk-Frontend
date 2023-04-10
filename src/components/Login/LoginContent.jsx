import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Title = styled.div`
    font-size: 1.5rem;
    font-weight: 500;
    color: ${oc.gray[8]};
    margin-bottom: 1rem;
`;

const LoginContent = ({title, children}) => (
    <div>
        <Title>{title}
        <a href="http://localhost:8080/oauth2/authorize/kakao?redirect_uri=http://localhost:3000/oauth2/redirect"></a>
        </Title>
        {children}
    </div>
);

export default LoginContent;