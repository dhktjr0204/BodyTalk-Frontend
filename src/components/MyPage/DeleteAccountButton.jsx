import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { remove } from 'react-cookies';

const DeleteButton = styled.div`
  width: 60%;
  cursor: pointer;
  margin: auto;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  margin-bottom: 24px;
`;

//경고창인데 gpt에서 긁어온거라 잘 모르겠음 네모안에 더 넣는 그런거인듯;;
const ConfirmDialog = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 16px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  z-index: 9999;

  h2 {
    margin-top: 0;
  }

  p {
    margin-bottom: 20px;
  }

  button {
    margin-right: 10px;
    cursor: pointer;
    border: none;
    background-color: #0077cc;
    color: #fff;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 16px;
  }

  button.cancel {
    background-color: #ccc;
    color: #000;
  }
`;


const DeleteAccountButton = ({ isLoggedIn, setIsLoggedIn }) =>{
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const navigate= useNavigate();
    
    //탈퇴 완료되면 홈으로 돌아가기
    const onDeleteAccountComplete = () => {
        setIsLoggedIn(false);
        navigate(`/`);
    };

    //네를 누르면 탈퇴함
    const handleConfirmYes = () => {
        setShowConfirmDialog(false);
        handleDelete();
      };
    
    //아니요를 누르면 그냥 경고창 꺼짐
    const handleConfirmNo = () => {
      setShowConfirmDialog(false);
    };

    const handleDelete = () =>{
        axios
            .put(`/api/delete`, null, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
            },
            })
            .then((res) => {
                console.log(res);
                alert("탈퇴가 완료되었습니다.");
                onDeleteAccountComplete();
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
                console.log("탈퇴 에러", err);
            });
    }

    return(
        <>
        {showConfirmDialog && (
          <ConfirmDialog>
            <div>정말로 탈퇴하시겠습니까?</div>
            <button onClick={handleConfirmYes}>네</button>
            <button onClick={handleConfirmNo}>아니오</button>
          </ConfirmDialog>
        )}
        <DeleteButton onClick={() => setShowConfirmDialog(true)}>탈퇴하기</DeleteButton>
      </>
    )
}
export default DeleteAccountButton;