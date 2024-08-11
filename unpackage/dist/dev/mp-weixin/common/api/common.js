"use strict";
const common_js_request = require("../js/request.js");
function getHouseList(params) {
  return common_js_request.get("getHouseList", params);
}
exports.getHouseList = getHouseList;
