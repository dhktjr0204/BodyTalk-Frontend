import React, { useState } from 'react';
import styled from 'styled-components';
import { LoginWrapper } from 'components/Login';

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
function LoginButton() {
    // 로그인창 노출 여부 state
    const [modalOpen, setModalOpen] = useState(false);

    // 로그인창 노출
    const showModal = () => {
        setModalOpen(true);
    };

    return (
        <div>
            <BorderedButton onClick={showModal}>Login</BorderedButton>
            {modalOpen && <LoginWrapper setModalOpen={setModalOpen} />}
        </div>
    );
}

export default LoginButton;