// runtime.js
// =======================================
// Hiking Runtime · 最小运行引擎
// 负责：计算 → 写入 SceneState
// =======================================

(function () {
  "use strict";

  if (!window.SceneState) {
    console.error("[Runtime] SceneState not found");
    return;
  }

  const Runtime = {
    profile: null,

    init({ profile }) {
      if (!Array.isArray(profile) || profile.length === 0) {
        console.warn("[Runtime] profile not ready");
        return;
      }
      this.profile = profile;
      console.log("[Runtime] initialized, profile points =", profile.length);
    },

    /**
     * 根据 km 更新运行状态
     * @param {number} km
     */
    updateByKm(km) {
      if (!Number.isFinite(km) || !this.profile) return;

      const pt = findProfilePointByKm(this.profile, km);
      if (!pt) return;

      SceneState.setCursor({
        cursorKm: km,
        cursorLat: pt.lat,
        cursorLon: pt.lon,
        source: "runtime"
      });
    }
  };

  // ===== 内部工具：km → profile 点 =====
  function findProfilePointByKm(profile, km) {
    let closest = null;
    let minDiff = Infinity;

    for (let i = 0; i < profile.length; i++) {
      const p = profile[i];
      if (!Number.isFinite(p.km)) continue;

      const diff = Math.abs(p.km - km);
      if (diff < minDiff) {
        minDiff = diff;
        closest = p;
      }
    }
    return closest;
  }

  // 暴露给外部（只暴露 Runtime）
  window.Runtime = Runtime;

  console.log("[Runtime] ready");
})();
