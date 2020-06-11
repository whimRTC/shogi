<template>
  <div class="main">
    <div v-for="x in xRange" :key="x" class="row">
      <div
        v-for="y in yRange"
        :key="y"
        class="col"
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
    xRange() {
      if (this.$myTeam() === 1) {
        return Array.from({ length: 7 }, (v, k) => k);
      } else {
        return Array.from({ length: 7 }, (v, k) => 6 - k);
      }
    },
    yRange() {
      if (this.$myTeam() === 1) {
        return Array.from({ length: 5 }, (v, k) => k);
      } else {
        return Array.from({ length: 5 }, (v, k) => 4 - k);
      }
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
      console.log([originPlaceX, originPlaceY], targetPlace);
      if (this.$droppable(this.dragging.place, targetPlace)) {
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
                owner: this.dragging.piece.owner,
                team: this.dragging.piece.team,
                label: pieceLabel
              }
            }
          }
        });
      }
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
