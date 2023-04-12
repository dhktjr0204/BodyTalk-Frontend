import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, Diagnosis, Hospital, Diary} from 'pages';
import RedirectPage from 'pages/RedirectPage';
import HeaderContainer from 'containers/Header/HeaderContainer';
import DiaryDetail from 'pages/DiaryDetail';
import CreateDiary from 'pages/CreateDiary';


function App() {
      return (
          <div>
            <HeaderContainer/>
            <Routes>
              <Route exact path="*" element={<Home />}/>
              <Route exact path="/medi" element={<Diagnosis />}/>
              <Route exact path="/hospital" element={<Hospital />}/>
              <Route exact path="/diary" element={<Diary />}/>
              <Route path="/oauth2/redirect" element={<RedirectPage />}/>
              <Route path="/diary/:id" element={<DiaryDetail />}/>
              <Route path="/new-diary" element={<CreateDiary />}/>
            </Routes>
          </div>
      );
}

export default App;