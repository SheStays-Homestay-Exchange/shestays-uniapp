"use strict";
const common_vendor = require("../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_popup = () => "../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "DetailPopup",
  props: {
    show: {
      default: false,
      type: Boolean
    }
  },
  emits: ["tapClose"],
  setup(__props, { emit: __emit }) {
    const emits = __emit;
    const props = __props;
    const detialpop = common_vendor.ref(null);
    common_vendor.watch(() => props.show, (v, ov) => {
      common_vendor.nextTick$1(() => {
        if (v) {
          detialpop.value.open();
        } else {
          detialpop && detialpop.value.close();
        }
      });
    }, { deep: true });
    const close = () => {
      emits("tapClose");
    };
    const btnClick = () => {
      common_vendor.index.setClipboardData({
        data: "hello",
        success: function() {
          close();
          common_vendor.index.showToast({
            title: "已复制房主小红书ID到剪贴板",
            icon: "none"
          });
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(close),
        b: common_vendor.p({
          type: "closeempty",
          size: "24"
        }),
        c: common_vendor.o(btnClick),
        d: common_vendor.sr(detialpop, "b364594e-0", {
          "k": "detialpop"
        }),
        e: common_vendor.o(close),
        f: common_vendor.o(close),
        g: common_vendor.p({
          type: "center",
          ["is-mask-click"]: true
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b364594e"], ["__file", "D:/WTT/job/shestays-uniapp/components/DetailPopup.vue"]]);
wx.createComponent(Component);
