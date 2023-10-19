import { DiaryMenu } from 'components/MenuBar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
import moment from "moment";
import oc from 'open-color';
import DiaryBoard from 'components/Diary/DiaryBoard';
import styled from 'styled-components';
import CalenderForm from 'components/Diary/CalendarForm';
import { remove } from 'react-cookies';

const DiaryCalendarWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
`;

const CalendarFormWrapper = styled.div`
    width: 58%;
    height: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px; 

    transform: ${({isClicked}) => isClicked ? 'translateX(-155px)' : 'translateX(0)'};
    transition: transform 1s ease-in-out;
`;

const ChartWrapper = styled.div`
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Text = styled.div`
    font-size: 30px;
    color: transparent;
    letter-spacing: 1px;
    fontFamily: '나눔 고딕', sans-serif;
    width: 80%;
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 20px;
    font-weight: bold;
    background: linear-gradient(to right, ${oc.teal[6]}, ${oc.cyan[5]});
    -webkit-background-clip: text; /* Safari */
    -webkit-text-fill-color: transparent; /* Safari */
`;

const BoardWrapper = styled.div`
    position: fixed;
    right: -100%;
    margin: 0 auto;
    width: 30%; 
    height: 70%;
    background-color: white;
    padding: 10px 10px;
    overflow-y: scroll;
    border-radius: 16px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
    transition: right 1s ease;

    &.isClicked {
        right: 0;
    }
`;

const Button = styled.button`
  padding: 8px 50px;
  color: #FFFFFF;
  border: none;
  border-radius: 10px;
  font-size: 20px;
  cursor: pointer;
  margin-top: 16px;
  background: linear-gradient(to right, ${oc.teal[6]}, ${oc.cyan[5]});

  &:hover {
    /* 클릭시 아래로 미세하게 움직임 */
    transform: translateY(3px);
}
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
        if (localStorage.getItem("accessToken")) {
            axios({
                method: "GET",
                url: `/api/diary`,
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("accessToken")
                }
            })
            .then((res) => {
                console.log(res.data);
                setDiarys(res.data);
            })
            .catch((err) => {
                alert("불러오기에 실패하였습니다.");
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

    useEffect(() => {
        console.log("isClicked changed:", isClicked);
    }, [isClicked]);
        

//mark는 사용자가 적은 일기의 날짜들이 저장되어 있음
   return (
    <div>
        <br></br><br></br><br></br>
        <DiaryMenu></DiaryMenu>
        <Text>증상 일기 쓰기</Text>
        
        <DiaryCalendarWrapper>
            <CalendarFormWrapper isClicked={isClicked}>
                <CalenderForm onChange={onClickDate} date={date} mark={mark} />
            </CalendarFormWrapper>
            <BoardWrapper className={isClicked && "isClicked"}>
                {isClicked && <DiaryBoard date={date} diarys={diarys} />}
            </BoardWrapper>
        </DiaryCalendarWrapper>
        <ChartWrapper>
            <Button onClick={onClickChart}>통계 보기</Button>
        </ChartWrapper>
       
    </div>
);
}

export default Diary;