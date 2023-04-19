import React from 'react';
import { DiaryMenu } from 'components/MenuBar';
import DiaryForm from 'components/Diary/DiaryForm';
import { useLocation } from "react-router-dom";
import moment from "moment";

const CreateDiary = () => {
  //http://localhost:3000/creatediary로 페이지가 이동했을때 같이 보내진 데이터 읽기
  const location = useLocation();
  const {date} = location.state;

  //새로운 게시판 만들기 기능이라 다이어리 폼에 아무것도 없이 보낸다.
  const diaryInfo={
    id:'',content:'', date:moment(date).format("YYYY-MM-DD"),tag:[]
  }

  return (
    <div>
      <br /><br /><br />
      <DiaryMenu />
      <DiaryForm diary={diaryInfo}></DiaryForm>
    </div>
  );
};

export default CreateDiary;