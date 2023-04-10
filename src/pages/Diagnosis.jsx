import axios from 'axios';
import DiagnosisDetail from 'components/Diagnosis/DiagnosisDetail';
import { DiagnosisMenu } from 'components/MenuBar';
import React, { useState } from 'react';

const Diagnosis = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState("");
  const [diagnosis, setDiagnosis] = useState(null); 

  const handleSubmit = (event) => {
      event.preventDefault();
      const formData=new FormData();
      formData.append("content",inputText)

      console.log(inputText)

      if (inputText == "") alert("내용을 입력해주세요");
      else{

        setIsLoading(true);

        if (!sessionStorage.getItem("accessToken")) {
            axios
              .post(`/api/medi`, formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((res) => {
                console.log(res.data);
                setDiagnosis(res.data);
                setIsLoading(false);
              })
              .catch((err) => {
                console.log("진단 post 에러", err);
              });
          } else {
            axios
              .post(`/api/medi`, formData, {
                headers: {
                  Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((res) => {
                console.log(res.data);
                setDiagnosis(res.data);
                setIsLoading(false);
              })
              .catch((err) => {
                console.log("진단 post 에러", err);
              });
          }
      }
  };
  if (diagnosis){
    return(
    <div>
      <br></br><br></br><br></br>
      <DiagnosisMenu></DiagnosisMenu>
      <div>
        <DiagnosisDetail diagnosis={diagnosis} />
      </div>
    </div>
    )
  }
  return (
  <div>
    <br></br><br></br><br></br>
    <DiagnosisMenu></DiagnosisMenu>
    <div>
      {isLoading ? (
          <div>
          <span>Loading...</span>
        </div>
        ):(
        <form onSubmit={handleSubmit}>
        <p>BodyTalk</p>
        <input value={inputText} onChange={(event) => setInputText(event.target.value)}></input>
        <button type="submit">진단받기</button>
         </form>)}
    </div>
</div>
);
};

export default Diagnosis;