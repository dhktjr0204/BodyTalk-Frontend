import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

const BorderedButton = styled.div`
    font-weight: 600;
    color: white;
    padding: 0.5rem;
    padding-bottom: 0.4rem;
    cursor: pointer;
    text-decoration: none;
    transition: .2s all;
    font-family: 'Rajdhani';

    &:hover {
        color: black;
    }

    &:active {
        /* 클릭시 아래로 미세하게 움직임 */
        transform: translateY(3px);
    }
`;

// 로그인창을 노출하는 페이지
function MypageButton() {
    const navigate= useNavigate();

    const handleClick = () => {
      navigate(`/mypage`);
    }

    return (
        <div>
            <BorderedButton onClick={handleClick}>MyPage</BorderedButton>
        </div>
    );
}

export default MypageButton;