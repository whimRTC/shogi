<template>
  <img
    :src="require(`@/assets/${hand}.png`)"
    class="piece"
    :draggable="draggable"
    :class="{ dragging }"
    @dragstart="dragPiece($event)"
    @dragend="dragend"
  />
</template>

<script>
export default {
  data() {
    return {
      dragging: false
    };
  },
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
    draggable() {
      return (
        this.$whim.state.currentTurnIndex === this.player &&
        this.$whim.state.phase === "play"
      );
    }
  },
  methods: {
    dragPiece(event) {
      this.dragging = true;
      setTimeout(() => {
        this.$emit("dragging", { place: "hand", piece: this.piece });
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.dropEffect = "move";
      }, 100);
    },
    dragend() {
      this.$emit("dragging", null);
      this.dragging = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.piece {
  height: 10vw;
  max-height: 7vh;
  float: left;
  // position: absolute;
  // margin: 5px;
}
.dragging {
  height: 20vw !important;
  max-height: 14vh !important;
  visibility: hidden;
  position: absolute;
  // transform: scale(0, 0);
  transition-duration: 0.01s;
  transition-property: visibility, position;
}
</style>
