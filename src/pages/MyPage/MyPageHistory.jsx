import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import MyPageDeleteButton from 'components/MyPage/MyPageDeleteButton';
import { remove } from 'react-cookies';
import DefaultMenu from 'components/MenuBar/DefaultMenu';
import oc from 'open-color';


const MypageWrapper = styled.div`
  width: 79%;
  margin: auto;
  padding: 0px;
  border-radius: 16px;
  margin-bottom: 24px;
`;

const DayWrapper = styled.div`
  font-weight: normal;
  width: 99%;
  margin: auto;
  cursor: pointer;
  font-family: 'NanumGothic', sans-serif;
  border-left: 4px solid;
  border-image: linear-gradient(to bottom, ${oc.teal[6]}, ${oc.cyan[5]});
  border-image-slice: 1;
  padding: 10px 24px;
`;

const HistoryWrapper = styled.div`
  position: relative;
  width: 100;
  margin: auto;
  padding: 5px;
  border-radius: 16px;
  margin-bottom: 24px;
  border: 2px solid gray;

  &:hover::after {
    content: '상세보기';
    position: absolute;
    top: -25px;
    right: 0;
    padding: 4px 8px;
    background: linear-gradient(to right, ${oc.teal[6]}, ${oc.cyan[5]});
    color: #fff;
    border-radius: 4px;
    font-size: 12px;


  }
`;

const Text = styled.div`
    font-size: 30px;
    color: transparent;
    letter-spacing: 1px;
    font-family: 'NanumGothic', sans-serif;
    width: 80%;
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 20px;
    font-weight: bold;
    background: linear-gradient(to right, ${oc.teal[6]}, ${oc.cyan[5]});
    -webkit-background-clip: text; /* Safari */
    -webkit-text-fill-color: transparent; /* Safari */
`;

const Disease = styled.h2`
  font-weight: normal;
`;

const Content = styled.h3`
  font-weight: normal;
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
            <Text>최근 진료 기록</Text>
            <MypageWrapper>
                {Object.entries(contentsByDate).map(([date, contentList], index) => (
                    <div key={index}>
                        <h1 style={{color: "#000000"}}>{date}</h1>
                        <DayWrapper>
                        {contentList.map((content, idx) => (
                            <HistoryWrapper key={idx} onClick={() => handleHistoryClick(content.id)}>
                                <MyPageDeleteButton id={content.id}></MyPageDeleteButton>
                                <Disease>{content.disease}</Disease>
                                <Content>{content.content}</Content>
                            </HistoryWrapper>
                        ))}
                        </DayWrapper>
                    </div>
                 ))}
            </MypageWrapper>
          </div>

    );
}

export default MyPageHistory; 