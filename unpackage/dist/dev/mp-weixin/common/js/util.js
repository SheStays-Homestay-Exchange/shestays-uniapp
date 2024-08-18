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
function date(timeStamp, format = "Y-m-d H:i:s") {
  if (!timeStamp)
    return;
  let _date = new Date(timeStamp), Y = _date.getFullYear(), m = _date.getMonth() + 1, d = _date.getDate(), H = _date.getHours(), i = _date.getMinutes(), s = _date.getSeconds();
  m = m < 10 ? "0" + m : m;
  d = d < 10 ? "0" + d : d;
  H = H < 10 ? "0" + H : H;
  i = i < 10 ? "0" + i : i;
  s = s < 10 ? "0" + s : s;
  return format.replace(/[YmdHis]/g, (key) => {
    return {
      Y,
      m,
      d,
      H,
      i,
      s
    }[key];
  });
}
exports.confirm = confirm;
exports.date = date;
exports.msg = msg;
