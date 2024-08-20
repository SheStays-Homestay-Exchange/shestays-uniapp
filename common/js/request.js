import config from '@/common/config';
import cache from '@/common/js/cache';
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

// 上传文件
export function uploadFile(fileList) {
	const userId =cache.get('userInfo').userId
	const uploadTasks = fileList.map((file, index) => {
		return new Promise((resolve, reject) => {
			uni.uploadFile({
				url: requestUrl + 'uploadAvatar',
				filePath: file,
				fileType: 'image',
				// header: {
				// 	'Authorization': token
				// },
				formData:{
					userId: userId,
					avatar: file
				},
				name: 'file',
				success: function(res) {
					console.log('上传文件',res)
					let data = JSON.parse(res.data)
					if( data.code == 604 ){
						uni.showToast({
							icon: 'none',
							title:`${data.msg}`
						})
						return reject(data)
					}else{
						let url = data.data.fileUrl;
						return resolve(url)
					}
				},
				fail: (res) => {
					console.log(res)
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
