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
  __name: "searchAddress",
  setup(__props) {
    const styles = common_vendor.reactive({
      "borderColor": "#FFFFFF"
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          styles,
          type: "text",
          placeholder: "选择房源地址"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bd717b72"], ["__file", "D:/wtt/prictice/shestays-uniapp/pages/public/searchAddress/searchAddress.vue"]]);
wx.createPage(MiniProgramPage);
