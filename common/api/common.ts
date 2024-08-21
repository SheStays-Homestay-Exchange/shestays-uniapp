import {
	get,
	post
} from '@/common/js/request.js';

import store from '../../store/index.js'
import config from "@/common/config";
import { registerRuntimeCompiler } from '../../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/hbuilderx-language-services/builtin-dts/common/vue2And3.js';

/**
 * 获取用户信息
 * @returns {Promise}
 */
export function getUserInfo(params,type) {
  return get('user/get/info',params,options)
}

/**
 * 手机号登录
 * @param {string} code 验证码
 * @param {string} phone 手机号
 * @returns {Promise}
 */
export function phoneLogin(code, phone) {
	return post('mch/merchant/login/phone', {
		code,
		phone,
	})
}

/**
 * 微信授权手机号登录
 * @param {string} code 鉴权码
 * @returns {Promise}
 */
export function wxGetPhoneLogin(code) {
	return post('mch/merchant/login/wx/phone', {
		code,
	})
}


/**
 * 微信授权登录
 */
export function userAuthor(param) {
	return post('userAuthor', param)
}


//接口名称：探索页面接口(房源列表)接口
export function getHouseList(params: any) {
	return get('getHouseList', params)
}

//接口名称：搜索
export function getHouseByRegion(params: any) {
	return get('getHouseByRegion', params)
}

//接口名称：搜索推荐
export function getName() {
	return get('getRecommendCountryName')
}

//接口名称：国家查询接口
export function getNation() {
	return get('getNation')
}

//接口名称：地区查询接口
export function getRegion(params) {
	return get('getRegion',params)
}

//接口名称：地区查询接口
export function getCity(params) {
	return get('getCity',params)
}

//接口名称：房源详情接口
export function getHouseDetail(params) {
	return get('getHouseById',params)
}

/**
 * 接口名称：编辑个人信息接口
 */
export function editUserData(param) {
	return post('editUserData', param)
}


//接口名称：根据id查询用户详情接口
export function getUserInfoByOpenId(params) {
	return get('getUserInfoByOpenId',params)
}

//接口名称：个人房源管理查询接口
export function getHouseByUserId(params) {
	return get('getHouseByUserId',params)
}

//接口名称：头像上传
export function uploadAvatar(params) {
	return post('uploadAvatar',params)
}

// 查看房源待审核
export function getUnderViewHouse() {
	return get('getUnderViewHouse')
}

// 提交房源信息
export function uploadHouse(params = {}) {
	return post('uploadHouse', params)
}