import axios from 'axios';
import { HospitalMenu } from 'components/MenuBar';
import React, { useEffect, useState } from 'react';

const Hospital = () =>{
    const [hospitals, setHospitals] = useState([]);
    const [userLocation, setUserLocation] = useState(null);


    useEffect(() => {
      const getLocation = async () => {
        try {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        } catch (error) {
          console.log(error);
        }
      };
      getLocation();
   
    }, []);
       console.log(userLocation);

    const handleButtonClick = () => {
      const data = {
        type:"내과",
        lat: userLocation.lat,
        lon: userLocation.lng};
      console.log("보내는 데이터 확인",data);
      axios.post(`/api/hospital`,data)
        .then((res) => {
          console.log(res.data);
          setHospitals(res.data);
        })
        .catch((err) => {
          console.log(err);
          alert("불러오기에 실패하였습니다.");
        });
    }

    return (
        <div>
            <br></br><br></br><br></br>
            <HospitalMenu></HospitalMenu>
            <button onClick={handleButtonClick}>병원찾기</button>
        </div>
    );
}

export default Hospital;