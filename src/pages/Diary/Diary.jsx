import { DiaryMenu } from 'components/MenuBar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
import moment from "moment";
import DiaryBoard from 'components/Diary/DiaryBoard';
import styled from 'styled-components';
import CalenderForm from 'components/Diary/CalendarForm';
import { remove } from 'react-cookies';

const DiaryCalendarWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 55vh;
`;
const ChartWrapper = styled.div`
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ChartButton = styled.button`
    padding: 8px 16px;
    background-color: #0077c2;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 16px;
`;

const Diary = () => {
    const [date, setDate] = useState(new Date());
    const [isClicked, setIsClicked] = useState(false);
    const [mark, setMark] = useState([]);
    const [diarys, setDiarys]= useState([]);
    const navigate= useNavigate();

    //날짜를 클릭했을 때 우측에 일기 목록 보여주기
    //같은 날짜 두번 클릭하면 화면 꺼짐
    const onClickDate = (value) => {
        if (isClicked && moment(date).isSame(value, "day")) {
            setIsClicked(false);
          } else {
            setIsClicked(true);
            setDate(value);
          }
    }

    const onClickChart = () => {
        navigate("/diary/chart");
    }

    useEffect(() => {
        if (sessionStorage.getItem("accessToken")) {
            axios({
                method: "GET",
                url: `/api/diary`,
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("accessToken")
                }
            })
            .then((res) => {
                console.log(res.data);
                setDiarys(res.data);
            })
            .catch((err) => {
                alert("불러오기에 실패하였습니다.");

                //만약 로그인 시간이 만료된다면 이 오류띄움
                if (err.response && err.response.status === 401) {
                    alert("로그인이 만료되어 로그아웃합니다.");
                    sessionStorage.removeItem("accessToken");
                    remove('JSESSIONID');//쿠키삭제
                    navigate("/");
                } else {
                    alert("불러오기에 실패하였습니다.");
                }

                console.log("데이터 가져오기 에러", err);
            });

        } else {
            alert("로그인이 필요한 서비스입니다.");
            navigate("/");
        }
    }, []);

    //데이터 정제
    useEffect(() => {
        const diaryDatas = diarys.map((item) => {
            const { id, content, date, tag } = item;
            return {
            id,
            content,
            date: moment(date).format('YYYY-MM-DD'),
            tag: tag.join(", "),
            };
        });
        const marks = diaryDatas.map((item) => item.date);
        setMark(marks);
        }, [diarys]);

//mark는 사용자가 적은 일기의 날짜들이 저장되어 있음
   return (
    <div>
        <br></br><br></br><br></br>
        <DiaryMenu></DiaryMenu>
        <h1>증상 일기 쓰기</h1>
        
        <DiaryCalendarWrapper>
            <CalenderForm onChange={onClickDate} date={date} mark={mark} />
            {isClicked && <DiaryBoard date={date} diarys={diarys} />}
        </DiaryCalendarWrapper>
        <ChartWrapper>
            <ChartButton onClick={onClickChart}>통계 보기</ChartButton>
        </ChartWrapper>
       
    </div>
);
}

export default Diary;