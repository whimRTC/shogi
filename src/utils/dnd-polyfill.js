// ios android向けドラックアンドドロップ対応

import { polyfill } from "mobile-drag-drop";
import { scrollBehaviourDragImageTranslateOverride } from "mobile-drag-drop/scroll-behaviour";

// Webpackなどでcssを読み込めるようにしている場合
// js内で読みこめない場合は普通にlinkタグで読み込んでください。
import "mobile-drag-drop/default.css";

// iOS/Androidのときだけ、usePolyfill=trueになる
const usePolyfill = polyfill({
  dragImageTranslateOverride: scrollBehaviourDragImageTranslateOverride
});

if (usePolyfill) {
  // https://github.com/timruffles/mobile-drag-drop#polyfill-requires-dragenter-listener
  // このpolyfill使用の場合 dragenter イベント時に Event.preventDefault() を呼ぶ必要がある
  document.addEventListener("touchmove", function() {}, { passive: false });
  document.addEventListener("dragenter", function(event) {
    event.preventDefault();
  });
  // https://github.com/timruffles/mobile-drag-drop/issues/77
}
