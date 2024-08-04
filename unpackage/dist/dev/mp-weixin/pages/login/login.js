"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "login",
  setup(__props) {
    const checked = common_vendor.ref(false);
    common_vendor.onLoad(() => {
      console.log("进入首页。。");
    });
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: checked.value,
        c: common_vendor.o((...args) => _ctx.handleClickChecked && _ctx.handleClickChecked(...args))
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4e4508d"], ["__file", "D:/WTT/job/shestays-uniapp/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
