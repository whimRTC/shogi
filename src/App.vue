<template>
  <div id="app" v-if="$whim.state.phase">
    <Main class="main" />
    <Player
      v-for="user in $whim.users"
      :key="user.id"
      :class="whimUserWindowClass(user)"
      :displayUser="user"
    />
    <div v-if="$whim.state.phase === 'result'" class="result">
      <Result
        v-for="user in $whim.users"
        :key="user.id"
        :class="whimUserWindowClass(user)"
        :displayUser="user"
        class="result"
      />
    </div>
  </div>
</template>

<script>
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
// function random(a) {
//   return a[Math.floor(Math.random() * a.length)];
// }
export default {
  name: "App",
  components: {
    Main: () => import("@/components/main/Index"),
    Player: () => import("@/components/player/Index"),
    Result: () => import("@/components/result/Index")
  },
  mounted() {
    setTimeout(() => {
      if (this.$whim.state.phase === "play") {
        return;
      }
      const userIds = shuffle(this.$whim.users.map(user => user.id));
      const teams = [
        [userIds[0], userIds[2], userIds[4], userIds[6]].filter(v => v),
        [userIds[1], userIds[3], userIds[5], userIds[7]].filter(v => v)
      ];

      const initHands = [
        "hisha",
        "gin",
        "ou",
        "kin",
        "kaku",
        "fu",
        "fu",
        "fu",
        "fu",
        "fu"
      ];
      let handData = {};
      let board = {};
      let teamName = [];

      // playerには0..7が割り振られる。
      // これはturnOrderのindexと一致し、
      // 偶数がteam0 奇数がteam1である。

      let turnOrder;
      if (userIds.length % 2 === 0) {
        turnOrder = userIds;
      } else {
        turnOrder = userIds.concat(userIds[1]);
      }

      // コマの振り分け
      teams.forEach((team, i) => {
        const shuffledHand = shuffle(initHands);
        shuffledHand.forEach((hand, j) => {
          const player = (j % teams[0].length) * 2 + i;
          if (hand === "ou") {
            if (i === 0) {
              board[0] = {};
              board[0][2] = {
                label: "ou",
                owner: player,
                team: 0
              };
            } else {
              board[5] = {};
              board[5][2] = {
                label: "gyoku",
                owner: player,
                team: 1
              };
            }

            // 王将をもつプレイヤーがチーム名になる
            teamName.push(
              this.$whim.users.find(user => user.id === turnOrder[player]).name
            );
            return;
          }
          if (handData[player]) {
            handData[player].push(hand);
          } else {
            handData[player] = [hand];
          }
        });
      });

      this.$whim.resetState({
        phase: "play",
        board: board,
        teams: teams,
        hand: handData,
        turnOrder: turnOrder,
        currentTurnIndex: 0,
        teamName: teamName
      });
    }, 500);
  }
};
</script>
<style lang="scss" scoped>
.main {
  position: relative;
  z-index: 1;
}
.result {
  z-index: 2;
}
</style>
