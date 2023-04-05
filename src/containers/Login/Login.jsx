import React, { Component } from 'react';
import GoogleButton from 'components/Button/GoogleButton';
import NaverButton from 'components/Button/NaverButton';
import KakaoButton from 'components/Button/KakaoButton';

class Login extends Component {
    render() {
        return (
            <div>
                <GoogleButton></GoogleButton>
                <NaverButton></NaverButton>
                <KakaoButton></KakaoButton>
                <hr></hr>
            </div>
        );
    }
}

export default Login;