"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_api_common = require("../../../common/api/common.js");
require("../../../common/js/request.js");
require("../../../common/config/index.js");
require("../../../common/js/cache.js");
require("../../../store/index.js");
require("../../../common/js/util.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  _easycom_uni_easyinput2();
}
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
if (!Math) {
  (_easycom_uni_easyinput + HouseItem)();
}
const HouseItem = () => "../../../components/HouseItem.js";
const _sfc_main = {
  __name: "search",
  setup(__props) {
    const showResult = common_vendor.ref(false);
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
    const getHouseListFun = async () => {
      loadStatus.value = "loading";
      try {
        const res = await common_api_common.getHouseList({
          pageIndex: pages.pageIndex
        });
        if (res.code == 200) {
          listData.value = listData.value.concat(res.data.data);
          pages.totalPage = res.data.pageCount;
        }
        if (pages.pageIndex >= res.data.pageCount) {
          loadStatus.value = "noMore";
        }
      } catch (e) {
        console.log("列表错误==", e);
      }
    };
    const search = () => {
      showResult.value = true;
      getHouseListFun();
    };
    const styles = common_vendor.reactive({
      "borderColor": "#FFFFFF"
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          styles,
          type: "text",
          placeholder: "搜索目的地"
        }),
        b: common_vendor.o(search),
        c: !showResult.value
      }, !showResult.value ? {} : common_vendor.e({
        d: common_vendor.f(listData.value, (item, i, i0) => {
          return {
            a: i,
            b: common_vendor.o(_ctx.contactHost, i),
            c: common_vendor.o(_ctx.itemClick, i),
            d: "5f29c737-1-" + i0,
            e: common_vendor.p({
              item
            })
          };
        })
      }, {}));
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5f29c737"], ["__file", "D:/wtt/prictice/shestays-uniapp/pages/public/search/search.vue"]]);
wx.createPage(MiniProgramPage);
