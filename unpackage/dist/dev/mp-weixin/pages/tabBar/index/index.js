"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_api_common = require("../../../common/api/common.js");
require("../../../common/js/request.js");
require("../../../common/config/index.js");
require("../../../common/js/cache.js");
require("../../../store/index.js");
require("../../../common/js/util.js");
if (!Array) {
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  _easycom_uni_load_more2();
}
const _easycom_uni_load_more = () => "../../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  (_easycom_uni_load_more + DetailPopup)();
}
const DetailPopup = () => "../../../components/DetailPopup.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.onLoad(() => {
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
    const contentText = {
      contentdown: "上拉显示更多",
      contentrefresh: "正在加载...",
      contentnomore: "暂时没有更多房源啦，期待更多寄宿家庭加入我们"
    };
    function handleSearch() {
      common_vendor.index.navigateTo({
        url: "/pages/public/search/search"
      });
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
            common_vendor.index.showToast({
              title: "刷新成功",
              icon: "none"
            });
          }
        }
        if (pages.pageIndex >= res.data.pageCount) {
          loadStatus.value = "noMore";
        }
        console.log("房源", listData.value);
      } catch (e) {
        console.log("列表错误==", e);
      }
    };
    const popShow = common_vendor.ref(false);
    const contactHost = (item) => {
      popShow.value = true;
    };
    const goPage = (url) => {
      common_vendor.index.navigateTo({
        url
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(handleSearch),
        b: common_vendor.f(listData.value, (item, i, i0) => {
          var _a, _b, _c, _d, _e;
          return common_vendor.e({
            a: ((_a = item == null ? void 0 : item.houseImgs) == null ? void 0 : _a.length) > 0
          }, ((_b = item == null ? void 0 : item.houseImgs) == null ? void 0 : _b.length) > 0 ? {
            b: common_vendor.f(item.houseImgs, (el, index, i1) => {
              return {};
            })
          } : {}, {
            c: common_vendor.t(item.countryName),
            d: common_vendor.t(item.regionName),
            e: common_vendor.t(item.startTime || "-"),
            f: ((_c = item == null ? void 0 : item.houseImgs) == null ? void 0 : _c.length) > 0
          }, ((_d = item == null ? void 0 : item.houseImgs) == null ? void 0 : _d.length) > 0 ? {} : {}, {
            g: common_vendor.t(item.describle),
            h: common_vendor.o(($event) => contactHost(), i),
            i: common_vendor.n(((_e = item.houseImgs) == null ? void 0 : _e.length) > 0 ? "" : "hava-border"),
            j: common_vendor.o(($event) => goPage("/pages/houseDetail/houseDetail"), i),
            k: i
          });
        }),
        c: listData.value.length > 0
      }, listData.value.length > 0 ? {
        d: common_vendor.p({
          status: loadStatus.value,
          contentText
        })
      } : {}, {
        e: common_vendor.o(($event) => popShow.value = false),
        f: common_vendor.p({
          show: popShow.value
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-036b8cf8"], ["__file", "D:/wtt/prictice/shestays-uniapp/pages/tabBar/index/index.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
