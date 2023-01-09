<template>
  <div class="login-view">
    <img class="logo-img" src="@/assets/images/img.jpg" alt="로고" />
    <LoginForm class="form" />
  </div>
</template>

<script>
import LoginForm from "@/components/login/LoginForm.vue";

export default {
  name: "login-view",
  mounted() {
    this.getKakaoUserInfo();
  },
  components: {
    LoginForm,
  },
  methods: {
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
.login-view {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;

  .form {
    width: 300px;
  }
}
.logo-img {
  width: 30rem;
}
</style>
