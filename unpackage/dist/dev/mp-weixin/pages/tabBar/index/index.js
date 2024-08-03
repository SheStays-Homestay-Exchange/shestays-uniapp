"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.ref("首页");
    common_vendor.onLoad(() => {
      console.log("进入首页。。");
    });
    return (_ctx, _cache) => {
      return {};
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-036b8cf8"], ["__file", "D:/WTT/job/shestays-uniapp/pages/tabBar/index/index.vue"]]);
wx.createPage(MiniProgramPage);
