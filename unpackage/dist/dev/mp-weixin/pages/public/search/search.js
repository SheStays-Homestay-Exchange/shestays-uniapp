"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  _easycom_uni_easyinput2();
}
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
if (!Math) {
  _easycom_uni_easyinput();
}
const _sfc_main = {
  __name: "search",
  setup(__props) {
    const styles = common_vendor.reactive({
      "borderColor": "#FFFFFF"
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          styles,
          type: "text",
          placeholder: "搜索目的地"
        })
      }, {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5f29c737"], ["__file", "D:/wtt/prictice/shestays-uniapp/pages/public/search/search.vue"]]);
wx.createPage(MiniProgramPage);
