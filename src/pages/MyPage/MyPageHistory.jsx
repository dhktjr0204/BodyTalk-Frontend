import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import MyPageDeleteButton from 'components/MyPage/MyPageDeleteButton';
import { remove } from 'react-cookies';
import DefaultMenu from 'components/MenuBar/DefaultMenu';


const MypageWrapper = styled.div`
  width: 60%;
  margin: auto;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  margin-bottom: 24px;
`;

const HistoryWrapper = styled.div`
  width: 100;
  margin: auto;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  margin-bottom: 24px;
`;

const MyPageHistory = () => {
    const [contents, setContents] = useState([]);
    const [name, setName]=useState("");

    const navigate= useNavigate();

    const handleHistoryClick = (id) => {
      navigate(`/mypage/${id}`);
    }

    useEffect(() => {
        axios({
            method: "GET",
            url: `/api/mypage/contents`,
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("accessToken")
            }
        })
        .then((res) => {
            console.log(res.data);
            //contents를 날짜 기준으로 내림차순으로 정렬
            const sortedContents = res.data.content.sort((a, b) => new Date(b.date) - new Date(a.date));
            setName(res.data.name);
            setContents(sortedContents);
        })
        .catch((err) => {
            if (err.response && err.response.status === 401) {
                alert("로그인이 만료되어 로그아웃합니다.");
                sessionStorage.removeItem("accessToken");
                remove('JSESSIONID');//쿠키삭제
                navigate("/");
            } else {
                alert("불러오기에 실패하였습니다.");
            }
        });
    }, []);

    //날짜별로 content모으기
    const contentsByDate = contents.reduce((acc, content) => {
        const { id, date, content: contentText, disease } = content;
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push({id, content: contentText, disease});
        return acc;
      }, {});



    return(
        <div>
            <br></br><br></br><br></br>
            <DefaultMenu></DefaultMenu>
            <MypageWrapper>
                <h1>{name}님의 최근 진료 기록</h1>
                <br/>
                {Object.entries(contentsByDate).map(([date, contentList], index) => (
                    <div key={index}>
                        <h1 style={{color: "#4576F6"}}>{date}</h1>

                        {contentList.map((content, idx) => (
                            <HistoryWrapper key={idx} onClick={() => handleHistoryClick(content.id)}>
                                <MyPageDeleteButton id={content.id}></MyPageDeleteButton>
                                <h2>{content.content}</h2>
                                <h3>{content.disease}</h3>
                            </HistoryWrapper>
                        ))}
                    </div>
                 ))}
            </MypageWrapper>
          </div>

    );
}

export default MyPageHistory; 