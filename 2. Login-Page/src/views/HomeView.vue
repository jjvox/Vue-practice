<template>
  <div class="home">
    홈 입니다. <br />
    로그인한 유저만 볼 수 있습니다.
    <VButton @click="clickInfo">유저 정보</VButton>
  </div>
</template>

<script>
import VButton from "@/components/common/VButton.vue";
import { getUserInfoList } from "@/services/sign";

export default {
  name: "HomeView",
  components: {
    VButton,
  },
  setup() {
    const clickInfo = () => {
      getUserInfoList();
    };
    return {
      clickInfo,
    };
  },
  // methods: {
  //   clickInfo() {
  //     getUserInfoList();
  //   },
  // },
};
</script>
