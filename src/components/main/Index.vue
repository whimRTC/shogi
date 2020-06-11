<template>
  <div class="main">
    <div v-for="x in [0, 1, 2, 3, 4, 5, 6]" :key="x" class="row">
      <div
        v-for="y in [0, 1, 2, 3, 4]"
        :key="y"
        class="col"
        @drop="dropPiece($event, [x, y])"
        @dragover.prevent
        @dragenter.prevent
      >
        <Piece :x="x" :y="y" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Main",
  components: {
    Piece: () => import("@/components/main/Piece")
  },
  methods: {
    dropPiece(event, targetPlace) {
      const originPlaceX = event.dataTransfer.getData("originPlaceX");
      const originPlaceY = event.dataTransfer.getData("originPlaceY");
      const pieceLabel = event.dataTransfer.getData("pieceLabel");
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
              owner: this.$whim.accessUser.id,
              label: pieceLabel
            }
          }
        }
      });
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
