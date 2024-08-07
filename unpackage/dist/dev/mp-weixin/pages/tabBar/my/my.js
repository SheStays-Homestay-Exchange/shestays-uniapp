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
        a: common_vendor.o(($event) => handleGoPage("/pages/tabBar/my/myHome/myHome")),
        b: common_assets._imports_0$2,
        c: common_vendor.o(($event) => handleGoPage("/pages/tabBar/my/updateMyInfo/updateMyInfo")),
        d: common_assets._imports_1,
        e: common_vendor.o(($event) => handleGoPage("/pages/tabBar/my/myHousing")),
        f: common_assets._imports_7,
        g: common_vendor.o(($event) => handleGoPage("/pages/tabBar/my/uploadHousing")),
        h: common_assets._imports_3$1,
        i: common_assets._imports_1$1,
        j: common_vendor.o(($event) => handleGoPage("/pages/tabBar/my/housingList/housingList")),
        k: common_assets._imports_3$1,
        l: common_assets._imports_1$1,
        m: common_assets._imports_5$1,
        n: common_assets._imports_1$1,
        o: common_assets._imports_6,
        p: common_assets._imports_1$1,
        q: common_assets._imports_7$1,
        r: common_assets._imports_1$1
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-989a1478"]]);
wx.createPage(MiniProgramPage);
