"use strict";
const env = "test";
let baseUrl;
let shreUrl;
let shareType;
let envVersion;
let myWechatNextVersion = "1.0.0";
{
  baseUrl = "http://122.51.248.243:9090/";
  shreUrl = "http://122.51.248.243:9090/";
  shareType = 2;
  envVersion = "develop";
}
const config = {
  env,
  baseUrl,
  shreUrl,
  shareType,
  envVersion,
  myWechatNextVersion
};
exports.config = config;
