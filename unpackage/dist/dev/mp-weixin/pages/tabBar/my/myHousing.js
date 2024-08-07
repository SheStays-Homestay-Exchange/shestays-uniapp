"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
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
        a: common_assets._imports_0$3,
        b: common_assets._imports_1$2,
        c: common_vendor.o(handleEditHousing),
        d: common_assets._imports_2$1,
        e: common_assets._imports_1$2,
        f: common_assets._imports_3$2,
        g: common_assets._imports_1$2,
        h: common_assets._imports_4,
        i: common_assets._imports_1$2,
        j: common_assets._imports_5$2,
        k: common_assets._imports_1$2,
        l: common_assets._imports_6$1,
        m: common_assets._imports_1$2,
        n: common_assets._imports_7,
        o: common_vendor.o(($event) => handleGoPage("/pages/tabBar/my/uploadHousing")),
        p: common_vendor.sr(editRef, "08053fd5-0", {
          "k": "editRef"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-08053fd5"]]);
wx.createPage(MiniProgramPage);
