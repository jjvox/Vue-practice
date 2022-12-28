<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  setup() {
    const init = () => {
      window.gapi.load("auth2", function () {
        /* Ready. Make a call to gapi.auth2.init or some other API */
        window.gapi.auth2.init({
          client_id:
            "453237232043-s5rid5fh850vklfujdhb8v3p62e2oa3o.apps.googleusercontent.com",
          plugin_name: "zerobase", // 아무스트링이나 쓰면 됨.
        });
      });
    };
    window.initGoogle = init(); // window 전역에 initGoogle이 init()이라고 등록함.
  },
};
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
}
</style>
