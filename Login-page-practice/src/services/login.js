import Vue from "vue";

import axios from "./axios/axios"; // baseUrl 수정을 거친 axios.js 모듈의 axios를 가져온다.
import router from "@/router";
import store from "@/store";
import authAxios from "./axios/authAxios";

// type user
// param id
// param password
export const loginUser = async (user) => {
  try {
    const { data } = await axios.post("/login", user);
    Vue.$cookies.set("accessToken", data.accessToken, "10m");
    Vue.$cookies.set("refreshToken", data.refreshToken, "20m");
    // store.commit("setLogin", data);
    router.push("/");
  } catch (err) {
    console.log(err);
  }
};

export const googleLogin = async () => {
  const googleAuth = window.gapi.auth2.getAuthInstance();
  await googleAuth.signIn();
  const googleUser = await googleAuth.currentUser.get().getAuthResponse();
  const token = googleUser.id_token;
  socialLogin(token);
};

export const socialLogin = (token) => {
  store.commit("setLogin", { accessToken: token, refreshToken: "" });
};

export const getRefreshToken = async () => {
  try {
    const { data } = await authAxios.get("/refreshToken");
    console.log(data);
    Vue.$cookies.set("accessToken", data.accessToken, "10m");
    // store.commit("setAccessToken", data.accessToken); // refreshToken 으로 새로 받아온 accessToken을 store에 업데이트
  } catch (err) {
    console.log(err);
  }
};
