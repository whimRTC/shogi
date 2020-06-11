<template>
  <img
    :src="require(`@/assets/${hand}.png`)"
    class="piece"
    :draggable="
      this.$whim.state.turnOrder[this.$whim.state.currentTurnIndex] ===
        this.$whim.accessUser.id
    "
    @dragstart="dragPiece($event)"
  />
</template>

<script>
export default {
  props: {
    hand: String
  },
  computed: {
    piece() {
      return {
        label: this.hand,
        owner: this.$whim.accessUser.id,
        team: this.$myTeam()
      };
    },
    droppable() {
      if (!this.dragging) {
        return false;
      }
      return this.$droppable(this.dragging.place, this.place);
    }
  },
  methods: {
    dragPiece(event) {
      this.$emit("dragging", { place: "hand", piece: this.piece });
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.dropEffect = "move";
    }
  }
};
</script>

<style lang="scss" scoped>
.piece {
  height: 12vw;
  max-height: 8vh;
}
</style>
