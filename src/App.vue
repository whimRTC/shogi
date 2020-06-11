<template>
  <div id="app">
    <Main class="main" />
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
              piece: "hisha",
              owner: this.$whim.accessUser.id
            },
            1: {
              piece: "gin",
              owner: this.$whim.accessUser.id
            },
            2: {
              piece: "ou",
              owner: this.$whim.accessUser.id
            },
            3: {
              piece: "kin",
              owner: this.$whim.accessUser.id
            },
            4: {
              piece: "kaku",
              owner: this.$whim.accessUser.id
            }
          },
          1: {
            0: {
              piece: "fu",
              owner: this.$whim.accessUser.id
            },
            1: {
              piece: "fu",
              owner: this.$whim.accessUser.id
            },
            2: null,
            3: {
              piece: "fu",
              owner: this.$whim.accessUser.id
            },
            4: {
              piece: "fu",
              owner: this.$whim.accessUser.id
            }
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
            0: null,
            1: null,
            2: null,
            3: null,
            4: null
          },
          6: {
            0: {
              piece: "fu",
              owner: this.$whim.accessUser.id
            },
            1: {
              piece: "fu",
              owner: this.$whim.accessUser.id
            },
            2: null,
            3: {
              piece: "fu",
              owner: this.$whim.accessUser.id
            },
            4: {
              piece: "fu",
              owner: this.$whim.accessUser.id
            }
          },
          7: {
            0: {
              piece: "kaku",
              owner: this.$whim.accessUser.id
            },
            1: {
              piece: "kin",
              owner: this.$whim.accessUser.id
            },
            2: {
              piece: "gyoku",
              owner: this.$whim.accessUser.id
            },
            3: {
              piece: "gin",
              owner: this.$whim.accessUser.id
            },
            4: {
              piece: "hisha",
              owner: this.$whim.accessUser.id
            }
          }
        }
      });
    }, 500);
  }
};
</script>