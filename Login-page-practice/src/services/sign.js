import axios from "./axios/axios";
import authAxios from "./axios/authAxios";
import router from "@/router";
import {
  getDatabase,
  ref,
  push,
  query,
  equalTo,
  orderByChild,
  onValue,
} from "firebase/database";

// export const signInUser = async (data) => {
//   try {

//     const { id, password } = data;
//     await axios.post("/signIn", { id, password });
//     router.push("/login");
//   } catch (err) {
//     console.log(err);
//   }
// };

export const signInFireBase = (id, password) => {
  // firebase database 에 데이터 전달 (회원가입은 다른 인증방법을 사용 해야 함)
  const db = getDatabase();
  push(ref(db, "users/"), {
    username: id,
    password,
  });
  router.push("/login");
};

export const getUserInFirebase = (id = "jjvox") => {
  // firebase database 에서 데이터 가져오기 / 데이터가 다 공개 되기 때문에 로그인 용도로는 적절하지 않음. 단순 데이터 주고 받는 용도
  const db = getDatabase();
  const userRef = ref(db, "users/");
  const queryRef = query(userRef, orderByChild("username"), equalTo(id)); // userRef에 있는 username의 값과 입력받은 id 값이 같은지 확인

  onValue(queryRef, (snapshot) => {
    const data = snapshot.val(); // queryRef에 해당 하는 값을 객체로 반환 한다.
    console.log(data);
  });
};

export const getUserInfoList = async () => {
  try {
    const { data } = await authAxios.get("/userInfo");
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getUserInfo = async (id) => {
  try {
    const { data } = await authAxios.get(`/userInfo/${id}`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getGoogleUser = async () => {
  try {
    const googleAuth = window.gapi.auth2.getAuthInstance();
    await googleAuth.signIn();
    const googleUser = await googleAuth.currentUser.get();
    const profile = await googleUser.getBasicProfile();

    await axios.post("/signIn", {
      id: profile.getId(),
      email: profile.getEmail(),
      name: profile.getName(),
      isSocial: true,
    });
  } catch (err) {
    console.log(err);
  }
};
