import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow } from 'lib/styleUtil';
import { Login } from 'containers/Login';

// 화면의 중앙에 위치시킨다
const Positioner = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

// 너비, 그림자 설정
const ShadowedBox = styled.div`
    width: 400px;
    z-index: 999;
    ${shadow(2)}
`;

// 로고
const LogoWrapper = styled.div`
    background: linear-gradient(to right, ${oc.teal[6]}, ${oc.cyan[5]});
    text-align: center;
    display: in-line;
`;

const Logo = styled.div`
    color: white;
    font-family: 'Rajdhani';
    font-size: 2.4rem;
    float: center;
    letter-spacing: 5px;
`;

// children 이 들어가는 곳
const Contents = styled.div`
    background: white;
    padding: 2rem;
    height: auto;
`;

const XButton = styled.button`
    background: transparent;
    border:none;
    font-weight: 600;
    color: white;
    padding: 0.5rem;
    cursor: pointer;
    text-decoration: none;
    transition: .2s all;
    float: right;
    font-family: 'Rajdhani';

    &:hover {
        color: black;
    }

    &:active {
        /* 클릭시 아래로 미세하게 움직임 */
        transform: translateY(3px);
    }
`;

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

function AuthWrapper({ setModalOpen }) {
    // 모달 끄기 (X버튼 onClick 이벤트 핸들러)
    const closeModal = () => {
        setModalOpen(false);
    };


    return (
        <Positioner>
            <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
            <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
            <ShadowedBox></ShadowedBox>
            <ShadowedBox>
                <LogoWrapper>
                    <Logo>Body Talk<XButton onClick={closeModal}>X</XButton>
                     </Logo>
                </LogoWrapper>
                <Contents>
                    <Login></Login>
                    <NButton onClick={closeModal}>비회원으로 계속하기</NButton>
                </Contents>
            </ShadowedBox>
        </Positioner>
    );
}

export default AuthWrapper;