import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//refresh token api
export default function TokenRefresher() {
    const navigate = useNavigate();

    useEffect(()=>{
        const interceptor = axios.interceptors.response.use(
            function (response) {
                return response;
            },
            async function (error) {
                const originalConfig = error.config;
                const msg = error.response.data.jwtToken;
                const status = error.response.status;
                const data={
                    accessToken: localStorage.getItem("accessToken"),
                    refreshToken: localStorage.getItem("refreshToken"),
                }
                if (status === 401) {
                    if (msg === "유효하지 않은 토큰입니다") {
                        try{
                            // refreshToken으로 새로운 accessToken 갱신
                            const res = await axios.post("/api/token", data);
                            localStorage.setItem("accessToken",res.data.result.accessToken);
                            originalConfig.headers["Authorization"] ="Bearer " + res.data.result.accessToken;
                            // 갱신된 accessToken으로 원래 요청 재시도
                            return axios(originalConfig); 
                        }catch{
                            //refreshToken이 만료된경우
                            localStorage.clear();
                            navigate('/');
                            window.alert("로그인 시간이 만료되어 로그아웃합니다.");
                        }
                    } else { // 다른 오류 메시지일 경우
                        localStorage.clear();
                        navigate('/');
                        window.alert("인증된 사용자가 아닙니다.");
                    }
                }

                return Promise.reject(error);
            }
        );    
    return () => {
        axios.interceptors.response.eject(interceptor);
      };
    }, []);
}