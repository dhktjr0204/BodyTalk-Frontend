import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { DiaryMenu } from 'components/MenuBar';
import DiaryForm from 'components/Diary/DiaryForm';
import { remove } from 'react-cookies';
import { useNavigate } from 'react-router-dom';


const DiaryDetail = () => {
  const [diaryInfo, setDiaryInfo] = useState([]);
  const { id } = useParams();
  const navigate= useNavigate();


  useEffect(() => {
    axios.get(`/api/diary/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        console.log(res.data);
        setDiaryInfo(res.data);
      })
      .catch((err) => {});
  }, [id]);

  return (
    <div>
      <br /><br /><br />
      <DiaryMenu />
      {diaryInfo.tag&&(
      <DiaryForm diary={diaryInfo}></DiaryForm>)}
    </div>
  );
};

export default DiaryDetail;