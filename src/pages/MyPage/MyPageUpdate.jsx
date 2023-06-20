import { useLocation } from "react-router-dom";
import React, { useState } from 'react';
import styled from 'styled-components';
import MyPageUpdateButton from "components/MyPage/MyPageUpdateButton";
import DefaultMenu from 'components/MenuBar/DefaultMenu';
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
    background: linear-gradient(to right, ${oc.teal[6]}, ${oc.cyan[5]});
    -webkit-background-clip: text; /* Safari */
    -webkit-text-fill-color: transparent; /* Safari */
`;

const MypageWrapper = styled.div`
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
            <Text>마이페이지</Text>
            <MypageWrapper>
                <h2>정보수정</h2>
                <form>
                <table>
                    <tbody>
                        <tr>
                            <td style={{ paddingRight: '10px' }}>닉네임</td>
                            <td style={{ paddingLeft: '10px' }}>
                                <input type="text" value={updatedUserInfo.name} onChange={handleNameChange} />
                            </td>
                        </tr>
                        <tr><br></br></tr>
                        <tr>
                            <td style={{ paddingRight: '10px' }}>이메일</td>
                            <td style={{ paddingLeft: '10px' }}>
                                <input type="text" value={userInfo.email} readOnly />
                            </td>
                        </tr>
                        <tr><br></br></tr>
                        <tr>
                            <td style={{ paddingRight: '10px' }}>성별</td>
                            <td style={{ paddingLeft: '10px' }}>
                                <select value={updatedUserInfo.sex} onChange={handleSexChange}>
                                <option value=""></option>
                                <option value="male">남자</option>
                                <option value="female">여자</option>
                                </select>
                            </td>
                        </tr>
                        <tr><br></br></tr>
                        <tr>
                            <td style={{ paddingRight: '10px' }}>나이</td>
                            <td style={{ paddingLeft: '10px' }}>
                                <input type="number" value={updatedUserInfo.age} onChange={handleAgeChange} />
                            </td>
                        </tr>
                    </tbody>
                    </table>
                    <br />
                </form>
                 {/* MyPageUpdateButton 컴포넌트를 렌더링하면서 updatedUserInfo를 prop으로 전달 */}
                <MyPageUpdateButton userInfo={updatedUserInfo} />
            </MypageWrapper>
           
          </div>
    );

}

export default MyPageUpdate; 