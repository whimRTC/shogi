<template>
  <div class="center">
    <img v-if="isWinner" src="@/assets/win.png" class="img" />
    <img v-else src="@/assets/lose.png" class="img" />
  </div>
</template>
<script>
export default {
  name: "Result",
  props: {
    displayUser: {
      type: Object,
      required: true
    }
  }, // 表示されているUserの情報
  computed: {
    team() {
      return this.$whim.state.teams.findIndex(t =>
        t.includes(this.displayUser.id)
      );
    },
    isWinner() {
      return this.$whim.state.winner === this.team;
    }
  }
};
</script>
<style lang="scss" scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.img {
  max-width: 200px;
  width: 40vw;
}
</style>
