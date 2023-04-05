import React, { Component } from 'react';
import GoogleButton from 'components/Button/GoogleButton';
import NaverButton from 'components/Button/NaverButton';
import KakaoButton from 'components/Button/KakaoButton';
import Non_UserButton from 'components/Button/Non_UserButton';

class Login extends Component {
    render() {
        return (
            <div>
                <GoogleButton></GoogleButton>
                <NaverButton></NaverButton>
                <KakaoButton></KakaoButton>
                <hr></hr>
                <Non_UserButton></Non_UserButton>
            </div>
        );
    }
}

export default Login;