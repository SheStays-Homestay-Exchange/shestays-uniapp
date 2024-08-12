"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_swiper_dot2 = common_vendor.resolveComponent("uni-swiper-dot");
  _easycom_uni_swiper_dot2();
}
const _easycom_uni_swiper_dot = () => "../../uni_modules/uni-swiper-dot/components/uni-swiper-dot/uni-swiper-dot.js";
if (!Math) {
  _easycom_uni_swiper_dot();
}
const _sfc_main = {
  __name: "houseDetail",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(3, (item, index, i0) => {
          return {
            a: common_vendor.t(index + 1),
            b: common_vendor.n("swiper-item" + index),
            c: index
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
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a8f5680b"], ["__file", "D:/WTT/job/shestays-uniapp/pages/houseDetail/houseDetail.vue"]]);
wx.createPage(MiniProgramPage);
