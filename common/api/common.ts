import {
	get,
	post
} from '@/common/js/request.js';

import store from '../../store/index.js'
import config from "@/common/config";

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
 * 登录
 */
export function appMessageLogin(param) {
	return post('user/appMessageLogin', param)
}


//接口名称：探索页面接口(房源列表)接口
export function getHouseList(params: any) {
	return get('getHouseList', params)
}


