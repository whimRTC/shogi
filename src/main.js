import Vue from "vue";
import App from "./App.vue";
import whimClientVue from "whim-client-vue";
import "whim-client-vue/dist/whim-client-vue.css";
import "./assets/common.scss";
import "./utils/dnd-polyfill";

Vue.config.productionTip = false;
Vue.use(whimClientVue);

// settings for debug
// let recaptchaScript = document.createElement("script");
// recaptchaScript.setAttribute("src", "http://localhost:8098");
// document.head.appendChild(recaptchaScript);

Vue.prototype.$myTeam = () => {
  return Vue.prototype.$whim.state.teams.findIndex(t =>
    t.includes(Vue.prototype.$whim.accessUser.id)
  );
};

Vue.prototype.$piece = place => {
  return (Vue.prototype.$whim.state.board[place[0]] || {})[place[1]];
};

Vue.prototype.$droppable = (originPlace, targetPlace) => {
  const piece = Vue.prototype.$piece(originPlace);

  // コマが存在しない場合
  if (!piece) {
    return !Vue.prototype.$piece(targetPlace);
  }
  // 移動先に味方のコマが存在する場合
  const targetPiece = Vue.prototype.$piece(targetPlace);
  console.log(targetPiece);
  if (targetPiece && targetPiece.team === Vue.prototype.$myTeam()) {
    return false;
  }

  const direction = Vue.prototype.$myTeam() === 0 ? 1 : -1;

  const x = originPlace[0];
  const y = originPlace[1];
  let possibilityPlaces = [];
  if (piece.label === "fu") {
    possibilityPlaces = [[x + direction, y]];
  } else if (piece.label === "gin") {
    possibilityPlaces = [
      [x + direction, y - 1],
      [x + direction, y],
      [x + direction, y + 1],
      [x - direction, y - 1],
      [x - direction, y + 1]
    ];
  } else if (piece.label === "gyoku" || piece.label === "ou") {
    possibilityPlaces = [
      [x - 1, y - 1],
      [x - 1, y],
      [x - 1, y + 1],
      [x, y - 1],
      [x, y + 1],
      [x + 1, y - 1],
      [x + 1, y],
      [x + 1, y + 1]
    ];
  } else if (piece.label === "kin" || piece.label === "to") {
    possibilityPlaces = [
      [x + direction, y - 1],
      [x + direction, y],
      [x + direction, y + 1],
      [x, y - 1],
      [x, y + 1],
      [x - direction, y]
    ];
  } else if (piece.label === "kaku") {
    const kakuDirections = [
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1]
    ];
    kakuDirections.forEach(kakuDirection => {
      for (let i = 1; i <= 5; i++) {
        const movedPlace = [x + kakuDirection[0] * i, y + kakuDirection[1] * i];
        possibilityPlaces.push(movedPlace);
        // 他のコマは飛び越えられない
        if (Vue.prototype.$piece(movedPlace)) {
          break;
        }
      }
    });
  } else if (piece.label === "hisha") {
    const hishaDirections = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1]
    ];
    hishaDirections.forEach(hishaDirection => {
      for (let i = 1; i <= 5; i++) {
        const movedPlace = [
          x + hishaDirection[0] * i,
          y + hishaDirection[1] * i
        ];
        possibilityPlaces.push(movedPlace);
        // 他のコマは飛び越えられない
        if (Vue.prototype.$piece(movedPlace)) {
          break;
        }
      }
    });
  }
  return possibilityPlaces.some(
    pp => JSON.stringify(pp) === JSON.stringify(targetPlace)
  );
};

new Vue({
  render: h => h(App)
}).$mount("#app");
