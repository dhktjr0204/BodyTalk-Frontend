import React, { useEffect, useState } from "react";
import { Container as MapDiv, NaverMap, NavermapsProvider,  Marker} from "react-naver-maps";
import SelectedHospital from 'lib/img/selected_hospital.png';
import Hospital from 'lib/img/hospital.png';

export const NaverMapAPI = (props) => {
    const [selectedHospital, setSelectedHospital] = useState(null);

    const handleMarkerClick = ( hospital) => {
        // 클릭한 마커에 대한 정보를 selectedHospital에 저장(클릭한 마커 정중앙 배치)
        setSelectedHospital(hospital);
        //마커 클릭 시 병원 정보 창에도 무슨 병원을 클릭했는지 전달(병원정보창 가운데에 배치하기 위해)
        props.setClickHospital(hospital);

    };

    //병원 정보창에서 병원 클릭시 해당 병원 맵 가운데로 배치
    useEffect(() => {
        setSelectedHospital(props.clickHospital);
      }, [props.clickHospital]);


    return (
        <NavermapsProvider
            ncpClientId={process.env.REACT_APP_NAVERMAP_API}
            submodules={["geocoder"]}
        >
            <MapDiv style={{width: '50%',height: '500px'}}>
                <NaverMap 
                    center={
                        selectedHospital
                        ?{lat: selectedHospital.wgs84Lat,lng: selectedHospital.wgs84Lon}:{ lat: props.Latitude, lng: props.Longtitude }
                      }
                    defaultZoom={15}
                >
                {/* 내 위치 마커 */}
                {props.hospitals.length > 0 && (
                <Marker position={{ lat: props.Latitude, lng: props.Longtitude }} title="내 위치"/>
                )}
                {/* 병원 마커 */}
                {props.hospitals.map((hospital) => (
                    <Marker 
                        key={hospital.id} 
                        position={{ lat: hospital.wgs84Lat, lng: hospital.wgs84Lon }}
                        title={hospital.dutyName}
                        
                        icon={selectedHospital&&selectedHospital.id===hospital.id?
                            {url: SelectedHospital, scaledSize: new window.naver.maps.Size(50, 50)}
                            :{url: Hospital, scaledSize: new window.naver.maps.Size(50, 50)}}

                        onClick={() => handleMarkerClick(hospital)} />
                ))}
                </NaverMap>
            </MapDiv>
        </NavermapsProvider>
    );
    };

export default NaverMapAPI;