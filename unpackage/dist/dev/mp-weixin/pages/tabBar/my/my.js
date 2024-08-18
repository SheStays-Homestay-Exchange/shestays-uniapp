"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  __name: "my",
  setup(__props) {
    const concact = () => {
      common_vendor.index.showModal({
        title: "联系我们",
        content: "邮箱：SheStays@163.com",
        showCancel: false,
        confirmText: "知道啦",
        success: function(res) {
        }
      });
    };
    function handleGoPage(url) {
      console.log(url);
      common_vendor.index.navigateTo({
        url
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => handleGoPage("/pages/tabBar/my/myHome/myHome")),
        b: common_assets._imports_0$3,
        c: common_vendor.o(($event) => handleGoPage("/pages/tabBar/my/updateMyInfo/updateMyInfo")),
        d: common_assets._imports_1,
        e: common_vendor.o(($event) => handleGoPage("/pages/tabBar/my/myHousing")),
        f: common_assets._imports_7,
        g: common_vendor.o(($event) => handleGoPage("/pages/tabBar/my/uploadHousing")),
        h: common_assets._imports_3,
        i: common_assets._imports_1$1,
        j: common_vendor.o(($event) => handleGoPage("/pages/tabBar/my/housingList/housingList")),
        k: common_assets._imports_3,
        l: common_assets._imports_1$1,
        m: common_assets._imports_5,
        n: common_assets._imports_1$1,
        o: common_vendor.o(($event) => handleGoPage("/pages/rules/rules")),
        p: common_assets._imports_6,
        q: common_assets._imports_1$1,
        r: common_vendor.o(concact),
        s: common_assets._imports_7$1,
        t: common_assets._imports_1$1,
        v: common_vendor.o(($event) => handleGoPage("/pages/rules/rules"))
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-989a1478"]]);
wx.createPage(MiniProgramPage);
