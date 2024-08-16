"use strict";
const common_js_request = require("../js/request.js");
function userAuthor(param) {
  return common_js_request.post("userAuthor", param);
}
function getHouseList(params) {
  return common_js_request.get("getHouseList", params);
}
function getHouseByRegion(params) {
  return common_js_request.get("getHouseByRegion", params);
}
function getName() {
  return common_js_request.get("getRecommendCountryName");
}
exports.getHouseByRegion = getHouseByRegion;
exports.getHouseList = getHouseList;
exports.getName = getName;
exports.userAuthor = userAuthor;
