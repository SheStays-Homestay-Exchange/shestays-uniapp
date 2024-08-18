"use strict";
const common_vendor = require("../../../../common/vendor.js");
const common_js_util = require("../../../../common/js/util.js");
const common_api_common = require("../../../../common/api/common.js");
const common_js_cache = require("../../../../common/js/cache.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  (_easycom_uni_easyinput2 + _easycom_uni_datetime_picker2)();
}
const _easycom_uni_easyinput = () => "../../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_datetime_picker = () => "../../../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_datetime_picker)();
}
const _sfc_main = {
  __name: "updateMyInfo",
  setup(__props) {
    var userInfo = {};
    common_vendor.onLoad(() => {
      userInfo = typeof common_js_cache.cache.get("userInfo") == "string" ? JSON.parse(common_js_cache.cache.get("userInfo")) : common_js_cache.cache.get("userInfo");
    });
    const form = common_vendor.reactive({
      date: "请选择生日",
      sex: "",
      phone: "",
      wechatId: "",
      des: ""
    });
    const dateChange = (e) => {
      form.date = e;
    };
    const dateEnd = common_js_util.date(/* @__PURE__ */ new Date(), "Y-m-d");
    const radioChange = (e) => {
      form.sex = e.detail.value;
    };
    common_vendor.onLoad(() => {
    });
    const validateFun = () => {
      if (!form.userName) {
        common_js_util.msg("请输入用户名");
        return false;
      } else if (!form.sex) {
        common_js_util.msg("请选择性别");
        return false;
      } else if (!form.date) {
        common_js_util.msg("请选择生日");
        return false;
      } else if (!form.des) {
        common_js_util.msg("请输入简介");
        return false;
      }
      let reg = /^1[3-9][0-9]{9}$/;
      if (!form.phone) {
        common_js_util.msg("请输入手机号");
        return false;
      } else if (!reg.test(form.phone)) {
        common_js_util.msg("手机号码格式有误，请重新输入");
        return false;
      }
      return true;
    };
    const editUserDataFun = (param) => {
      common_api_common.editUserData(param).then((res) => {
      }).catch((e) => {
        console.log("错误==", e);
      });
    };
    const submit = () => {
      let ifPass = validateFun();
      if (ifPass) {
        let dateArr = form.date.split("-");
        console.log("生日", dateArr);
        editUserDataFun({
          userName: form.userName,
          genderDictCode: form.sex,
          phone: form.phone,
          personalProfile: form.des,
          avatar: form.avatarimg[0],
          bdYear: dateArr[0],
          bdMonth: dateArr[1],
          bdDay: dateArr[2],
          userId: userInfo.userId,
          nationId: "1",
          //国家id
          regionId: "1",
          //区域id
          cityId: "1"
          //城市id
          // wechatId: '1',
        });
      }
      console.log(ifPass, form);
    };
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
          console.log("图片上传", e);
          if (e.tempFilePaths[0].split(".")[e.tempFilePaths[0].split(".").length - 1].includes("gif")) {
            common_js_util.msg("暂不支持上传gif图片，请重新选择后上传");
            return false;
          }
          form.avatarimg = e.tempFilePaths;
          form.avatar = e.tempFiles[0];
        },
        fail(e) {
          console.log("选择图片错误", e);
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: form.avatarimg,
        b: common_vendor.o(uploadHead),
        c: common_vendor.o(($event) => form.userName = $event),
        d: common_vendor.p({
          type: "text",
          placeholder: "未设置",
          maxlength: "16",
          modelValue: form.userName
        }),
        e: common_vendor.o(radioChange),
        f: common_vendor.o(($event) => form.phone = $event),
        g: common_vendor.p({
          type: "text",
          placeholder: "未设置",
          maxlength: "11",
          modelValue: form.phone
        }),
        h: common_vendor.t(form.date),
        i: common_vendor.o(dateChange),
        j: common_vendor.p({
          type: "date",
          value: form.date,
          border: _ctx.none,
          end: common_vendor.unref(dateEnd)
        }),
        k: common_vendor.o(($event) => form.des = $event),
        l: common_vendor.p({
          type: "textarea",
          maxlength: "300",
          modelValue: form.des
        }),
        m: common_vendor.o(submit)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-820c3591"], ["__file", "D:/WTT/job/shestays-uniapp/pages/tabBar/my/updateMyInfo/updateMyInfo.vue"]]);
wx.createPage(MiniProgramPage);
