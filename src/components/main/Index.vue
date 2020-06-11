<template>
  <div class="main">
    <div v-for="x in [0, 1, 2, 3, 4, 5, 6]" :key="x" class="row">
      <div
        v-for="y in [0, 1, 2, 3, 4]"
        :key="y"
        class="col"
        :class="{ droppable: droppable }"
        @drop="dropPiece($event, [x, y])"
        @dragover.prevent
        @dragenter.prevent
      >
        <Piece :x="x" :y="y" @dragging="setDragging" :dragging="dragging" />
      </div>
    </div>
  </div>
</template>

<script>
import droppable from "@/utils/droppable";

export default {
  name: "Main",
  data() {
    return {
      dragging: null
    };
  },
  components: {
    Piece: () => import("@/components/main/Piece")
  },
  computed: {
    droppable() {
      if (!this.dragging) {
        return false;
      }
      if (this.dragging.label === "fu") {
        return false;
      }
      return true;
    }
  },
  methods: {
    setDragging(payload) {
      this.dragging = payload;
    },
    dropPiece(event, targetPlace) {
      const originPlaceX = event.dataTransfer.getData("originPlaceX");
      const originPlaceY = event.dataTransfer.getData("originPlaceY");
      const pieceLabel = event.dataTransfer.getData("pieceLabel");
      if (!droppable(pieceLabel, [originPlaceX, originPlaceY], targetPlace))
        this.$whim.assignState({
          board: {
            [originPlaceX]: {
              [originPlaceY]: null
            }
          }
        });
      this.$whim.assignState({
        board: {
          [targetPlace[0]]: {
            [targetPlace[1]]: {
              owner: this.dragging.owner,
              label: pieceLabel
            }
          }
        }
      });
      this.dragging = null;
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.row {
  background: #b8883c70;
  width: 90vw;
  max-width: 60vh;
  height: 18vw;
  max-height: 12vh;
  display: flex;
}

.col {
  border: solid 1px;
  width: 20%;
  height: 100%;
  box-sizing: border-box;
  text-align: center;
}
</style>
