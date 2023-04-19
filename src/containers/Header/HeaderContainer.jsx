import React from 'react';
import Header from 'components/Header/Header';
import { LoginButton } from 'components/Button';
import MypageButton from 'components/Button/MypageButton';

const HeaderContainer = ({ isLoggedIn, setIsLoggedIn }) =>{
    //만약 로그인된 상태라면 mypage보여주기
    return (
        <Header>
            {isLoggedIn ? <MypageButton /> : <LoginButton />}
        </Header>
    );
}

export default HeaderContainer;