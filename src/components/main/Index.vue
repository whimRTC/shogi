<template>
  <div class="main">
    <div class="order">
      <div class="circle-0" :class="`active-${$whim.state.currentTurnIndex}`">
        <div v-if="wasKnockOut(0)" class="knock-out"></div>
      </div>

      <template v-for="player in $whim.state.turnOrder.length - 1">
        <a href="#" class="arrow" :key="`arrow-${player}`"></a>
        <div
          :key="player"
          :class="[
            `circle-${player}`,
            `active-${$whim.state.currentTurnIndex}`
          ]"
        >
          <div v-if="wasKnockOut(player)" class="knock-out"></div>
        </div>
      </template>
    </div>
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
      class="hands"
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
import { Howl } from "howler";

const SE_MOVE = new Howl({
  src: require("@/assets/shogi.mp3")
});

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
        return Array.from({ length: 6 }, (v, k) => k);
      } else {
        return Array.from({ length: 6 }, (v, k) => 5 - k);
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
    },
    wasKnockOut() {
      return player => {
        return (this.$whim.state.knockOut || []).includes(player);
      };
    },
    sound() {
      return this.$whim.state.sound;
    }
  },
  methods: {
    setDragging(payload) {
      this.dragging = payload;
    },

    isKnockOut(player, targetPlace) {
      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
          if (i === targetPlace[0] && j === targetPlace[1]) {
            continue;
          }
          if ((this.$whim.state.board[i] || {})[j]?.owner === player) {
            return false;
          }
        }
      }
      console.log("t1");
      const player_hand = (this.$whim.state.hand || {})[player] || [];
      if (player_hand.length === 0) {
        return true;
      }
      return false;
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

          // 戦闘不能判定
          const owner = this.$piece(targetPlace).owner;
          if (this.isKnockOut(owner, targetPlace)) {
            this.$whim.assignState({
              knockOut: (this.$whim.state.knockOut || []).concat(owner)
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
          // 成る場合
          if (
            this.dragging.piece.label === "fu" &&
            (1 - this.dragging.piece.team) * 5 === targetPlace[0]
          ) {
            this.dragging.piece.label = "to";
          }
        }
        let nextIndex =
          (this.$whim.state.currentTurnIndex + 1) %
          this.$whim.state.turnOrder.length;
        while ((this.$whim.state.knockOut || []).includes(nextIndex)) {
          nextIndex = (nextIndex + 1) % this.$whim.state.turnOrder.length;
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
          currentTurnIndex: nextIndex,
          sound: true
        });
      }
      this.dragging = null;
    }
  },
  watch: {
    sound: function(newSound) {
      if (newSound) {
        SE_MOVE.volume(0.1);
        SE_MOVE.play();
        this.$whim.assignState({
          sound: false
        });
      }
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

.order {
  background: #ffffffe0;
  display: flex;
  justify-content: center;
  padding: 3px;
  @for $i from 0 to 7 {
    .circle-#{$i} {
      position: relative;

      width: 9vw;
      max-width: 5vh;
      height: 9vw;
      max-height: 5vh;
      border-radius: 50%;
      background-color: rgba(map-get($user-colors, $i), 0.15);
      &.active-#{$i} {
        background-color: rgba(map-get($user-colors, $i), 1);
      }
    }
  }

  .arrow {
    position: relative;
    display: inline-block;
    padding: 0 0 0 16px;
    color: #000;
    vertical-align: middle;
    text-decoration: none;
    font-size: 15px;
  }
  .arrow::before,
  .arrow::after {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    content: "";
    vertical-align: middle;
  }
  .arrow::before {
    left: 2px;
    width: 7px;
    height: 3px;
    background: #000;
  }
  .arrow::after {
    left: 2px;
    width: 6px;
    height: 6px;
    border-top: 3px solid #000;
    border-right: 3px solid #000;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }
}

.knock-out {
  display: inline-block;
  position: absolute;
  z-index: 1;
  padding: 0;
  width: 4px;
  height: 20px;
  background: #000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
}
.knock-out:before {
  display: block;
  content: "";
  position: absolute;
  top: 50%;
  left: -8px;
  width: 20px;
  height: 4px;
  margin-top: -2px;
  background: #000;
}

.hands {
  height: 10vw;
  max-height: 7vh;
  width: 90vw;
  max-width: 55vh;
}

@for $i from 0 to 7 {
  .background-#{$i} {
    background-color: rgba(map-get($user-colors, $i), 0.2);
    &.active-#{$i} {
      background-color: rgba(map-get($user-colors, $i), 0.6);
    }
  }
}
</style>
