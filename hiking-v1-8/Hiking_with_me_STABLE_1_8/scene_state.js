// scene_state.js
// =======================================
// SceneState · 纯状态仓库 + 事件派发
// =======================================

(function () {
  "use strict";

  const state = {
    cursorKm: 0,
    cursorLat: null,
    cursorLon: null,
    source: "init",
    updatedAt: null
  };

  function emit() {
    window.dispatchEvent(
      new CustomEvent("scene:cursor-change", {
        detail: { ...state }
      })
    );
  }

  function setCursor(patch) {
    if (!patch || typeof patch !== "object") return;

    if (Number.isFinite(patch.cursorKm)) {
      state.cursorKm = patch.cursorKm;
    }
    if (Number.isFinite(patch.cursorLat)) {
      state.cursorLat = patch.cursorLat;
    }
    if (Number.isFinite(patch.cursorLon)) {
      state.cursorLon = patch.cursorLon;
    }
    if (patch.source) {
      state.source = String(patch.source);
    }

    state.updatedAt = Date.now();
    emit();
  }

  function getState() {
    return { ...state };
  }

  // 对外暴露的唯一接口
  window.SceneState = {
    setCursor,
    getState
  };

  console.log("[SceneState] ready");
})();
