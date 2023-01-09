<template>
  <img
    class="kakao-login"
    src="@/assets/images/Kakao_logo.jpg"
    alt="카카오 로그인"
    @click="loginWithKakao"
  />
</template>

<script>
export default {
  name: "LoginKaKao",
  methods: {
    loginWithKakao() {
      window.Kakao.Auth.authorize({
        redirectUri: "http://localhost:8080/login",
      });
    },
    getKakaoUserInfo() {
      window.Kakao.API.request({
        url: "/v2/user/me",
        data: {
          property_keys: ["kakao_account.email", "kakao_account.nickname"],
        },
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.kakao-login {
  width: 40px;
  cursor: pointer;
}
</style>
