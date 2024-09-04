<template>
	<view class="login-box">
		<view class="login-logo-box">
			<image src="@/static/image/logo-text.png" class="logo-text"></image>
		</view>
		<view class="login-btn-box">
			<button class="login-btn" @click="wxLogin" v-if="!checked">
				<image src="@/static/image/union.svg" class="btn-img"></image>
				手机号快捷登录
			</button>
			<button class="login-btn" open-type="getPhoneNumber" @getphonenumber="getphonenumber" style="margin-top: 20px;" v-else>
				<image src="@/static/image/union.svg" class="btn-img"></image>
				手机号快捷登录
			</button>
			<view class="argument">
				<radio-group>
					<label class="radio">
						<radio :checked="checked" color="#d8336d" @click="handleClickChecked"/>
					</label>
				</radio-group>
				<view class="argument-text">
					<text>我确认已年满18周岁，且已认真阅读并同意</text><text class="policy" @click="goRule">《SheStays借换宿小程序用户协议》</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { reactive, ref, onMounted  } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { userAuthor, saveBuriedPoint } from '@/common/api/common'
	import cache from '@/common/js/cache.js'
	import store from '@/store';
	import {buriedPoint} from '@/common/js/burying_point.js'
	
	// 打开协议勾选提示
	const checked = ref(false)
	const showArgumentToast = () => {
		if (!checked.value) {
			uni.showToast({
				title: '请先阅读并同意协议',
				icon: 'none',
			})
			return Promise.reject(false)
		} else {
			return Promise.resolve(true)
		}
	}
	
	const handleClickChecked = ()=>{
		checked.value = !checked.value
	}
	
	const goRule = ()=>{
		uni.navigateTo({
			url: '/pages/rules/rules'
		})
	}
	
	const wxLogin = ()=>{
		if(!checked.value){
			uni.showToast({
				title:'请阅读并勾选《SheStays换宿小程序隐私政策》',
				icon:'none'
			})
		}
	}
	
	var locatcionObj = {}
	const getphonenumber=(e)=>{
		console.log('手机号返回',e)
		// #ifdef MP-WEIXIN
			uni.login({
				"provider": "weixin",
				"onlyAuthorize": true, // 微信登录仅请求授权认证
				success(event) {
					wx.getFuzzyLocation({
					 type: 'wgs84',
					 success (res) {
						 if(res.errMsg.includes('ok')){
							 locatcionObj.latitude = res.latitude
							 locatcionObj.longitude = res.longitude
							 console.log('地理位置信息成功',res)
							 //去登录
							 userAuthorFun(e.detail,event.code)
						 }
					   
					 },
					 fail(err){
						 console.log('地理位置失败',err)
					 }
					})
				},
				fail(err){
					console.log('手机号授权',err)
				}
			})
		// #endif
		// #ifndef MP-WEIXIN
		uni.showToast({
			title:'只支持微信小程序平台',
			icon:'none'
		})
		// #endif
		
	}
	
	const userAuthorFun = (param,loginCode)=>{
		let params = {
			encryptedData: param.encryptedData,
			iv: param.iv,
			code: loginCode,
		}
		if(xhsId.value){
			params.xhsId = xhsId.value
		}
		userAuthor(params).then(res=>{
			if(res.code == 200){
				//调用埋点接口
				// pointFun(res.data.userId)
				//保存登录信息
				cache.put('userInfo',res.data)
				buriedPoint(0)
				uni.switchTab({
					url:'/pages/tabBar/index/index'
				})
			}
		}).catch(err=>{
			console.log('登录失败')
			uni.showToast({
				title:err.msg,
				 icon:'none'
			})
		})
	}
	
	const pointFun = async (userId)=>{
		try{
			const equipment = cache.get('device')
			const res = await saveBuriedPoint({
				buriedId:'USER_REGISTRATION',
				key: userId,
				location: JSON.stringify(locatcionObj),
				operation_type:'login',
				equipment:equipment||''
			})
		}catch(err){
			console.log('埋点接口错误',err)
		}
	}
	
	//场景：通过网页扫描二维码进入小程序
	const xhsId = ref('')
	onLoad((option)=>{
		let a = getCurrentPages()
		let indexCurrent = a[a.length-1].$page.fullPath
		console.log('获取当前页面全路径：',indexCurrent)
		console.log('登录页option',option)
		xhsId.value = option.xhsId || ''
	})

</script>

<style lang="scss" scoped>
	.login-logo-box{
		padding-top: 180rpx;
		width: 70vw;
		margin: 0 auto;
		display: flex;
		align-item: center;
		justify-content: center;
		.icon{
			width: 128upx;
			height: 124upx;
		}
		.logo-text{
			width: 220upx;
			height: 260rpx;
		}
	}
	.login-btn{
		background: #D8336D;
		color: #fff;
		border-radius: 40upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.login-btn-box{
		margin: 176rpx 30rpx 48rpx;
	}
	.argument {
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;
		margin-top: 48upx;
		flex-wrap: wrap;
		color: #000;
		font-size: 24upx;
		&-text{
			flex: 1;
			margin-left: 16upx;
		}
		.policy {
			color: #D8336D;
		}
		label{
			width: 32upx;
			height: 32upx;
			radio{
				width: 32upx;
				height: 32upx;
				transform: scale(0.7);
			}
		}
		.disagree{
			display: inline-block;
			border: 2upx solid #fff;
			border-radius: 50%;
			width: 24upx;
			height: 24rpx;
			margin-right: 8upx;
		}
	}
	.btn-img{
		width: 38upx;
		height: 34upx;
		margin-right: 10rpx;
	}
</style>
