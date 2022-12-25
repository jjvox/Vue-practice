<template>
  <form class="login-form" @submit="clickLogin">
    <label> ID <VInput class="login-form__text" v-model="id" /> </label>
    <label>
      Password
      <VInput class="login-form__text" type="password" v-model="password" />
    </label>
    <VButton class="login-form__button" type="submit">로그인</VButton>
    <router-link to="/signIn">
      <VButton class="login-form__button" variant="outlined">회원가입</VButton>
    </router-link>
  </form>
</template>

<script>
import VInput from "@/components/common/VInput.vue";
import VButton from "@/components/common/VButton.vue";
import { loginUser } from "@/services/login";

export default {
  name: "login-form",
  components: {
    VInput,
    VButton,
  },
  data() {
    return {
      id: "",
      password: "",
    };
  },
  methods: {
    clickLogin(event) {
      const user = {
        id: this.id,
        password: this.password,
      };
      loginUser(user);
      event.preventDefault();
    },
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
