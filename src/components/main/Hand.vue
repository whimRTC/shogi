<template>
  <img
    :src="require(`@/assets/${hand}.png`)"
    class="piece"
    :draggable="draggable"
    @dragstart="dragPiece($event)"
    @dragend="dragend"
  />
</template>

<script>
export default {
  props: {
    hand: String,
    player: Number
  },
  computed: {
    piece() {
      return {
        label: this.hand,
        owner: this.player,
        team: this.$myTeam()
      };
    },
    droppable() {
      if (!this.dragging) {
        return false;
      }
      return this.$droppable(this.dragging.place, this.place);
    },
    draggable() {
      return (
        this.$whim.state.currentTurnIndex === this.player &&
        this.$whim.state.phase === "play"
      );
    }
  },
  methods: {
    dragPiece(event) {
      this.$emit("dragging", { place: "hand", piece: this.piece });
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.dropEffect = "move";
    },
    dragend() {
      this.$emit("dragging", null);
    }
  }
};
</script>

<style lang="scss" scoped>
.piece {
  height: 10vw;
  max-height: 7vh;
}
</style>
