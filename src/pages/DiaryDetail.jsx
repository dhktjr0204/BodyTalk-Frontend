import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { DiaryMenu } from 'components/MenuBar';
import DiaryForm from 'components/Diary/DiaryForm';


const DiaryDetail = () => {
  const [diaryInfo, setDiaryInfo] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios.get(`/api/diary/${id}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        console.log(res.data);
        setDiaryInfo(res.data);
      })
      .catch((err) => {
        alert("불러오기에 실패하였습니다.");
        console.log("데이터 가져오기 에러", err);
      });
  }, [id]);

  return (
    <div>
      <br />
      <br />
      <br />
      <DiaryMenu />
      {diaryInfo.tag&&(
      <DiaryForm diary={diaryInfo}></DiaryForm>)}
    </div>
  );
};

export default DiaryDetail;