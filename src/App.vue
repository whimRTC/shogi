<template>
  <div id="app">
    <Main class="main" />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {
    Main: () => import("@/components/main/Index"),
  }
};
</script>
