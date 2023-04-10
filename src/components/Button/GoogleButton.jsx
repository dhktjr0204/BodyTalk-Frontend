import React, { Component } from 'react';
import styled from 'styled-components';

const GButton = styled.button`
    width: 340px;
    height: 40px;
    padding: 0.5rem;
    border-radius: 5px;
    font-size: 1.2em;
    font-family: 'Rajdhani';
    margin-bottom: 20px;
    border-color: #C3C3C3;
    background: white;

    &:hover {
        /* 클릭시 아래로 미세하게 움직임 */
        transform: translateY(3px);
    }
`;

class GoogleButton extends Component {
    handleClick = () => {
        window.location.href = "http://localhost:8080/oauth2/authorize/google?redirect_uri=http://localhost:3000/oauth2/redirect";
    }
    render() {
        return (
            <GButton onClick={this.handleClick}>Google</GButton>
        );
    }
}

export default GoogleButton;