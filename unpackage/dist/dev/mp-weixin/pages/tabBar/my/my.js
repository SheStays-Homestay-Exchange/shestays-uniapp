"use strict";
const common_vendor = require("../../../common/vendor.js");
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
        b: common_vendor.o(($event) => handleGoPage("/pages/tabBar/my/updateMyInfo/updateMyInfo")),
        c: common_vendor.o(($event) => handleGoPage("/pages/tabBar/my/myHousing")),
        d: common_vendor.o(($event) => handleGoPage("/pages/tabBar/my/uploadHousing")),
        e: common_vendor.o(($event) => handleGoPage("/pages/tabBar/my/housingList/housingList")),
        f: common_vendor.o(($event) => handleGoPage("/pages/rules/rules")),
        g: common_vendor.o(concact),
        h: common_vendor.o(($event) => handleGoPage("/pages/rules/rules"))
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-989a1478"], ["__file", "D:/WTT/job/shestays-uniapp/pages/tabBar/my/my.vue"]]);
wx.createPage(MiniProgramPage);
