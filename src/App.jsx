import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, Diagnosis, Hospital, Diary} from 'pages';
import RedirectPage from 'pages/RedirectPage';
import HeaderContainer from 'containers/Header/HeaderContainer';


class App extends Component {
    render() {
        return (
            <div>
              <HeaderContainer/>
              <Routes>
                <Route exact path="*" element={<Home />}/>
                <Route exact path="/medi" element={<Diagnosis />}/>
                <Route exact path="/hospital" element={<Hospital />}/>
                <Route exact path="/diary" element={<Diary />}/>
                <Route path="/oauth2/redirect" element={<RedirectPage />}/>
              </Routes>
            </div>
        );
    }
}

export default App;