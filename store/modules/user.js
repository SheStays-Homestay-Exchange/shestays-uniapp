
import cache from "@/common/js/cache.js";

import { getUserInfo } from "@/common/api/common";


export default {
	state: {
		token: cache.get("token") || "",
		user_info: cache.get("userInfo") ||   null,
		show_remote_login:false,
		show_official_account:true,
		IMSDKAppID:null,
		IMSecretKey:null,
		platefrom:cache.get("paltform") ||   null,  //获取平台信息
		search_history: cache.get("searchHistory") ||   null,   //获取搜索历史记录
		unreadCount: 0,
		activeToastData: [],
		isLoginTimeout: '',   //是否登录超时
	},
	mutations: {
		setToken(state, token) {
			if (token.length) {
				cache.put("token", token);
				return (state.token = token);
			}
			state.token = "";
		},
		setUserInfo(state, info) {
			console.log('进入mutations',state,info)
			if (!info) {
				state.user_info = null;
				return;
			}
			cache.put("userInfo", info);
			state.user_info = info;
		},
		setShowRemoteLogin(state, status){
			state.show_remote_login = status
		},
		setOfficialAccount(state, status){
			state.show_official_account = status
		},
		// 设置页面的平台
		setPlateform(state, status){
			state.platefrom = status
		},
		//设置搜索历史记录
		setSearchHistory(state,data){
			cache.put("searchHistory", data);
			state.search_history = data;
		},
    setUnreadCount(state, data){
      state.unreadCount = data
    },
    setActiveToastData(state, data){
      state.activeToastData = data
    },
		// 设置是否登录超时
		setIsLoginTimeout(state, status){
			state.isLoginTimeout = status
		},
	},
	actions: {
		//登录
		login({ commit }, data) {
			return new Promise((resolve, reject) => {
				const { type, code } = data;
				if (!data.code) {
					reject('code获取失败');
				} else {
					//登录操作
					console.log('登录操作')
				}
			})
		},

		// 微信授权手机号登录
		wxAuthPhoneLogin({
			commit
		}, code) {
			return new Promise(async (resolve, reject) => {
				let res = await wxGetPhoneLogin(code);
				commit("setToken", res.data.access_token);
				resolve(res);
			});
		},
		// 获取用户信息
		async getUserInfo({ commit }) {
		  let res = await getUserInfo();
			commit("setUserInfo", res.data);
		},
    // 登出
		async loginOut({
			commit
		}) {
			cache.remove('token')
			cache.remove('userInfo')
			commit("setToken", "");
			commit("setUserInfo", null);
			cache.put('token','')
			cache.put('userInfo','')
		  uni.reLaunch({
				url: '/pages/login/login'
		  })
		},
	},
};
