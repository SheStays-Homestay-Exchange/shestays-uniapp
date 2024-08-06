"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.ref("首页");
    common_vendor.onLoad(() => {
      console.log("进入首页。。");
    });
    function handleSearch() {
      common_vendor.index.navigateTo({
        url: "/pages/public/search/search"
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_assets._imports_0$1,
        c: common_vendor.o(handleSearch),
        d: common_assets._imports_2,
        e: common_assets._imports_3,
        f: common_assets._imports_5,
        g: common_assets._imports_5
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-036b8cf8"]]);
wx.createPage(MiniProgramPage);
