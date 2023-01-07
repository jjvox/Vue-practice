<template>
  <form class="login-form" @submit="clickLogin">
    <label> ID <VInput class="login-form__text" v-model="id" /> </label>
    <label>
      Password
      <VInput class="login-form__text" type="password" v-model="password" />
    </label>
    <LoginGoogle />
    <LoginKaKao />
    <VButton class="login-form__button" type="submit">로그인</VButton>
    <router-link to="/signIn">
      <VButton class="login-form__button" variant="outlined">회원가입</VButton>
    </router-link>
  </form>
</template>

<script>
import { ref } from "@vue/composition-api";
import VInput from "@/components/common/VInput.vue";
import VButton from "@/components/common/VButton.vue";
import { loginUser } from "@/services/login";
import LoginGoogle from "./LoginGoogle.vue";
import LoginKaKao from "./LoginKaKao.vue";

export default {
  name: "login-form",
  components: {
    VInput,
    VButton,
    LoginGoogle,
    LoginKaKao,
  },
  setup() {
    const id = ref("");
    const password = ref("");

    const clickLogin = (event) => {
      const user = {
        id: id.value,
        password: password.value,
      };
      loginUser(user);
      event.preventDefault();
    };
    return {
      id,
      password,
      clickLogin,
    };
  },
};
</script>

<style lang="scss" scoped>
.login-form {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-flow: column;
  width: 100%;

  &__text,
  &__button,
  a,
  label {
    width: 100%;
  }
}
</style>
