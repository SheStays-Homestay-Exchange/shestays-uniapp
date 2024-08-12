"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {};
if (!Array) {
  const _easycom_uni_collapse_item2 = common_vendor.resolveComponent("uni-collapse-item");
  const _easycom_uni_collapse2 = common_vendor.resolveComponent("uni-collapse");
  (_easycom_uni_collapse_item2 + _easycom_uni_collapse2)();
}
const _easycom_uni_collapse_item = () => "../../../uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.js";
const _easycom_uni_collapse = () => "../../../uni_modules/uni-collapse/components/uni-collapse/uni-collapse.js";
if (!Math) {
  (_easycom_uni_collapse_item + _easycom_uni_collapse)();
}
function _sfc_render(_ctx, _cache) {
  return {
    a: common_vendor.p({
      title: "所有旅程都必须是 1 对 1 互换吗？",
      ["show-animation"]: true
    }),
    b: common_vendor.p({
      title: "如何上传房源？",
      ["show-animation"]: true
    }),
    c: common_vendor.p({
      title: "我该如何确保旅行安全？",
      ["show-animation"]: true
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-41ea3e9b"], ["__file", "D:/WTT/job/shestays-uniapp/pages/tabBar/about/about.vue"]]);
wx.createPage(MiniProgramPage);
