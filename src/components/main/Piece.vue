<template>
  <div class="piece-box">
    <img :src="require(`@/assets/${label}.png`)" class="piece" />
  </div>
</template>

<script>
export default {
  props: {
    x: Number,
    y: Number
  },
  computed: {
    label() {
      return this.$whim.state.board[this.x][this.y].piece;
    }
  }
};
</script>

<style lang="scss" scoped>
.piece-box {
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
}
.piece {
  margin: auto;
  width: 60%;
}
</style>
