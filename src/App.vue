<template>
  <div id="app">
    <Main class="main" v-if="$whim.state.phase === 'initialized'" />
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
function random(a) {
  return a[Math.floor(Math.random() * a.length)];
}
export default {
  name: "App",
  components: {
    Main: () => import("@/components/main/Index")
  },
  mounted() {
    setTimeout(() => {
      if (this.$whim.state.phase === "initialized") {
        return;
      }
      const userIds = shuffle(this.$whim.users.map(user => user.id));
      const team = [
        [userIds[0], userIds[2], userIds[4], userIds[6]].filter(v => v),
        [userIds[1], userIds[3], userIds[5], userIds[7]].filter(v => v)
      ];
      this.$whim.resetState({
        phase: "initialized",
        board: {
          0: {
            0: {
              label: "hisha",
              owner: random(team[0]),
              team: 0
            },
            1: {
              label: "gin",
              owner: random(team[0]),
              team: 0
            },
            2: {
              label: "ou",
              team: 0
            },
            3: {
              label: "kin",
              owner: random(team[0]),
              team: 0
            },
            4: {
              label: "kaku",
              owner: random(team[0]),
              team: 0
            }
          },
          1: {
            0: {
              label: "fu",
              owner: random(team[0]),
              team: 0
            },
            1: {
              label: "fu",
              owner: random(team[0]),
              team: 0
            },
            2: {
              label: "fu",
              owner: random(team[0]),
              team: 0
            },
            3: {
              label: "fu",
              owner: random(team[0]),
              team: 0
            },
            4: {
              label: "fu",
              owner: random(team[0]),
              team: 0
            }
          },
          2: {
            0: null,
            1: null,
            2: null,
            3: null,
            4: null
          },
          3: {
            0: null,
            1: null,
            2: null,
            3: null,
            4: null
          },
          4: {
            0: null,
            1: null,
            2: null,
            3: null,
            4: null
          },
          5: {
            0: {
              label: "fu",
              owner: random(team[1]),
              team: 1
            },
            1: {
              label: "fu",
              owner: random(team[1]),
              team: 1
            },
            2: {
              label: "fu",
              owner: random(team[1]),
              team: 1
            },
            3: {
              label: "fu",
              owner: random(team[1]),
              team: 1
            },
            4: {
              label: "fu",
              owner: random(team[1]),
              team: 1
            }
          },
          6: {
            0: {
              label: "kaku",
              owner: random(team[1]),
              team: 1
            },
            1: {
              label: "kin",
              owner: random(team[1]),
              team: 1
            },
            2: {
              label: "gyoku",
              team: 1
            },
            3: {
              label: "gin",
              owner: random(team[1]),
              team: 1
            },
            4: {
              label: "hisha",
              owner: random(team[1]),
              team: 1
            }
          }
        },
        team: team,
        turnOrder: userIds,
        currentTurn: userIds[0]
      });
    }, 500);
  }
};
</script>
