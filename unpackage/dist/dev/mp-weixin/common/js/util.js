"use strict";
const common_vendor = require("../vendor.js");
const msg = (title = "", param = {}, cb) => {
  if (!title)
    return;
  common_vendor.index.showToast({
    title,
    icon: param.icon || "none",
    success: () => {
      if (cb)
        cb();
    }
  });
};
const confirm = (content = "", showCancel = true) => {
  if (!content)
    return;
  return new Promise((reslove, reject) => {
    common_vendor.index.showModal({
      content,
      showCancel,
      success: function(res) {
        if (res.confirm) {
          return reslove();
        } else if (res.cancel) {
          msg("您已取消操作");
          return reject();
        }
      }
    });
  });
};
exports.confirm = confirm;
exports.msg = msg;
