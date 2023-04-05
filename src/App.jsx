import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, Diagnosis, Hospital, Diary } from 'pages';
import HeaderContainer from 'containers/Header/HeaderContainer';


class App extends Component {
    render() {
        return (
            <div>
              <HeaderContainer/>
              <Routes>
                <Route exact path="*" element={<Home />}/>
                <Route exact path="/diagnosis" element={<Diagnosis />}/>
                <Route exact path="/hospital" element={<Hospital />}/>
                <Route exact path="/diary" element={<Diary />}/>
              </Routes>
            </div>
        );
    }
}

export default App;