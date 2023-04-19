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
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        console.log(res.data);
        setDiaryInfo(res.data);
      })
      .catch((err) => {
        //만약 로그인 시간이 만료된다면 이 오류띄움
        if (err.response && err.response.status === 401) {
          alert("로그인이 만료되어 로그아웃합니다.");
          sessionStorage.removeItem("accessToken");
          remove('JSESSIONID');//쿠키삭제
          navigate("/");
        } else {
          alert("불러오기에 실패하였습니다.");
        }
      });
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