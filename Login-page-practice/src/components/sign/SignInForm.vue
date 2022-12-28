<template>
  <form
    class="sign-in-form"
    @submit="clickSignIn(user.id, user.password, $event)"
  >
    <label>
      ID
      <VInput class="sign-in-form__text" v-model="user.id" />
    </label>
    <label>
      Password
      <VInput
        class="sign-in-form__text"
        v-model="user.password"
        type="password"
        :isError="user.isError"
      />
    </label>
    <label>
      Confirm Password
      <VInput
        class="sign-in-form__text"
        v-model="user.confirmPassword"
        type="password"
        @blur="checkPassword()"
        :isError="user.isError"
        error-msg="비밀번호가 다릅니다."
      />
    </label>
    <VButton type="submit" class="sign-in-form__button">회원가입</VButton>
    <VButton class="sign-in-form__button" @click="clickGoogle"
      >구글 회원가입</VButton
    >
  </form>
</template>

<script>
import { reactive } from "@vue/composition-api";
import VInput from "@/components/common/VInput.vue";
import VButton from "@/components/common/VButton.vue";
import {
  signInFireBase,
  getUserInFirebase,
  getGoogleUser,
} from "@/services/sign";

export default {
  name: "SignInForm",
  components: {
    VInput,
    VButton,
  },
  setup(props, context) {
    const user = reactive({
      id: "",
      password: "",
      confirmPassword: "",
      isError: false,
    });

    const checkPassword = () => {
      user.isError = user.password !== user.confirmPassword;
    };

    const clickSignIn = (id, password, event) => {
      event.preventDefault();
      if (user.isError) return;
      signInFireBase(id, password);
    };

    const clickGoogle = async () => {
      await getGoogleUser();
      context.root.$router.push("/login");
    };

    getUserInFirebase();
    return {
      user,
      checkPassword,
      clickSignIn,
      clickGoogle,
    };
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
