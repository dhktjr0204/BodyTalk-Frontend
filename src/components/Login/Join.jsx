import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import oc from 'open-color';

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
    text-align: center;
    background: linear-gradient(to right, ${oc.teal[6]}, ${oc.cyan[5]});
    -webkit-background-clip: text; /* Safari */
    -webkit-text-fill-color: transparent; /* Safari */
`;

const Wrapper = styled.div`
    font-size: 20px;
    font-family: 'NanumGothic', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 30%;
    margin: auto;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 0px 24px;
    padding-bottom: 24px;
    border-radius: 16px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
    margin-bottom: 24px;

    input[type="text"],
    input[type="number"],
    select {
        width: 100%;
        font-size: inherit;
    }
`;

const Button = styled.button`
    padding: 8px 30px;
    color: #FFFFFF;
    border: none;
    border-radius: 10px;
    font-size: 20px;
    cursor: pointer;
    margin-top: 10px;
    background: linear-gradient(to right, ${oc.teal[6]}, ${oc.cyan[5]});
    align: center;

    &:hover {
    /* 클릭시 아래로 미세하게 움직임 */
    transform: translateY(3px);
    }
`;


const Join = ({ isLoggedIn, setIsLoggedIn }) => {
    const [nameInputText, setNameInputText] = useState("");
    const [sex, setSex] = useState("");
    const [ageInputText, setAgeInputText] = useState("");

    const navigate= useNavigate();  

    const handleSave = () =>{
        if (nameInputText.length === 0) alert("닉네임을 정해주세요");
        else if (sex.length === 0) alert("성별을 선택해주세요");
        else if (ageInputText.length === 0 || isNaN(ageInputText)) alert("나이를 숫자로 입력해주세요");
        else {
            const data = {
                name: nameInputText,
                sex: sex,
                age: ageInputText
              };
            axios
                .post(`/api/mypage/update`, data, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("accessToken"),
                },
                })
                .then((res) => {
                    console.log(res);
                    alert("가입이 완료되었습니다.");
                    setIsLoggedIn(true);
                    navigate(`/`);
                })
                .catch((err) => {
                    console.log("마이페이지 post 에러", err);
                });
        }
    };

    return (
        <div>
            <br></br><br></br><br></br>
            <Text>가입을 축하합니다!</Text>
            <Wrapper>
                <h2>정보입력</h2>
                <form>
                    <table>
                        <tbody>
                            <tr>
                                <td style={{ paddingRight: '10px' }}>닉네임</td>
                                <td style={{ paddingLeft: '10px' }}>
                                    <input type="text" value={nameInputText} onChange={(event) => setNameInputText(event.target.value)} placeholder="닉네임을 입력해주세요"/>
                                </td>
                            </tr>
                            <tr><br></br></tr>
                            <tr>
                            <td style={{ paddingRight: '10px' }}>성별</td>
                            <td style={{ paddingLeft: '10px' }}>
                                <select value={sex} onChange={(event) => setSex(event.target.value)}>
                                    <option value="">성별을 선택해주세요</option>
                                    <option value="male">남자</option>
                                    <option value="female">여자</option>
                                </select>
                            </td>
                            </tr>
                            <tr><br></br></tr>
                            <tr>
                                <td style={{ paddingRight: '10px' }}>나이</td>
                                <td style={{ paddingLeft: '10px' }}>
                                    <input type="number" value={ageInputText} onChange={(event) => setAgeInputText(event.target.value)} placeholder="나이를 입력해주세요"/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                </form>
                <Button onClick={handleSave}>확인</Button>
            </Wrapper>
        </div>
        
        
    );
}

export default Join;