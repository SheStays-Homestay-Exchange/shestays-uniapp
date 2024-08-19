"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const common_api_common = require("../../../common/api/common.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  _easycom_uni_easyinput2();
}
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
if (!Math) {
  (_easycom_uni_easyinput + HouseItem + DetailPopup)();
}
const HouseItem = () => "../../../components/HouseItem.js";
const DetailPopup = () => "../../../components/DetailPopup.js";
const _sfc_main = {
  __name: "search",
  setup(__props) {
    common_vendor.onLoad(() => {
      recommend();
    });
    const showResult = common_vendor.ref(false);
    common_vendor.ref("contentdown");
    const listData = common_vendor.ref([]);
    const region = common_vendor.ref("");
    common_vendor.reactive({
      pageIndex: 1,
      totalPage: 0
      //总共有多少页数据
    });
    const noData = common_vendor.ref(false);
    const getHouseListFun = async () => {
      var _a;
      noData.value = false;
      common_vendor.index.showLoading({
        title: "加载中"
      });
      try {
        const res = await common_api_common.getHouseByRegion({
          region: region.value
        });
        if (res.code == 200) {
          listData.value = res.data || [];
          if (((_a = res.data) == null ? void 0 : _a.length) == 0) {
            noData.value = true;
          }
        }
        common_vendor.index.hideLoading();
      } catch (e) {
        common_vendor.index.showToast({
          title: e.msg,
          icon: "none"
        });
        common_vendor.index.hideLoading();
      }
    };
    const popShow = common_vendor.ref(false);
    const contactHost = (item) => {
      popShow.value = true;
    };
    const itemClick = (item) => {
      common_vendor.index.navigateTo({
        url: "/pages/houseDetail/houseDetail"
      });
    };
    const search = () => {
      getHouseListFun();
      showResult.value = true;
    };
    const citys = common_vendor.ref([]);
    const recommend = () => {
      common_api_common.getName().then((res) => {
        if (res.code == 200) {
          citys.value = res.data || [];
        }
      }).catch((err) => {
      });
    };
    const cityClick = (item) => {
      region.value = item.countryName;
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
        a: common_assets._imports_0$1,
        b: common_vendor.o(search),
        c: common_vendor.o(inputChange),
        d: common_vendor.o(($event) => region.value = $event),
        e: common_vendor.p({
          styles,
          inputBorder: false,
          type: "text",
          trim: "both",
          primaryColor: "#D8336D",
          placeholder: "搜索目的地",
          confirmType: "search",
          modelValue: region.value
        }),
        f: !showResult.value
      }, !showResult.value ? {
        g: common_vendor.f(citys.value, (item, i, i0) => {
          return {
            a: common_vendor.t(item.countryName),
            b: i,
            c: common_vendor.o(($event) => cityClick(item), i)
          };
        })
      } : common_vendor.e({
        h: listData.value.length > 0
      }, listData.value.length > 0 ? {
        i: common_vendor.f(listData.value, (item, i, i0) => {
          return {
            a: i,
            b: common_vendor.o(contactHost, i),
            c: common_vendor.o(itemClick, i),
            d: "5f29c737-1-" + i0,
            e: common_vendor.p({
              item
            })
          };
        })
      } : {}, {
        j: noData.value
      }, noData.value ? {} : {}), {
        k: common_vendor.o(($event) => popShow.value = false),
        l: common_vendor.p({
          show: popShow.value
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5f29c737"]]);
wx.createPage(MiniProgramPage);
