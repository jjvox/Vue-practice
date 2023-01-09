import Vue from "vue";

import axios from "./axios";
// import store from "@/store";
import { getRefreshToken } from "../login";

const authAxios = axios.create(); // 이건 무슨 문법 ?

// 요청 인터셉터 추가
authAxios.interceptors.request.use(
  function (config) {
    // 요청을 보내기 전에 수행할 일
    // 로그 찍기, 저장하기 기타 등등....
    // config.headers["access-token"] = store.state.accessToken; // config가 뭔가?
    // config.headers["refresh-token"] = store.state.refreshToken;

    config.headers["access-token"] = Vue.$cookies.get("accessToken"); // 삭제 or 없을때 = null
    config.headers["refresh-token"] = Vue.$cookies.get("refreshToken");

    return config;
  },
  function (error) {
    // 오류 요청을 보내기전 수행할 일
    // ...
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가
authAxios.interceptors.response.use(
  function (response) {
    // 응답 데이터를 가공
    // ...
    return response;
  },
  async function (error) {
    // 오류 응답을 처리
    // ...
    const errorAPI = error.config;
    const refreshToken = Vue.$cookies.get("refreshToken");

    if (
      error.response.status === 401 &&
      errorAPI.retry === undefined &&
      refreshToken
    ) {
      errorAPI.retry = true;
      await getRefreshToken(); // accessToken이 만료 되었을 경우 refreshToken으로 accesToken을 새로 받는다.
      return await authAxios(errorAPI); // accessToken을 새로 받고 나서 Axios 호출을 재시도 한다. (error.config.retry를 true로 바꿔서 무한루프를 막는다. )
    }
    return Promise.reject(error);
  }
);

export default authAxios;
