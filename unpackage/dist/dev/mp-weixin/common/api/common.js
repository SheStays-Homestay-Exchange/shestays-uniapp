"use strict";
const common_js_request = require("../js/request.js");
function userAuthor(param) {
  return common_js_request.post("userAuthor", param);
}
function getHouseList(params) {
  return common_js_request.get("getHouseList", params);
}
exports.getHouseList = getHouseList;
exports.userAuthor = userAuthor;
