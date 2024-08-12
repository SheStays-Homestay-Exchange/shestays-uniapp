"use strict";
const common_vendor = require("../vendor.js");
const common_config_index = require("../config/index.js");
const common_js_cache = require("./cache.js");
const store_index = require("../../store/index.js");
const common_js_util = require("./util.js");
const { baseUrl } = common_config_index.config;
const requestUrl = baseUrl;
function request(options = {}) {
  options.header = {
    "Content-Type": "application/json;charset=UTF-8"
    // 'Content-Type': 'application/x-www-form-urlencoded',
  };
  options.header["Channel"] = "MINI";
  const token = common_js_cache.cache.get("token");
  if (token) {
    options.header["Authorization"] = token;
  }
  return new Promise((res, rej) => {
    common_vendor.index.request({
      ...options,
      success: async (result2) => {
        if (result2.data.code === 200) {
          return res(result2.data);
        } else {
          if (result2.data.code === 401) {
            const confirmText = token ? "登录已过期，请重新登录！" : "该页面需要登录后才能查看，请登录！";
            clearCache();
            console.log(store_index.store.state.user.isLoginTimeout, "--------======-----------------store.state.user.isLoginTimeout");
            if (!store_index.store.state.user.isLoginTimeout) {
              store_index.store.commit("setIsLoginTimeout", "timeout");
              await common_js_util.confirm(confirmText);
              store_index.store.dispatch("loginOut");
            }
            return rej(result2.data);
          } else {
            common_js_util.msg(result2.data.message);
            return rej(result2.data);
          }
        }
      },
      fail: async (error) => {
        if (error.data.code == 401) {
          const confirmText = token ? "登录已过期，请重新登录！" : "该页面需要登录后才能查看，请登录！";
          clearCache();
          await common_js_util.confirm(confirmText);
          store_index.store.dispatch("loginOut");
          return rej(result.data);
        } else {
          return rej(error);
        }
      }
    });
  });
}
function get(url, data = {}, options = {}) {
  options.url = requestUrl + url;
  options.data = data;
  options.method = "GET";
  return request(options);
}
function clearCache() {
  common_js_cache.cache.remove("token");
  common_js_cache.cache.remove("userInfo");
  store_index.store.commit("set_user_info", null);
  store_index.store.commit("set_token", "");
}
exports.get = get;
