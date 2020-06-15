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
    <div
      v-for="player in players"
      :key="`player-${player}`"
      :class="[
        `background-${player}`,
        `active-${$whim.state.currentTurnIndex}`
      ]"
    >
      <Hand
        v-for="(hand, j) in ($whim.state.hand || {})[player]"
        :key="j"
        :hand="hand"
        @dragging="setDragging"
        :player="player"
      ></Hand>
    </div>
  </div>
</template>

<script>
function getAllIndexes(arr, val) {
  let indexes = [];
  for (let i = 0; i < arr.length; i++) if (arr[i] === val) indexes.push(i);
  return indexes;
}

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
      return (this.$whim.state.hand || {})[this.$whim.state.currentTurnIndex];
    },
    players() {
      return getAllIndexes(
        this.$whim.state.turnOrder,
        this.$whim.accessUser.id
      );
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
            (this.$whim.state.hand || {})[this.$whim.state.currentTurnIndex] ||
            []
          ).concat(this.$piece(targetPlace).label);
          this.$whim.assignState({
            hand: {
              [this.$whim.state.currentTurnIndex]: hand
            }
          });
          // 勝利判定
          if (["ou", "gyoku"].includes(this.$piece(targetPlace).label)) {
            this.$whim.assignState({
              winner: this.$myTeam(),
              phase: "result"
            });
          }
        }

        // 手持ちから出す場合
        if (this.dragging.place === "hand") {
          const hand = this.$whim.state.hand[this.$whim.state.currentTurnIndex];
          const index = hand.indexOf(this.dragging.piece.label);
          hand.splice(index, 1);
          this.$whim.assignState({
            hand: {
              [this.$whim.state.currentTurnIndex]: hand
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
@import "@/assets/colors.scss";

.main {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.row {
  background: #ffffffe0;
  width: 90vw;
  max-width: 55vh;
  height: 18vw;
  max-height: 11vh;
  display: flex;
}

.col {
  border: solid 1px;
  width: 20%;
  height: 100%;
  box-sizing: border-box;
  text-align: center;
}

@for $i from 0 to 7 {
  .background-#{$i} {
    background-color: rgba(map-get($user-colors, $i), 0.3);
    &.active-#{$i} {
      background-color: rgba(map-get($user-colors, $i), 0.6);
    }
  }
}
</style>
