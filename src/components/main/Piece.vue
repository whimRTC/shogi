<template>
  <div class="piece-box" :class="{ droppable }">
    <img
      :src="require(`@/assets/${label}.png`)"
      class="piece"
      :class="{ opponent }"
      v-if="label"
      draggable
      @dragstart="dragPiece($event, [x, y])"
    />
  </div>
</template>

<script>
export default {
  props: {
    x: Number,
    y: Number,
    dragging: Object || null
  },
  computed: {
    label() {
      // 存在しない場合は undefinedを返す
      return this.piece?.label;
    },
    piece() {
      return (this.$whim.state.board[this.x] || {})[this.y];
    },
    droppable() {
      if (!this.dragging) {
        return false;
      }
      return this.$droppable(this.dragging.place, [this.x, this.y]);
    },
    opponent() {
      return this.piece?.team !== this.$myTeam();
    }
  },
  methods: {
    dragPiece(event, place) {
      this.$emit("dragging", { place, piece: this.piece });
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.setData("originPlaceX", place[0]);
      event.dataTransfer.setData("originPlaceY", place[1]);
      event.dataTransfer.setData("pieceLabel", this.label);
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
.droppable {
  background: #ffffff;
}
.opponent {
  transform: rotate(-180deg);
}
</style>
