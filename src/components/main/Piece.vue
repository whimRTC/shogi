<template>
  <div class="piece-box" :class="[{ droppable }, `background-${ownerNumber}`]">
    <img
      :src="require(`@/assets/${label}.png`)"
      class="piece"
      :class="{ opponent }"
      v-if="label"
      :draggable="
        this.$whim.state.turnOrder[this.$whim.state.currentTurnIndex] ===
          this.$whim.accessUser.id
      "
      @dragstart="dragPiece($event, place)"
    />
  </div>
</template>

<script>
export default {
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
      return this.$whim.state.turnOrder.indexOf(this.piece?.owner);
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
  background: #ffffff;
}
.opponent {
  transform: rotate(-180deg);
}

@for $i from 0 to 7 {
  .background-#{$i} {
    background-color: rgba(map-get($user-colors, $i), 0.3);
  }
}
</style>
