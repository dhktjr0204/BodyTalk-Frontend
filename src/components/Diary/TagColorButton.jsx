import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const TagButton = styled.button`
    background-color: ${props => props.color};
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    margin-right: 0.5rem;
    margin: 5px;   &:hover {
        /* 클릭시 아래로 미세하게 움직임 */
        transform: translateY(3px);
    }
`;

const TagColorButton = ({tags}) =>{
    const type = {
        "머리": ["두통", "어지러움","탈모","강박증","인지장애"],
        "기관지": ["코막힘", "재채기","콧물","가래","구내염"],
        "가슴":["가슴 통증", "가슴 답답", "호흡 곤란", "천식", "잦은 딸국질", "과호흡"],
        "배":["구토","복부통증","소화불량","설사"],
        "팔다리":["관절통","어깨 통증","팔 통증","다리 통증","무릎 통증","외상","저림"],
        "피부":["여드름","각질","홍조","반점","습진"]
    };

    const tagColors = {
        머리: "#ed9c9d",//빨강
        기관지: "#ffc689",//주황
        가슴: "#edec9c",//노랑
        배: "#c4f1c7",//초록
        팔다리: "#c4d9f1",//파랑
        피부: "#ebc8fb"//보라
    };
    //타입 별로 색깔 정함
    const filteredTags = Object.keys(tagColors).filter(category =>
        tags.some(tag => type[category].includes(tag))
    );

    return (
        <div>
            {filteredTags.map(category => (
                //타입별로 컬러 바꿈
                <TagButton key={category} color={tagColors[category]}>
                    {tags.find(tag => type[category].includes(tag))}
                </TagButton>
            ))}
        </div>
    );

}

export default TagColorButton;