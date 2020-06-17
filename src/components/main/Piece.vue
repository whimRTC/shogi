<template>
  <div class="piece-box" :class="[{ droppable }, `background-${ownerNumber}`]">
    <img
      :src="require(`@/assets/${label}.png`)"
      class="piece"
      :class="{ opponent, dragging: myDragging }"
      v-if="label"
      :draggable="draggable"
      @dragstart="dragPiece($event, place)"
      @dragend="dragend"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      myDragging: false
    };
  },
  props: {
    place: Array,
    dragging: Object || null
  },
  computed: {
    label() {
      // 存在しない場合は undefinedを返す
      return this.piece?.label;
    },
    piece() {
      return (this.$whim.state.board[this.place[0]] || {})[this.place[1]];
    },
    droppable() {
      if (!this.dragging) {
        return false;
      }
      return this.$droppable(this.dragging.place, this.place);
    },
    ownerNumber() {
      return this.piece?.owner;
    },
    opponent() {
      return this.piece?.team !== this.$myTeam();
    },
    draggable() {
      return (
        this.$whim.state.turnOrder[this.$whim.state.currentTurnIndex] ===
          this.$whim.accessUser.id &&
        this.ownerNumber === this.$whim.state.currentTurnIndex &&
        this.$whim.state.phase === "play"
      );
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
      this.myDragging = true;
    },
    dragend() {
      this.$emit("dragging", null);
      this.myDragging = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/colors.scss";

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
  background: #00000050 !important;
}
.opponent {
  transform: rotate(-180deg);
}

@for $i from 0 to 7 {
  .background-#{$i} {
    background-color: rgba(map-get($user-colors, $i), 0.3);
  }
}

.dragging {
  height: 18vw !important;
  max-height: 12vh !important;
  width: 18vw !important;
  max-width: 12vh !important;
  visibility: hidden;
  position: absolute;
  // transform: scale(0, 0);
  transition-duration: 0.01s;
  transition-property: visibility, position;
}
</style>
