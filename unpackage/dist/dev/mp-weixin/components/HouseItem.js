"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  __name: "HouseItem",
  props: {
    item: {
      default: () => {
      },
      type: Object
    }
  },
  emits: ["itemClick", "contactHost"],
  setup(__props, { emit: __emit }) {
    const emits = __emit;
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i;
      return common_vendor.e({
        a: ((_b = (_a = __props.item) == null ? void 0 : _a.houseImgs) == null ? void 0 : _b.length) > 0
      }, ((_d = (_c = __props.item) == null ? void 0 : _c.houseImgs) == null ? void 0 : _d.length) > 0 ? {
        b: common_vendor.f(__props.item.houseImgs, (el, index, i0) => {
          return {};
        })
      } : {}, {
        c: common_vendor.t(__props.item.countryName),
        d: common_vendor.t(__props.item.regionName),
        e: __props.item.startTime
      }, __props.item.startTime ? {
        f: common_vendor.t(__props.item.startTime.split(" ")[0])
      } : {}, {
        g: ((_f = (_e = __props.item) == null ? void 0 : _e.houseImgs) == null ? void 0 : _f.length) > 0
      }, ((_h = (_g = __props.item) == null ? void 0 : _g.houseImgs) == null ? void 0 : _h.length) > 0 ? {} : {}, {
        h: common_vendor.t(__props.item.describle),
        i: common_vendor.o(($event) => emits("contactHost", __props.item)),
        j: common_vendor.n(((_i = __props.item.houseImgs) == null ? void 0 : _i.length) > 0 ? "" : "hava-border"),
        k: common_vendor.o(($event) => emits("itemClick", __props.item))
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b7591948"], ["__file", "D:/WTT/job/shestays-uniapp/components/HouseItem.vue"]]);
wx.createComponent(Component);
