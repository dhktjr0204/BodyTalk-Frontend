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
    handleClick = () => {
        window.location.href = "http://localhost:8080/oauth2/authorize/kakao?redirect_uri=http://localhost:3000/oauth2/redirect";
    }
    render() {
        return (
                <KButton onClick={this.handleClick}>Kakao</KButton>
        );
    }
}

export default KakaoButton;