import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


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
                    Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
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
            <h1>가입을 축하합니다!</h1>
            <div>
                <input value={nameInputText} onChange={(event) => setNameInputText(event.target.value)} placeholder="닉네임을 입력해주세요"/>
            </div>
            <div>
                <select value={sex} onChange={(event) => setSex(event.target.value)}>
                    <option value="">성별을 선택해주세요</option>
                    <option value="male">남자</option>
                    <option value="female">여자</option>
                </select>
            </div>
            <div>
                <input type="number" value={ageInputText} onChange={(event) => setAgeInputText(event.target.value)} placeholder="나이를 입력해주세요"/>
            </div>
            <button onClick={handleSave}>확인</button>
        </div>
        
    );
}

export default Join;