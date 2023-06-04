import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Wrapper = styled.div`
    margin: 20px;
`;

const WrapBox = styled.div`
    border: 2px solid #CACACA;
    border-top-color: white;
    margin: 0px;
`;

//선택 안된 태그
const TagWrapper = styled.div`
    font-family: 'NanumGothic'; 
    display: inline-block;
    padding: 10px 20px;
    margin-right: 4px;
    border-radius: 8px;
    font-size: 16px;
    border: 1px solid #8E8E8E;
`;

//부위(머리 기관지) 태그 스타일
const TypeWrapper = styled.button`
    width: calc(16.666%);
    background-color: ${({ selected }) => (selected ? "#FFFFFF" : "#EDF0F3")};
    border: ${({ selected }) =>
    selected ? "2px solid #CACACA" : "none"};
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin-right: 0px;
    margin-bottom: 0px;
    cursor: pointer;
    border-radius: ${({ selected }) => selected ? "10px 10px 0 0" : "10px 10px 0 0"};
    border-bottom: none;
    &:hover {
    background-color: ${({ selected }) => (selected ? "#AE7AB1" : "#FFFFFF")};
    }
`;

//선택됐을때 태그 색
const TagSelectWrapper = styled.div`
    font-family: 'NanumGothic';
    display: inline-block;
    color: white;
    background: linear-gradient(to right, ${oc.green[4]}, ${oc.teal[5]});
    padding: 10px 20px;
    margin-right: 4px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    &:hover {
        background-color: #919191;
    }
`;

const TText = styled.div`
  font-family: 'NanumGothic';
  font-size: 25px;
  margin-top: 50px;
  margin-bottom: 20px;
  text-align: center;
  span {
    margin: 0 8px;
  }
`;

const TagHeader = ({diary, setDiary}) =>{
    const [currentType, setCurrentType] = useState("머리");
    const [selectedTags, setSelectedTags] = useState(diary.tag);

    const type = {
        "머리": ["두통", "어지러움","탈모","강박증","인지장애"],
        "기관지": ["코막힘", "재채기","콧물","가래","구내염"],
        "가슴":["가슴 통증", "가슴 답답", "호흡 곤란", "천식", "잦은 딸꾹질", "과호흡"],
        "배":["구토","복부통증","소화불량","설사"],
        "팔다리":["관절통","어깨 통증","팔 통증","다리 통증","무릎 통증","외상","저림"],
        "피부":["여드름","각질","홍조","반점","습진"]
    };
    
    //tag가 달라질때마다 setDiary해서 바꿔준다.
    useEffect(() => {
        setDiary((prevDiary) => ({ ...prevDiary, tag: selectedTags }));
      }, [selectedTags]);

    //현재 선택한 type을 바꿔준다.
    const handleTypeClick = (type) => {
      setCurrentType(type);
    };

    //태그를 선택하거나 해제할 때마다 selectedTags 업데이트
    const handleTagClick = (tag) => {
        //이미 태그가 선택된 상태라면 제거
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
        }
        //초기화 버튼 누르면 초기화
        else if (tag === "clear"){
            setSelectedTags([]);
        }
        //아니라면 선택된 태그 리스트 에 추가
        else {
            if (selectedTags.length>=5){
                alert("태그는 5개까지만 선택가능합니다.");}
            else{setSelectedTags([...selectedTags, tag]);}
        }
    };    


    return (
        <Wrapper>
            <div>
                {Object.entries(type).map(([tagType]) => (
                    <TypeWrapper
                        key={tagType}
                        onClick={() => handleTypeClick(tagType)}
                        selected={currentType === tagType}
                        style={{
                        backgroundColor:
                            currentType === tagType ? "#FFFFFF" : "#EDF0F3",
                    }}>{tagType}
                    </TypeWrapper>
             ))}
            </div>
            <WrapBox>
            <TText>태그를 선택해주세요! 5개까지 선택가능합니다.</TText>
                {currentType && (
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: "50px" }}>
                        <ul>
                            {type[currentType].map((tag) =>  {
                                //선택된 tag 색깔 바꿔주기
                                const isTagSelected = selectedTags.includes(tag);
                                return isTagSelected ? (
                                    <TagSelectWrapper key={tag} onClick={() => handleTagClick(tag)}>
                                        {tag}
                                    </TagSelectWrapper>
                                ) : (
                                    <TagWrapper key={tag} onClick={() => handleTagClick(tag)}>
                                        {tag}
                                    </TagWrapper>
                                );
                                })}
                        </ul>
                    </div>
                    )}  

                <div style={{ borderTop: "2px solid #CACACA", padding: "16px", display: "flex", justifyContent: "center" }}>
                    <h2>선택한 태그들</h2>
                    <ul>
                        {selectedTags.map((tag) => (
                            <TagSelectWrapper key={tag} onClick={() => handleTagClick(tag)}>
                                {tag}
                            </TagSelectWrapper>
                        ))}

                        <TagWrapper onClick={() => handleTagClick("clear")} style={{ color: 'white  ', background: 'red', fontWeight: 'bold' }}> 초기화 </TagWrapper>
                    </ul>
                    
                </div>
            </WrapBox>

        </Wrapper> 
        );
}

export default TagHeader;