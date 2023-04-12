import React, { useEffect, useState } from 'react';
import { DiaryMenu } from 'components/MenuBar';
import DiaryForm from 'components/Diary/DiaryForm';
import moment from "moment";

const CreateDiary = () => {
  const diaryInfo={
    id:'',content:'', date:moment(new Date()).format("YYYY-MM-DD"),tag:[]
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