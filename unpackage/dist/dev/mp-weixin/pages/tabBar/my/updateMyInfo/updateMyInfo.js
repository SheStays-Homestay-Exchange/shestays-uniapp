"use strict";
const common_vendor = require("../../../../common/vendor.js");
const common_assets = require("../../../../common/assets.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  _easycom_uni_easyinput2();
}
const _easycom_uni_easyinput = () => "../../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
if (!Math) {
  _easycom_uni_easyinput();
}
const _sfc_main = {
  __name: "updateMyInfo",
  setup(__props) {
    common_vendor.ref({
      avatar: ""
    });
    const uploadHead = () => {
      common_vendor.index.chooseImage({
        count: 1,
        crop: {
          width: 100,
          height: 100
        },
        success(e) {
          if (e.tempFilePaths[0].split(".")[e.tempFilePaths[0].split(".").length - 1].includes("gif")) {
            common_vendor.index.showToast({
              title: "暂不支持上传gif图片，请重新选择后上传",
              icon: "none"
            });
            return false;
          }
          uploadFile(e.tempFilePaths).then((res) => {
            form.avatar = res[0];
          }).catch((e2) => {
            console.log("图片上传错误", e2);
          });
        },
        fail(e) {
          console.log("选择图片错误", e);
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$8,
        b: common_vendor.o(uploadHead),
        c: common_vendor.p({
          type: "text",
          placeholder: "未设置"
        }),
        d: common_vendor.p({
          type: "text"
        }),
        e: common_vendor.p({
          type: "text",
          placeholder: "未设置"
        }),
        f: common_vendor.p({
          type: "text",
          placeholder: "未设置"
        }),
        g: common_assets._imports_1$1,
        h: common_assets._imports_1$1,
        i: common_vendor.p({
          type: "textarea"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-820c3591"]]);
wx.createPage(MiniProgramPage);
