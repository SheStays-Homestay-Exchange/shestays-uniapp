"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  __name: "my",
  setup(__props) {
    function handleGoPage(url) {
      console.log(url);
      common_vendor.index.navigateTo({
        url
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$1,
        b: common_assets._imports_1,
        c: common_vendor.o(($event) => handleGoPage("/pages/tabBar/my/myHousing")),
        d: common_assets._imports_2$1,
        e: common_assets._imports_3,
        f: common_assets._imports_3,
        g: common_assets._imports_3,
        h: common_assets._imports_3
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-989a1478"]]);
wx.createPage(MiniProgramPage);
