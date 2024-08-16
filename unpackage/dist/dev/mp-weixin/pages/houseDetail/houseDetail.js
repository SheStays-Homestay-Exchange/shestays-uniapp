"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_swiper_dot2 = common_vendor.resolveComponent("uni-swiper-dot");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_swiper_dot2 + _easycom_uni_icons2 + _easycom_uni_popup2)();
}
const _easycom_uni_swiper_dot = () => "../../uni_modules/uni-swiper-dot/components/uni-swiper-dot/uni-swiper-dot.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_swiper_dot + _easycom_uni_icons + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "houseDetail",
  setup(__props) {
    const popup = common_vendor.ref(null);
    const state = common_vendor.reactive({
      accommodationCondition: "舒适温馨",
      guestCapacity: "2人",
      openDate: "2024年6月-8月",
      messages: ["爱干净", "遵守规定", "保持安静"],
      facilities: "齐全的厨房设备，高速网络，舒适的床铺",
      hostImageSrc: "https://lf-flow-web-cdn.doubao.com/obj/flow-doubao/doubao_ext/static/image/avatar-transparent.ea272b11.png",
      hostName: "张三",
      successfulReceptionCount: "10 次",
      position: "加拿大 - 温哥华",
      icon: "star",
      bannerList: [
        { url: "https://res.klook.com/image/upload/q_85/activities/ori7zgidaf70ildeaazw.jpg", key: 1 },
        { url: "https://res.klook.com/image/upload/c_fill,w_1265,h_712/q_80/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/mn4cemkgx5r6fy6rgie6.webp", key: 2 },
        { url: "https://res.klook.com/image/upload/q_85/activities/ori7zgidaf70ildeaazw.jpg", key: 3 }
      ]
    });
    const houseInfo = [
      { label: "房源开放日期", value: state.openDate },
      { label: "对房客姐妹说的话", value: state.messages.join(", ") },
      { label: "房子设施", value: state.facilities }
    ];
    const handleCollect = () => {
      state.icon = state.icon === "star" ? "star-filled" : "star";
      console.log("collect");
    };
    const onContact = () => {
      console.log("联系房东");
      popup.value.open();
    };
    const handleCopy = () => {
      common_vendor.index.setClipboardData({
        data: "123456",
        success: () => {
          console.log("success");
          popup.value.close();
        },
        fail: () => {
          console.log("fail");
          popup.value.close();
        }
      });
    };
    common_vendor.onLoad(() => {
      console.log("进入详情，调用接口");
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(state.bannerList, (item, index, i0) => {
          return {
            a: item.url,
            b: index
          };
        }),
        b: common_vendor.o((...args) => _ctx.change && _ctx.change(...args)),
        c: _ctx.swiperDotIndex,
        d: common_vendor.o(_ctx.clickItem),
        e: common_vendor.p({
          info: _ctx.info,
          current: _ctx.current,
          mode: _ctx.mode,
          field: "content"
        }),
        f: common_vendor.t(state.position),
        g: common_vendor.t(state.accommodationCondition),
        h: common_vendor.t(state.guestCapacity),
        i: common_vendor.p({
          type: state.icon,
          size: "28"
        }),
        j: common_vendor.o(handleCollect),
        k: common_vendor.f(houseInfo, (item, index, i0) => {
          return {
            a: common_vendor.t(item.label),
            b: common_vendor.t(item.value),
            c: index
          };
        }),
        l: state.hostImageSrc,
        m: common_vendor.t(state.hostName),
        n: common_vendor.t(state.successfulReceptionCount),
        o: common_vendor.o(onContact),
        p: state.hostImageSrc,
        q: common_vendor.t(state.hostName),
        r: common_vendor.o(handleCopy),
        s: common_vendor.sr(popup, "a8f5680b-2", {
          "k": "popup"
        }),
        t: common_vendor.p({
          type: "center",
          ["border-radius"]: "10px 10px 0 0"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a8f5680b"], ["__file", "D:/wtt/prictice/shestays-uniapp/pages/houseDetail/houseDetail.vue"]]);
wx.createPage(MiniProgramPage);
