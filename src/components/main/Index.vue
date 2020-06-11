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
        <Piece :place="[x, y]" @dragging="setDragging" :dragging="dragging" />
      </div>
    </div>
    <div>
      <Hand
        v-for="(hand, i) in hands"
        :key="i"
        :hand="hand"
        @dragging="setDragging"
      ></Hand>
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
    Piece: () => import("@/components/main/Piece"),
    Hand: () => import("@/components/main/Hand")
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
    },
    hands() {
      return (this.$whim.state.hand || {})[this.$whim.accessUser.id];
    }
  },
  methods: {
    setDragging(payload) {
      this.dragging = payload;
    },
    dropPiece(event, targetPlace) {
      if (this.$droppable(this.dragging.place, targetPlace)) {
        // コマをとる場合
        if (this.$piece(targetPlace)) {
          const hand = (
            (this.$whim.state.hand || {})[this.$whim.accessUser.id] || []
          ).concat(this.$piece(targetPlace).label);
          this.$whim.assignState({
            hand: {
              [this.$whim.accessUser.id]: hand
            }
          });
        }
        // 手持ちから出す場合
        if (this.dragging.place === "hand") {
          const hand = this.$whim.state.hand[this.$whim.accessUser.id];
          const index = hand.indexOf(this.dragging.piece.label);
          hand.splice(index, 1);
          this.$whim.assignState({
            hand: {
              [this.$whim.accessUser.id]: hand
            }
          });
        } else {
          this.$whim.assignState({
            board: {
              [this.dragging.place[0]]: {
                [this.dragging.place[1]]: null
              }
            }
          });
        }
        this.$whim.assignState({
          board: {
            [targetPlace[0]]: {
              [targetPlace[1]]: {
                owner: this.dragging.piece.owner,
                team: this.dragging.piece.team,
                label: this.dragging.piece.label
              }
            }
          },
          currentTurnIndex:
            (this.$whim.state.currentTurnIndex + 1) %
            this.$whim.state.turnOrder.length
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
