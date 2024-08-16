"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const common_api_common = require("../../../common/api/common.js");
const common_js_cache = require("../../../common/js/cache.js");
require("../../../common/js/request.js");
require("../../../common/config/index.js");
require("../../../store/index.js");
require("../../../common/js/util.js");
if (!Array) {
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  _easycom_uni_load_more2();
}
const _easycom_uni_load_more = () => "../../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  (HouseItem + _easycom_uni_load_more + DetailPopup)();
}
const DetailPopup = () => "../../../components/DetailPopup.js";
const HouseItem = () => "../../../components/HouseItem.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const userInfo = common_vendor.ref({});
    common_vendor.onLoad(() => {
      userInfo.value = common_js_cache.cache.get("userInfo") || {};
      console.log("userInfo", userInfo);
      getHouseListFun();
    });
    common_vendor.onShareAppMessage(() => {
    });
    common_vendor.onReachBottom(() => {
      if (loadStatus.value != "noMore") {
        pages.pageIndex++;
        getHouseListFun();
      }
    });
    common_vendor.onPullDownRefresh(() => {
      pages.pageIndex = 1;
      listData.value = [];
      getHouseListFun("refresh");
    });
    common_vendor.computed((value) => {
      console.log("computer", value);
      return "星星";
    });
    const contentText = {
      contentdown: "上拉显示更多",
      contentrefresh: "正在加载...",
      contentnomore: "暂时没有更多房源啦，期待更多寄宿家庭加入我们"
    };
    function handleSearch() {
      if (isLogin()) {
        goPage("/pages/public/search/search");
      }
    }
    const loadStatus = common_vendor.ref("contentdown");
    const listData = common_vendor.ref([
      {
        countryName: "中国"
      }
    ]);
    const pages = common_vendor.reactive({
      pageIndex: 1,
      totalPage: 0
      //总共有多少页数据
    });
    const getHouseListFun = async (type) => {
      loadStatus.value = "loading";
      try {
        const res = await common_api_common.getHouseList({
          pageIndex: pages.pageIndex
        });
        if (res.code == 200) {
          listData.value = listData.value.concat(res.data.data);
          pages.totalPage = res.data.pageCount;
          if (type == "refresh") {
            common_vendor.index.stopPullDownRefresh();
          }
        }
        if (pages.pageIndex >= res.data.pageCount) {
          loadStatus.value = "noMore";
        }
      } catch (e) {
        console.log("列表错误==", e);
      }
    };
    const popShow = common_vendor.ref(false);
    const contactHost = (item) => {
      if (isLogin()) {
        popShow.value = true;
      }
    };
    const goPage = (url) => {
      common_vendor.index.navigateTo({
        url
      });
    };
    const isLogin = () => {
      var _a;
      if (!((_a = userInfo.value) == null ? void 0 : _a.openId)) {
        common_vendor.index.reLaunch({
          url: "/pages/login/login"
        });
        return false;
      }
      return true;
    };
    const itemClick = (item) => {
      if (isLogin()) {
        goPage("/pages/houseDetail/houseDetail");
      }
    };
    return (_ctx, _cache) => {
      var _a, _b;
      return common_vendor.e({
        a: common_assets._imports_0,
        b: common_vendor.o(handleSearch),
        c: common_vendor.f(listData.value, (item, i, i0) => {
          return {
            a: i,
            b: common_vendor.o(contactHost, i),
            c: common_vendor.o(itemClick, i),
            d: "036b8cf8-0-" + i0,
            e: common_vendor.p({
              item
            })
          };
        }),
        d: listData.value.length > 0
      }, listData.value.length > 0 ? {
        e: common_vendor.p({
          status: loadStatus.value,
          contentText
        })
      } : {}, {
        f: common_vendor.o(($event) => popShow.value = false),
        g: common_vendor.p({
          show: popShow.value
        }),
        h: !((_a = userInfo.value) == null ? void 0 : _a.openId)
      }, !((_b = userInfo.value) == null ? void 0 : _b.openId) ? {
        i: common_assets._imports_2,
        j: common_vendor.o(isLogin)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-036b8cf8"], ["__file", "D:/wtt/prictice/shestays-uniapp/pages/tabBar/index/index.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
