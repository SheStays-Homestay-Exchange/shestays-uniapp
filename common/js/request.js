import config from '@/common/config';
import cache from '@/common/js/cache';
import {buriedPoint} from '@/common/js/burying_point.js';
import store from '@/store';

import {
	msg,
	confirm
} from './util'

const { baseUrl } = config
const requestUrl = baseUrl
// 请求 返回promise
function request(options = {}) {
	//基础配置
	options.header = {
		'Content-Type': 'application/json;charset=UTF-8',
		// 'Content-Type': 'application/x-www-form-urlencoded',
	}
	// #ifndef APP-PLUS 
		options.header['Channel'] = 'MINI'
	// #endif 

	// token验证
	const token = cache.get('token')
	if (token) {
		// 往header头中添加token
		options.header['Authorization'] = token
	}
	//平台 
	// const platform = cache.get('platform')
	// options.header['platform'] = platform
	// 请求
	return new Promise((res, rej) => {
		// 请求中...
		uni.request({
			...options,
			success: async (result) => {
				// if (result.statusCode !== 200) {
				//   msg('出错了，请稍后再试！')
				//   return rej(result.data)
				// }
				if (result.data.code == 200) {
					return res(result.data)
				} else {
					if (result.data.code == 401) {
						const confirmText = token ? '登录已过期，请重新登录！' : '该页面需要登录后才能查看，请登录！'
						clearCache()
						console.log(store.state.user.isLoginTimeout, '--------======-----------------store.state.user.isLoginTimeout')
						if( !store.state.user.isLoginTimeout ){
							store.commit('setIsLoginTimeout', 'timeout')
							await confirm(confirmText)
							store.dispatch('loginOut')
						}
						return rej(result.data)
						
					} else {
						msg(result.data.message)
						return rej(result.data)
					}

					if (options.noMsg) {
						return rej(result.data)
					}
					return rej(result.data)
				}
					
			},
			fail: async(error) => {
				if( error.data.code == 401 ){
					const confirmText = token ? '登录已过期，请重新登录！' : '该页面需要登录后才能查看，请登录！'
					clearCache()
					await confirm(confirmText)
					store.dispatch('loginOut')
					return rej(result.data)
				}else{
					// msg('请求失败')
					return rej(error)
				}
			},
			complete:()=>{
				if(!options.hasOwnProperty("show")){
					const arr = options.url.split("/")
					buriedPoint(5,{key:arr[arr.length-1]})
				}
			}
		})
	})
};
// get请求
export function get(url, data = {}, options = {}) {
	options.url = requestUrl + url
	options.data = data
	options.method = 'GET'
	return request(options)
}

// post请求
export function post(url, data = {}, options = {}) {
	options.url = requestUrl + url
	options.data = data
	options.method = 'POST'
	return request(options)
}

export function deletes(url, data = {}, options = {}) {
	options.url = requestUrl + url
	options.data = data
	options.method = 'DELETE'
	return request(options)
}

// delete请求
// export function delete(url, data = {}, options = {}) {
// 	options.url = requestUrl + url
// 	options.data = data
// 	options.method = 'DELETE'
// 	return request(options)
// }

// 上传文件
export function uploadFile(fileList,data={}) {
	const userId =cache.get('userInfo').userId
	console.log('进入上传',fileList,'&&&&',userId)
	const uploadTasks = fileList.map((file, index) => {
		return new Promise((resolve, reject) => {
			uni.uploadFile({
				url: requestUrl + 'uploadAvatar',
				filePath: file,
				fileType: 'image',
				header: {
					 'content-type': 'multipart/form-data',
				},
				formData: {
					'userId': userId,
					'avatar': file,
					...data
				},
				name: 'avatar',
				success: function(res) {
					console.log('上传文件',res)
					let data = JSON.parse(res.data)
					if( data.code == 200 ){
						let url = data.data;
						return resolve(url)
					}else{
						uni.showToast({
							icon: 'none',
							title:`${data.error}`
						})
						return reject(data)
					}
				},
				fail: (res) => {
					console.log('上传文件失败啊',res)
					reject(res)
				}
			});
		})
	});
	return Promise.all(uploadTasks)
}

export function uploadHouseImg(fileList,data={}) {
	const userId =cache.get('userInfo').userId
	const uploadTasks = fileList.map((file, index) => {
		console.log(file, userId);
		return new Promise((resolve, reject) => {
			uni.uploadFile({
				url: requestUrl + 'uploadHouseImg',
				filePath: file,
				fileType: 'image',
				header: {
					 'content-type': 'multipart/form-data',
				},
				formData: {
					'userId': userId,
					'houseImgs': [file],
					...data
				},
				name: 'houseImgs',
				success: function(res) {
					console.log('图片上传文件====',res)
					let data = JSON.parse(res.data)
					if( data.code == 200 ){
						let url = data.data[0];
						return resolve(url)
					}else{
						uni.showToast({
							icon: 'none',
							title:`${data.error}`
						})
						return reject(data)
					}
				},
				fail: (res) => {
					console.log('上传文件失败啊',res)
					reject(res)
				}
			});
		})
	});
	return Promise.all(uploadTasks)
}

function clearCache() {
	//清除缓存
	// cache.clear()
	cache.remove('token')
	cache.remove('userInfo')
	store.commit('set_user_info', null)
	store.commit('set_token', '')
}
