<template>
  <div class="border" :class="borderClass">
    <div class="team">チーム {{ $whim.state.teamName[team] }}</div>
  </div>
</template>
<script>
function getAllIndexes(arr, val) {
  let indexes = [];
  for (let i = 0; i < arr.length; i++) if (arr[i] === val) indexes.push(i);
  return indexes;
}
export default {
  name: "Player",
  props: {
    displayUser: {
      type: Object,
      required: true
    }
  }, // 表示されているUserの情報
  computed: {
    userNumber() {
      return this.$whim.state.turnOrder.indexOf(this.displayUser.id);
    },
    team() {
      return this.$whim.state.teams.findIndex(t =>
        t.includes(this.displayUser.id)
      );
    },
    players() {
      return getAllIndexes(this.$whim.state.turnOrder, this.displayUser.id);
    },
    borderClass() {
      if (this.players.length === 1) {
        return [
          `user-${this.players[0]}`,
          `active-${this.$whim.state.currentTurnIndex}`
        ];
      } else {
        return [
          `user-${this.players[0]}-${this.players[1]}`,
          `active-${this.$whim.state.currentTurnIndex}`
        ];
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/colors.scss";

.team {
  font-weight: bold;
}

.border {
  // border: solid;
  box-sizing: border-box;
  border-radius: 20px;
  border-width: 10px;
  // box-shadow: 0 0 0 10px blue inset, 0 0 0 20px red inset;

  @for $i from 0 to 7 {
    &.user-#{$i} {
      box-shadow: 0 0 0 10px rgba(map-get($user-colors, $i), 0.2) inset;
      &.active-#{$i} {
        box-shadow: 0 0 0 10px rgba(map-get($user-colors, $i), 0.8) inset;
      }
    }
  }
  @for $i from 0 to 7 {
    @for $j from 0 to 7 {
      &.user-#{$i}-#{$j} {
        box-shadow: 0 0 0 10px rgba(map-get($user-colors, $i), 0.2) inset,
          0 0 0 20px rgba(map-get($user-colors, $j), 0.2) inset;
        &.active-#{$i} {
          box-shadow: 0 0 0 10px rgba(map-get($user-colors, $i), 0.8) inset,
            0 0 0 20px rgba(map-get($user-colors, $j), 0.2) inset;
        }
        &.active-#{$j} {
          box-shadow: 0 0 0 10px rgba(map-get($user-colors, $i), 0.2) inset,
            0 0 0 20px rgba(map-get($user-colors, $j), 0.8) inset;
        }
      }
    }
  }
}
</style>
