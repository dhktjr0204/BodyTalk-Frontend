import React, { Component } from 'react';
import Header from 'components/Header/Header';
import { LoginButton } from 'components/Button';

class HeaderContainer extends Component {
    render() {
        return (
            <Header>
                <LoginButton/>
            </Header>
        );
    }
}

export default HeaderContainer;