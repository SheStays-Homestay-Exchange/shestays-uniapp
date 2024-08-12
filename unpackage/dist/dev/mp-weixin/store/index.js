"use strict";
const common_vendor = require("../common/vendor.js");
const store = common_vendor.createStore({
  state: {
    hasLogin: false,
    openid: null,
    active: "componentPage",
    leftWinActive: "/pages/component/view/view",
    activeOpen: "",
    menu: [],
    univerifyErrorMsg: ""
  },
  mutations: {
    logout(state) {
      state.hasLogin = false;
      state.openid = null;
    },
    setOpenid(state, openid) {
      state.openid = openid;
    },
    setActive(state, tabPage) {
      state.active = tabPage;
    },
    setLeftWinActive(state, leftWinActive) {
      state.leftWinActive = leftWinActive;
    },
    setActiveOpen(state, activeOpen) {
      state.activeOpen = activeOpen;
    },
    setMenu(state, menu) {
      state.menu = menu;
    },
    setUniverifyErrorMsg(state, payload = "") {
      state.univerifyErrorMsg = payload;
    }
  },
  getters: {},
  actions: {
    // lazy loading openid
    getUserOpenId: async function({
      commit,
      state
    }) {
      return await new Promise((resolve, reject) => {
        if (state.openid) {
          resolve(state.openid);
        } else {
          common_vendor.index.login({
            success: (data) => {
              commit("login");
              setTimeout(function() {
                const openid = "123456789";
                console.log("uni.request mock openid[" + openid + "]");
                commit("setOpenid", openid);
                resolve(openid);
              }, 1e3);
            },
            fail: (err) => {
              console.log("uni.login 接口调用失败，将无法正常使用开放接口等服务", err);
              reject(err);
            }
          });
        }
      });
    },
    getPhoneNumber: function({
      commit
    }, univerifyInfo) {
      return new Promise((resolve, reject) => {
        common_vendor.index.request({
          url: "https://97fca9f2-41f6-449f-a35e-3f135d4c3875.bspapp.com/http/univerify-login",
          method: "POST",
          data: univerifyInfo,
          success: (res2) => {
            const data = res2.data;
            if (data.success) {
              resolve(data.phoneNumber);
            } else {
              reject(res2);
            }
          },
          fail: (err) => {
            reject(res);
          }
        });
      });
    }
  }
});
exports.store = store;
