"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
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
      common_vendor.index.getUserProfile({
        desc: "个人中心展示昵称、头像",
        success: function(infoRes) {
          console.log("用户信息返回：", infoRes);
        }
      });
      common_vendor.index.login({
        "provider": "weixin",
        "onlyAuthorize": true,
        // 微信登录仅请求授权认证
        success(event) {
          console.log("登录成功", event);
          common_vendor.index.showToast({
            title: "获取code成功",
            icon: "none"
          });
        },
        fail(err) {
          console.log("登录失败", err);
        }
      });
    };
    const getphonenumber = (e) => {
      console.log("手机号返回", e);
      common_vendor.index.login({
        "provider": "weixin",
        "onlyAuthorize": true,
        // 微信登录仅请求授权认证
        success(event) {
          console.log("获取登录code返回：", event);
          common_vendor.index.showToast({
            title: "获取登录code成功",
            icon: "none"
          });
        },
        fail(err) {
          console.log("登录失败", err);
        }
      });
    };
    common_vendor.onLoad(() => {
      console.log("进入登录页。。");
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
