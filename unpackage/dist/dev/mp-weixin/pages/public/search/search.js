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
    const listData = common_vendor.ref([]);
    const region = common_vendor.ref("");
    const pages = common_vendor.reactive({
      pageIndex: 1,
      totalPage: 0
      //总共有多少页数据
    });
    const getHouseListFun = async () => {
      loadStatus.value = "loading";
      console.log("请求==", region.value);
      try {
        const res = await common_api_common.getHouseByRegion({
          region: "中国"
        });
        if (res.code == 200) {
          listData.value = listData.value.concat(res.data.data);
          pages.totalPage = res.data.pageCount;
        }
        if (pages.pageIndex >= res.data.pageCount) {
          loadStatus.value = "noMore";
        }
      } catch (e) {
        common_vendor.index.showToast({
          title: e.msg,
          icon: "none"
        });
      }
    };
    const search = () => {
      showResult.value = true;
      getHouseListFun();
    };
    const citys = common_vendor.ref([
      {
        name: "中国"
      },
      {
        name: "美国"
      },
      {
        name: "日本"
      }
    ]);
    const cityClick = (item) => {
      region.value = item.name;
      listData.value = [];
      search();
    };
    const inputChange = (e) => {
      if (!e) {
        showResult.value = false;
      }
    };
    const styles = common_vendor.reactive({
      "borderColor": "#FFFFFF",
      "outLine": "none"
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(search),
        b: common_vendor.o(inputChange),
        c: common_vendor.o(($event) => region.value = $event),
        d: common_vendor.p({
          styles,
          inputBorder: false,
          type: "text",
          trim: "both",
          primaryColor: "#D8336D",
          placeholder: "搜索目的地",
          confirmType: "search",
          modelValue: region.value
        }),
        e: !showResult.value
      }, !showResult.value ? {
        f: common_vendor.f(citys.value, (item, i, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: i,
            c: common_vendor.o(($event) => cityClick(item), i)
          };
        })
      } : common_vendor.e({
        g: listData.value.length > 0
      }, listData.value.length > 0 ? {
        h: common_vendor.f(listData.value, (item, i, i0) => {
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
      } : {}));
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5f29c737"], ["__file", "D:/wtt/prictice/shestays-uniapp/pages/public/search/search.vue"]]);
wx.createPage(MiniProgramPage);
