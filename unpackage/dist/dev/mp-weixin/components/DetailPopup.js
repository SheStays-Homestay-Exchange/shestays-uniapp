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
    },
    //小红书id
    id: {
      type: String,
      default: ""
    },
    //小红书昵称
    name: {
      type: String,
      default: ""
    },
    // 名字类型
    userNameType: {
      type: String,
      default: "小红书ID"
    }
  },
  emits: ["tapClose"],
  setup(__props, { emit: __emit }) {
    const emits = __emit;
    const props = __props;
    const detialpop = common_vendor.ref(null);
    common_vendor.watch(
      () => props.show,
      (v, ov) => {
        common_vendor.nextTick$1(() => {
          if (v) {
            detialpop.value.open();
          } else {
            detialpop && detialpop.value.close();
          }
        });
      },
      { deep: true }
    );
    const close = () => {
      emits("tapClose");
    };
    const btnClick = () => {
      common_vendor.index.setClipboardData({
        data: props.id,
        success: function() {
          close();
          common_vendor.index.showToast({
            title: `已复制房主${userNameType}到剪贴板`,
            icon: "none"
          });
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(close),
        b: common_vendor.p({
          type: "closeempty",
          size: "24"
        }),
        c: common_vendor.t(__props.name),
        d: common_vendor.t(__props.userNameType),
        e: common_vendor.t(__props.id),
        f: __props.id
      }, __props.id ? {
        g: common_vendor.o(btnClick)
      } : {}, {
        h: common_vendor.sr(detialpop, "b364594e-0", {
          "k": "detialpop"
        }),
        i: common_vendor.o(close),
        j: common_vendor.o(close),
        k: common_vendor.p({
          type: "center",
          ["is-mask-click"]: true
        })
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b364594e"]]);
wx.createComponent(Component);
