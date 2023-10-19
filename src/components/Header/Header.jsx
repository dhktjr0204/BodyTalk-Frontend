import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow, media } from 'lib/styleUtil';

// 상단 고정, 그림자
const Positioner = styled.div`
    display: flex;
    z-index: 999;
    flex-direction: column;
    position: fixed;
    top: 0px;
    width: 100%;
    ${shadow(1)}
`;

// 배경색 oc.teal, 내용 중간 정렬
const HeaderBackground = styled.div`
    background: linear-gradient(to right, ${oc.teal[6]}, ${oc.cyan[5]});
    display: flex;
    height: auto;
    ${shadow(1)};
`;

// 해더의 내용
const HeaderContents = styled.div`
    width: 1200px;
    height: 55px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-right: 1rem;
    padding-left: 1rem;
    ${media.wide`
        width: 992px;
    `}

    ${media.tablet`
        width: 100%;
    `}
    width: 80%;
    margin: 0 auto;
`;

// 로고
const Logo = styled.div`
    font-size: 2rem;
    letter-spacing: 2px;
    color: white;
    font-weight: bold;
    font-family: 'Rajdhani';
`;

// 중간 여백
const Spacer = styled.div`
    flex-grow: 1;
`;

const Header = ({children}) => {
    return (
        <Positioner>
            <HeaderBackground>
                <HeaderContents>
                    <Logo>Body Talk</Logo>
                    <Spacer/>
                    {children}
                </HeaderContents>
            </HeaderBackground>
        </Positioner>
    );
};

export default Header;