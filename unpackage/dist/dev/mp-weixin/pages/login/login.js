"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const common_api_common = require("../../common/api/common.js");
const common_js_cache = require("../../common/js/cache.js");
require("../../store/index.js");
require("../../common/js/request.js");
require("../../common/config/index.js");
require("../../common/js/util.js");
const _sfc_main = {
  __name: "login",
  setup(__props) {
    const checked = common_vendor.ref(false);
    const goRule = () => {
      common_vendor.index.navigateTo({
        url: "/pages/rules/rules"
      });
    };
    const wxLogin = () => {
      if (!checked.value) {
        common_vendor.index.showToast({
          title: "请阅读并勾选《SheStays换宿小程序隐私政策》",
          icon: "none"
        });
      }
    };
    const getphonenumber = (e) => {
      console.log("手机号返回", e);
      common_vendor.index.login({
        "provider": "weixin",
        "onlyAuthorize": true,
        // 微信登录仅请求授权认证
        success(event) {
          console.log("登录成功", event);
          userAuthorFun(e.detail, event.code);
        },
        fail(err) {
          console.log("登录失败", err);
        }
      });
    };
    const userAuthorFun = (param, loginCode) => {
      common_api_common.userAuthor({
        encryptedData: param.encryptedData,
        iv: param.iv,
        code: loginCode
      }).then((res) => {
        if (res.code == 200) {
          common_js_cache.cache.put("userInfo", res.data);
          common_vendor.index.switchTab({
            url: "/pages/tabBar/index/index"
          });
        }
      }).catch((err) => {
        console.log("登录失败");
        common_vendor.index.showToast({
          title: err.msg,
          icon: "none"
        });
      });
    };
    common_vendor.onLoad(() => {
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0,
        b: common_assets._imports_1,
        c: !checked.value
      }, !checked.value ? {
        d: common_assets._imports_2,
        e: common_vendor.o(wxLogin)
      } : {
        f: common_assets._imports_2,
        g: common_vendor.o(getphonenumber)
      }, {
        h: checked.value,
        i: common_vendor.o(($event) => checked.value = !checked.value),
        j: common_vendor.o(goRule),
        k: common_vendor.o((...args) => _ctx.handleClickChecked && _ctx.handleClickChecked(...args))
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4e4508d"], ["__file", "D:/wtt/prictice/shestays-uniapp/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
