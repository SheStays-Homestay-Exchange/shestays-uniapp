"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Math) {
  editHousing();
}
const editHousing = () => "./components/editHousing.js";
const _sfc_main = {
  __name: "myHousing",
  setup(__props) {
    function handleGoPage(url) {
      common_vendor.index.navigateTo({
        url
      });
    }
    const editRef = common_vendor.ref(null);
    function handleEditHousing() {
      editRef.value.open();
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleEditHousing),
        b: common_vendor.o(($event) => handleGoPage("/pages/tabBar/my/uploadHousing")),
        c: common_vendor.sr(editRef, "08053fd5-0", {
          "k": "editRef"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-08053fd5"], ["__file", "D:/wtt/prictice/shestays-uniapp/pages/tabBar/my/myHousing.vue"]]);
wx.createPage(MiniProgramPage);
