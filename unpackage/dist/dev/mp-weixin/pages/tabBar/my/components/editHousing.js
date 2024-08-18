"use strict";
const common_vendor = require("../../../../common/vendor.js");
const common_assets = require("../../../../common/assets.js");
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
const _sfc_main = {
  __name: "editHousing",
  setup(__props, { expose: __expose }) {
    const editPopup = common_vendor.ref(null);
    function open() {
      editPopup.value.open();
    }
    function close() {
      editPopup.value.close();
    }
    __expose({
      open,
      close
    });
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$9,
        b: common_vendor.o(($event) => close()),
        c: common_assets._imports_1$6,
        d: common_assets._imports_2$2,
        e: common_assets._imports_3$2,
        f: common_vendor.sr(editPopup, "4b1b2bdd-0", {
          "k": "editPopup"
        }),
        g: common_vendor.p({
          type: "bottom",
          ["is-mask-click"]: false,
          ["safe-area"]: false
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4b1b2bdd"]]);
wx.createComponent(Component);
