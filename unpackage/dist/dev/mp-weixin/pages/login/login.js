"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "login",
  setup(__props) {
    const checked = common_vendor.ref(false);
    const wxLogin = () => {
      if (!checked.value) {
        common_vendor.index.showToast({
          title: "请阅读并勾选《SheStays换宿小程序隐私政策》",
          icon: "none"
        });
      }
    };
    common_vendor.onLoad(() => {
      console.log("进入首页。。");
    });
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$2,
        b: common_assets._imports_1$1,
        c: common_assets._imports_2$2,
        d: common_vendor.o(wxLogin),
        e: checked.value,
        f: common_vendor.t(checked.value),
        g: common_vendor.o((...args) => _ctx.handleClickChecked && _ctx.handleClickChecked(...args))
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4e4508d"]]);
wx.createPage(MiniProgramPage);