"use strict";
const common_vendor = require("../../../../common/vendor.js");
const common_assets = require("../../../../common/assets.js");
const _sfc_main = {};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  _easycom_uni_easyinput2();
}
const _easycom_uni_easyinput = () => "../../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
if (!Math) {
  _easycom_uni_easyinput();
}
function _sfc_render(_ctx, _cache) {
  return {
    a: common_assets._imports_0$7,
    b: common_vendor.p({
      type: "text",
      placeholder: "未设置"
    }),
    c: common_vendor.p({
      type: "text"
    }),
    d: common_vendor.p({
      type: "text",
      placeholder: "未设置"
    }),
    e: common_vendor.p({
      type: "text",
      placeholder: "未设置"
    }),
    f: common_assets._imports_1$1,
    g: common_assets._imports_1$1,
    h: common_vendor.p({
      type: "textarea"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-820c3591"]]);
wx.createPage(MiniProgramPage);