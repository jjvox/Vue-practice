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
      default: "outlined", // contained, outlined
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
  color: #fff;
  cursor: pointer;
  margin: 16px 0;
  transition-property: background-color, border-color, color, opacity;
  transition-duration: 0.2s;
  border-radius: 3px;

  &:hover {
    background-color: #00b2b2;
    border-color: #00b2b2;
  }
}
.contained {
  background-color: #00c4c4;
  border: 1px solid #00c4c4;

  &:hover {
    background-color: #00b2b2;
    border-color: #00b2b2;
  }
}
.outlined {
  background-color: #fff;
  border: 1px solid #00c4c4;
  color: #00c4c4;

  &:hover {
    background-color: #00c4c4;
    color: #fff;
  }
}
</style>
