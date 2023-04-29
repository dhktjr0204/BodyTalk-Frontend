import React, { useState } from "react";
import { Container as MapDiv, NaverMap, NavermapsProvider,  Marker} from "react-naver-maps";

export const NaverMapAPI = (props) => {
    return (
        // 검색을 하고싶은 경우 submodules 로써 geocoder를 꼭 추가해줘야한다.
        <NavermapsProvider
            ncpClientId={process.env.REACT_APP_NAVERMAP_API}
            submodules={["geocoder"]}
        >
            <MapDiv style={{width: '50%',height: '500px',}}>
                <NaverMap 
                    center={{lat:props.Latitude, lng:props.Longtitude}}
                    defaultZoom={15}
                >
                {props.hospitals.length>0&& (
                    <Marker position={{ lat: props.Latitude, lng: props.Longtitude }} title="내 위치"/>)}
                </NaverMap>
            </MapDiv>
        
        </NavermapsProvider>
    );
    };

export default NaverMapAPI;