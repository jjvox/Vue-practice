<template>
  <button class="v-button" :type="type" @click="clickEvent" :class="variant">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "VButton",
  props: {
    type: {
      type: String,
      default: "button",
    },
    variant: {
      type: String,
      default: "contained", // contained, outlined
    },
  },
  methods: {
    clickEvent() {
      this.$emit("click"); // 부모 컴포넌트에 click이벤트를 전달 한다.
    },
  },
};
</script>

<style lang="scss" scoped>
.v-button {
  width: 80px;
  height: 30px;
  color: $white;
  cursor: pointer;
  transition-property: background-color, border-color, color, opacity;
  transition-duration: 0.2s;
  border-radius: 3px;

  &:hover {
    background-color: $primary-focus;
    border-color: $primary-focus;
  }
}
.contained {
  background-color: $primary;
  border: 1px solid $primary;

  &:hover {
    background-color: $primary-focus;
    border-color: $primary-focus;
  }
}
.outlined {
  background-color: $white;
  border: 1px solid $primary;
  color: $primary;

  &:hover {
    background-color: $primary;
    color: $white;
  }
}
</style>
