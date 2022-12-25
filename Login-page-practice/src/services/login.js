import axios from "./axios"; // baseUrl 수정을 거친 axios.js 모듈의 axios를 가져온다.
import router from "@/router";
import store from "@/store";

// type user
// param id
// param password
export const loginUser = async (user) => {
  try {
    const { data } = await axios.post("/login", user);
    store.commit("setLogin", data.accessToken);
    router.push("/");
  } catch (err) {
    console.log(err);
  }
};
