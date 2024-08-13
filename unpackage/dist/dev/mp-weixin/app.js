"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const store_index = require("./store/index.js");
if (!Math) {
  "./pages/tabBar/index/index.js";
  "./pages/tabBar/about/about.js";
  "./pages/tabBar/my/my.js";
  "./pages/tabBar/my/myHousing.js";
  "./pages/login/login.js";
  "./pages/tabBar/my/uploadHousing.js";
  "./pages/public/search/search.js";
  "./pages/public/searchAddress/searchAddress.js";
  "./pages/tabBar/my/housingList/housingList.js";
  "./pages/tabBar/my/myHome/myHome.js";
  "./pages/tabBar/my/updateMyInfo/updateMyInfo.js";
  "./pages/houseDetail/houseDetail.js";
  "./pages/rules/rules.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  },
  globalData: {
    test: ""
  },
  methods: {
    ...common_vendor.mapMutations(["setUniverifyErrorMsg", "setUniverifyLogin"])
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/wtt/prictice/shestays-uniapp/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(store_index.store);
  app.config.globalProperties.$adpid = "1111111111";
  app.config.globalProperties.$backgroundAudioData = {
    playing: false,
    playTime: 0,
    formatedPlayTime: "00:00:00"
  };
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
