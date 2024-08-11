"use strict";
const common_vendor = require("../vendor.js");
const postfix = "_aszapp";
function put(k, v) {
  common_vendor.index.setStorageSync(k, v);
}
function get(k, def = void 0) {
  let deadtime = parseInt(common_vendor.index.getStorageSync(k + postfix));
  if (deadtime) {
    if (parseInt(deadtime) < Date.parse(/* @__PURE__ */ new Date()) / 1e3) {
      if (def) {
        return def;
      } else {
        return false;
      }
    }
  }
  let res = common_vendor.index.getStorageSync(k);
  if (res) {
    return res;
  } else {
    if (def == void 0) {
      def = false;
    }
    return def;
  }
}
function remove(k) {
  common_vendor.index.removeStorageSync(k);
  common_vendor.index.removeStorageSync(k + postfix);
}
function clear() {
  common_vendor.index.clearStorageSync();
}
function getBoundingData() {
  return common_vendor.index.getMenuButtonBoundingClientRect();
}
const cache = {
  put,
  get,
  remove,
  clear,
  getBoundingData
};
exports.cache = cache;
