<template>
  <div class="login-view">
    <img class="logo-img" src="@/assets/images/img.jpg" alt="로고" />
    <VInput v-model="user.id" />
    <VInput v-model="user.password" />
    <VButton>로그인</VButton>
    <VButton>회원가입</VButton>
  </div>
</template>

<script>
import VInput from "@/components/common/VInput.vue";
import VButton from "@/components/common/VButton.vue";

export default {
  name: "login-view",
  components: {
    VInput,
    VButton,
  },
  data() {
    return {
      user: {
        id: "",
        password: "",
      },
    };
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
}
.logo-img {
  width: 30rem;
}
</style>
