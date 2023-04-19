import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, Diagnosis, Hospital} from 'pages';
import RedirectPage from 'pages/RedirectPage';
import HeaderContainer from 'containers/Header/HeaderContainer';
import Diary from 'pages/Diary/Diary';
import DiaryDetail from 'pages/Diary/DiaryDetail';
import CreateDiary from 'pages/Diary/CreateDiary';
import DiaryChart from 'pages/Diary/DiaryChart';
import MyPage from 'pages/MyPage/MyPage';
import MyPageUpdate from 'pages/MyPage/MyPageUpdate';
import MyPageHistory from 'pages/MyPage/MyPageHistory';
import HistoryDetail from 'pages/MyPage/HistoryDetail';



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("accessToken")){
      setIsLoggedIn(true);
    }
  }, []);

  return (
      <div>
        <HeaderContainer isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route exact path="*" element={<Home setIsLoggedIn={setIsLoggedIn} />}/>
          <Route exact path="/medi" element={<Diagnosis />}/>
          <Route exact path="/hospital" element={<Hospital />}/>
          <Route exact path="/diary" element={<Diary />}/>
          <Route path="/oauth2/redirect" element={<RedirectPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}/>
          <Route path="/diary/:id" element={<DiaryDetail />}/>
          <Route path="/new-diary" element={<CreateDiary />}/>
          <Route path="/diary/chart" element={<DiaryChart />}/>
          <Route path="/mypage" element={<MyPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}/>
          <Route path="/mypage/update" element={<MyPageUpdate />}/>
          <Route path="/mypage/history" element={<MyPageHistory />}/>
          <Route path="/mypage/:id" element={<HistoryDetail />}/>
        </Routes>
      </div>
  );
}

export default App;