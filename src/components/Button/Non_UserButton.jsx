import React, { Component } from 'react';
import styled from 'styled-components';

const NButton = styled.button`
    width: 340px;
    height: 40px; 
    border-radius: 5px;
    font-size: 1em;
    font-weight: bold;
    font-family: 'nanumgothic';
    margin-top: 20px;
    margin-bottom: 20px;
    border-color: #C3C3C3;
    background-color: #C3C3C3;

    &:hover {
        /* 클릭시 아래로 미세하게 움직임 */
        transform: translateY(3px);
    }
`;

class Non_UserButton extends Component {
    render() {
        return (
            <NButton>비회원으로 계속하기</NButton>
        );
    }
}

export default Non_UserButton;