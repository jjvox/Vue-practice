<template>
  <div class="v-input">
    <input
      :type="type"
      :value="value"
      @input="change"
      class="v-input__text"
      :class="{ error: isError }"
      :placeholder="placeholder"
      @keypress.enter="$emit('enter')"
      @blur="$emit('blur')"
    />
    <span v-if="isError && errorMsg" class="error_msg">{{ errorMsg }}</span>
  </div>
</template>

<script>
export default {
  name: "vInput",
  props: {
    value: {
      type: String,
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
    },
    isError: {
      type: Boolean,
      default: false,
    },
    errorMsg: {
      type: String,
      default: "",
    },
  },
  setup(props, context) {
    const change = (event) => {
      context.emit("input", event.target.value);
    };
    return {
      change,
    };
  },
  // methods: {
  //   change(event) {
  //     this.$emit("input", event.target.value); // this.$emit 으로 부모 컴포넌트에 이벤트 이름(input)과 값(event.target.value)을 알려 준다.
  //   },
  // },
};
</script>

<style lang="scss" scoped>
.v-input {
  display: inline-block;
  width: 150px;
  height: 30px;

  &__text {
    width: 100%;
    height: 100%;
    outline: none;
    border: 1px solid rgba(0, 0, 0, 0.15);
    padding: 0 8px;

    &:hover {
      border-color: rgba(0, 0, 0, 0.54);
    }
    &:focus {
      border-color: $primary;
    }
    &.error {
      border: 1px solid $error;
    }
  }
  .error-msg {
    color: $error;
    font-size: 0.75rem;
  }
}
</style>
