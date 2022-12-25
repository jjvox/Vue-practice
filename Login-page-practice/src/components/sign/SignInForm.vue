<template>
  <form class="sign-in-form" @submit="clickSignIn(id, password, $event)">
    <label>
      ID
      <VInput class="sign-in-form__text" v-model="id" />
    </label>
    <label>
      Password
      <VInput
        class="sign-in-form__text"
        v-model="password"
        type="password"
        :isError="isError"
      />
    </label>
    <label>
      Confirm Password
      <VInput
        class="sign-in-form__text"
        v-model="confirmPassword"
        type="password"
        @blur="checkPassword()"
        :isError="isError"
        error-msg="비밀번호가 다릅니다."
      />
    </label>
    <VButton type="submit" class="sign-in-form__button">회원가입</VButton>
  </form>
</template>

<script>
import VInput from "@/components/common/VInput.vue";
import VButton from "@/components/common/VButton.vue";
import { signInUser } from "@/services/sign";
export default {
  name: "SignInForm",
  components: {
    VInput,
    VButton,
  },
  data() {
    return {
      id: "",
      password: "",
      confirmPassword: "",
      isError: false,
    };
  },
  methods: {
    checkPassword() {
      this.isError = this.password !== this.confirmPassword;
    },
    clickSignIn(id, password, event) {
      event.preventDefault();
      if (this.isError) return;
      signInUser({ id, password });
    },
  },
};
</script>

<style lang="scss" scoped>
.sign-in-form {
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
