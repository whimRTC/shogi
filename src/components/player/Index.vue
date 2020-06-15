<template>
  <div class="border" :class="[`user-${userNumber}`, active]"></div>
</template>
<script>
export default {
  name: "Player",
  props: {
    displayUser: {
      type: Object,
      required: true
    }
  }, // 表示されているUserの情報
  computed: {
    userNumber() {
      return this.$whim.state.turnOrder.indexOf(this.displayUser.id);
    },
    active() {
      if (
        this.$whim.state.turnOrder[this.$whim.state.currentTurnIndex] ===
        this.displayUser.id
      ) {
        return "active";
      } else {
        return "";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/colors.scss";

.border {
  border: solid;
  box-sizing: border-box;
  border-radius: 20px;
  border-width: 10px;

  @for $i from 0 to 7 {
    &.user-#{$i} {
      border-color: rgba(map-get($user-colors, $i), 0.2);
      &.active {
        border-color: rgba(map-get($user-colors, $i), 0.8);
      }
    }
  }
}
</style>
