import React, { Component } from 'react';
import styled from 'styled-components';

const NButton = styled.button`
    width: 340px;
    height: 40px;
    padding: 0.5rem;
    border-radius: 5px;
    font-size: 1.2em;
    font-family: 'Rajdhani';
    margin-bottom: 20px;
    color: white;
    border-color: #04CF5C;
    background-color: #04CF5C;

    &:hover {
        /* 클릭시 아래로 미세하게 움직임 */
        transform: translateY(3px);
    }
`;

class NaverButton extends Component {
    render() {
        return (
            <NButton>Naver</NButton>
        );
    }
}

export default NaverButton;