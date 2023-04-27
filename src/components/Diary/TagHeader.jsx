import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    margin: 20px;
`;

//선택 안된 태그
const TagWrapper = styled.div`
  display: inline-block;
  padding: 10px 20px;
  margin-right: 4px;
  border-radius: 8px;
  font-size: 16px;
  border: 1px solid #8E8E8E;
`;

//부위(머리 기관지) 태그 스타일
const TypeWrapper = styled.button`
  background-color: #CFBAD0;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #3e8e41;
  }
`;

//선택됐을때 태그 색
const TagSelectWrapper = styled.div`
  display: inline-block;
  background-color: #BBBBBB;
  padding: 10px 20px;
  margin-right: 4px;
  border-radius: 8px;
  font-size: 16px;
  &:hover {
    background-color: #919191;
  }
`;

const TagHeader = ({diary, setDiary}) =>{
    const [currentType, setCurrentType] = useState("");
    const [selectedTags, setSelectedTags] = useState(diary.tag);

    const type = {
        "머리": ["두통", "어지러움","탈모","강박증","인지장애"],
        "기관지": ["코막힘", "재채기","콧물","가래","구내염"],
        "가슴":["가슴 통증", "가슴 답답", "호흡 곤란", "천식", "잦은 딸국질", "과호흡"],
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
                alert("태그는5개까지만 선택가능합니다.");}
            else{setSelectedTags([...selectedTags, tag]);}
        }
    };    


    return (
        <Wrapper>
            <div>
                <h1>태그를 선택해주세요! 5개까지 선택가능합니다.</h1>
                {Object.entries(type).map(([tagType]) => (
                    <TypeWrapper
                        key={tagType}
                        onClick={() => handleTypeClick(tagType)}
                        style={{
                        backgroundColor:
                            currentType === tagType ? "#AE7AB1" : "#CFBAD0",
                    }}>{tagType}
                    </TypeWrapper>
             ))}
            </div>

            {currentType && (
                <div>
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

            <div style={{ borderTop: "1px solid black", paddingTop: "16px" }}>
                <h2>선택한 태그들</h2>
                {selectedTags.map((tag) => (
                    <TagSelectWrapper key={tag} onClick={() => handleTagClick(tag)}>
                        {tag}
                    </TagSelectWrapper>
                ))}

                <TagWrapper onClick={() => handleTagClick("clear")}> 초기화 </TagWrapper>
            </div>
        </Wrapper> 
        );
}

export default TagHeader;