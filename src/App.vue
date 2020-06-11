<template>
  <div id="app">
    <Main class="main" v-if="$whim.state.phase === 'initialized'" />
  </div>
</template>

<script>
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
      this.$whim.resetState({
        phase: "initialized",
        board: {
          0: {
            0: {
              label: "hisha",
              owner: this.$whim.accessUser.id
            },
            1: {
              label: "gin",
              owner: this.$whim.accessUser.id
            },
            2: {
              label: "ou",
              owner: this.$whim.accessUser.id
            },
            3: {
              label: "kin",
              owner: this.$whim.accessUser.id
            },
            4: {
              label: "kaku",
              owner: this.$whim.accessUser.id
            }
          },
          1: {
            0: {
              label: "fu",
              owner: this.$whim.accessUser.id
            },
            1: {
              label: "fu",
              owner: this.$whim.accessUser.id
            },
            2: null,
            3: {
              label: "fu",
              owner: this.$whim.accessUser.id
            },
            4: {
              label: "fu",
              owner: this.$whim.accessUser.id
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
              owner: this.$whim.accessUser.id
            },
            1: {
              label: "fu",
              owner: this.$whim.accessUser.id
            },
            2: null,
            3: {
              label: "fu",
              owner: this.$whim.accessUser.id
            },
            4: {
              label: "fu",
              owner: this.$whim.accessUser.id
            }
          },
          6: {
            0: {
              label: "kaku",
              owner: this.$whim.accessUser.id
            },
            1: {
              label: "kin",
              owner: this.$whim.accessUser.id
            },
            2: {
              label: "gyoku",
              owner: this.$whim.accessUser.id
            },
            3: {
              label: "gin",
              owner: this.$whim.accessUser.id
            },
            4: {
              label: "hisha",
              owner: this.$whim.accessUser.id
            }
          }
        }
      });
    }, 500);
  }
};
</script>
