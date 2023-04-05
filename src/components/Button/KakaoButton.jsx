import React, { Component } from 'react';
import styled from 'styled-components';

const KButton = styled.button`
    width: 340px;
    height: 40px;
    padding: 0.5rem;
    border-radius: 5px;
    font-size: 1.2em;
    font-weight: bold;
    font-family: 'Rajdhani';
    margin-bottom: 20px;
    color: #783C00;
    border-color: #FEE500;
    background-color: #FEE500   ;

    &:hover {
        /* 클릭시 아래로 미세하게 움직임 */
        transform: translateY(3px);
    }
`;

class KakaoButton extends Component {
    render() {
        return (
                <KButton>Kakao</KButton>
        );
    }
}

export default KakaoButton;