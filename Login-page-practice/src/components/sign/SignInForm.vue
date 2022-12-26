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
  </form>
</template>

<script>
import { reactive } from "@vue/composition-api";
import VInput from "@/components/common/VInput.vue";
import VButton from "@/components/common/VButton.vue";
import { signInFireBase, getUserInFirebase } from "@/services/sign";
// import { signInUser } from "@/services/sign";

export default {
  name: "SignInForm",
  components: {
    VInput,
    VButton,
  },
  setup() {
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
      // signInUser({ id, password });
      signInFireBase(id, password);
    };

    getUserInFirebase();
    return {
      user,
      checkPassword,
      clickSignIn,
    };
  },
  // data() {
  //   return {
  //     id: "",
  //     password: "",
  //     confirmPassword: "",
  //     isError: false,
  //   };
  // },
  // methods: {
  //   checkPassword() {
  //     this.isError = this.password !== this.confirmPassword;
  //   },
  //   clickSignIn(id, password, event) {
  //     event.preventDefault();
  //     if (this.isError) return;
  //     signInUser({ id, password });
  //   },
  // },
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
