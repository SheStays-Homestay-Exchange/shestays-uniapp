"use strict";
const common_assets = require("../../../common/assets.js");
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.ref("首页");
    common_vendor.onLoad(() => {
      console.log("进入首页。。");
    });
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_assets._imports_2,
        c: common_assets._imports_2
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-036b8cf8"]]);
wx.createPage(MiniProgramPage);
