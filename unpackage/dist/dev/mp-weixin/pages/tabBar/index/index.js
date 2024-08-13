"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_api_common = require("../../../common/api/common.js");
require("../../../common/js/request.js");
require("../../../common/config/index.js");
require("../../../common/js/cache.js");
require("../../../store/index.js");
require("../../../common/js/util.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.ref("首页");
    common_vendor.onLoad(() => {
      getHouseListFun();
      console.log("进入首页。。");
    });
    function handleSearch() {
      common_vendor.index.navigateTo({
        url: "/pages/public/search/search"
      });
    }
    const getHouseListFun = async () => {
      try {
        const res = await common_api_common.getHouseList({
          pageIndex: 1
        });
        console.log("获取房源列表接口测试", res);
      } catch (e) {
      }
    };
    const goPage = (url) => {
      common_vendor.index.navigateTo({
        url
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleSearch),
        b: common_vendor.o(($event) => goPage("/pages/houseDetail/houseDetail"))
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-036b8cf8"], ["__file", "D:/wtt/prictice/shestays-uniapp/pages/tabBar/index/index.vue"]]);
wx.createPage(MiniProgramPage);
