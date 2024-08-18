"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_collapse_item2 = common_vendor.resolveComponent("uni-collapse-item");
  const _easycom_uni_collapse2 = common_vendor.resolveComponent("uni-collapse");
  (_easycom_uni_icons2 + _easycom_uni_collapse_item2 + _easycom_uni_collapse2)();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_collapse_item = () => "../../../uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.js";
const _easycom_uni_collapse = () => "../../../uni_modules/uni-collapse/components/uni-collapse/uni-collapse.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_collapse_item + _easycom_uni_collapse)();
}
const _sfc_main = {
  __name: "about",
  setup(__props) {
    const goPage = () => {
      common_vendor.index.switchTab({
        url: "/pages/tabBar/my/my"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$1,
        b: common_vendor.p({
          type: "arrow-right",
          size: "26",
          color: "#fff"
        }),
        c: common_vendor.o(goPage),
        d: common_vendor.p({
          title: "所有旅程都必须是 1 对 1 互换吗？",
          ["show-animation"]: true
        }),
        e: common_vendor.p({
          title: "如何上传房源？",
          ["show-animation"]: true
        }),
        f: common_vendor.p({
          title: "我该如何确保旅程的安全？",
          ["show-animation"]: true
        }),
        g: common_vendor.p({
          title: "借换宿是收费的吗？",
          ["show-animation"]: true
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-41ea3e9b"], ["__file", "D:/WTT/job/shestays-uniapp/pages/tabBar/about/about.vue"]]);
wx.createPage(MiniProgramPage);
