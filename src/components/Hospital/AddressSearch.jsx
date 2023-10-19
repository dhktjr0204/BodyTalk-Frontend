import { useState } from 'react';
import axios from 'axios';

const AddressSearch = ({ setUserLocation, setClickHospital }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchSubmit = (e) => {
    //새로고침안하게
    e.preventDefault();
    // 주소를 좌표로 변환하는 API 요청 보내기
    axios.post(`/api/hospital/coordi?local=${searchValue}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.lon!==0){
          //지금 병원을 클릭한 상태라면 현재 위치가 병원으로 되어있기때문에 초기화 시켜줘야함
          //병원을 클릭하지 않은 상태일때만 내 위치가 중심이됨
          setClickHospital(null);
          setUserLocation({
            lat: res.data.lat,
            lng: res.data.lon
          });
        }else{
          alert("주소를 정확히 입력해주세요. (도로명 및 지번주소)")
        }
      })
      .catch((err) => {
        console.log(err);
        alert("불러오기에 실패하였습니다.");
      });
  };


  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <input type="text" value={searchValue} onChange={handleInputChange} placeholder="주소를 입력해주세요"/>
      <button type="submit">검색</button>
    </form>
  );
};

export default AddressSearch;