import { useLocation } from "react-router-dom";
import React, { useState } from 'react';
import styled from 'styled-components';
import MyPageUpdateButton from "components/MyPage/MyPageUpdateButton";
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

const MyPageUpdate = () => {
    const location = useLocation();
    const {userInfo} = location.state;

    const [updatedUserInfo, setUpdatedUserInfo] = useState(userInfo);

    // 각 input의 값을 변경할 때마다 updatedUserInfo를 업데이트
    const handleNameChange = (e) => {
    setUpdatedUserInfo((prevState) => ({
        ...prevState,
        name: e.target.value,
    }));
    };

    const handleSexChange = (e) => {
    setUpdatedUserInfo((prevState) => ({
        ...prevState,
        sex: e.target.value,
    }));
    };

    const handleAgeChange = (e) => {
    setUpdatedUserInfo((prevState) => ({
        ...prevState,
        age: e.target.value,
    }));
    };

    return(
        <div>
            <br></br><br></br><br></br>
            <DefaultMenu></DefaultMenu>
            <MypageWrapper>
                <form>
                    <label>
                        닉네임:
                        <input type="text" value={updatedUserInfo.name} onChange={handleNameChange} />
                    </label>
                    <br />
                    <label>
                        이메일:
                        <input type="text" value={userInfo.email} readOnly />
                    </label>
                    <br />
                    <label>
                        성별:
                        <select value={updatedUserInfo.sex} onChange={handleSexChange}>
                        <option value=""></option>
                        <option value="male">남자</option>
                        <option value="female">여자</option>
                        </select>
                    </label>
                    <br />
                    <label>
                        나이:
                        <input type="number" value={updatedUserInfo.age} onChange={handleAgeChange} />
                    </label>
                    <br />
                </form>
                 {/* MyPageUpdateButton 컴포넌트를 렌더링하면서 updatedUserInfo를 prop으로 전달 */}
                <MyPageUpdateButton userInfo={updatedUserInfo} />
            </MypageWrapper>
           
          </div>
    );

}

export default MyPageUpdate; 