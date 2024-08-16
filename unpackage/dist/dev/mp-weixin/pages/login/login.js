"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const common_api_common = require("../../common/api/common.js");
const common_js_cache = require("../../common/js/cache.js");
const store_index = require("../../store/index.js");
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
      common_vendor.index.switchTab({
        url: "/pages/tabBar/index/index"
      });
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
      console.log("===", store_index.store);
    });
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_assets._imports_1,
        c: common_assets._imports_2,
        d: common_vendor.o(wxLogin),
        e: common_assets._imports_2,
        f: common_vendor.o(getphonenumber),
        g: checked.value,
        h: common_vendor.o(goRule),
        i: common_vendor.o((...args) => _ctx.handleClickChecked && _ctx.handleClickChecked(...args))
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4e4508d"], ["__file", "D:/wtt/prictice/shestays-uniapp/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
