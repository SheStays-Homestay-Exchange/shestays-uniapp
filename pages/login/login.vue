<template>
	<view class="login-box">
		<view class="login-logo-box">
			<image src="@/static/image/logo-icon.png" class="icon"></image>
			<image src="@/static/image/logo-text.png" class="logo-text"></image>
		</view>
		<view class="login-btn-box">
			<button class="login-btn" @click="wxLogin">
				<image src="@/static/image/union.svg" class="btn-img"></image>
<<<<<<< HEAD
				微信授权登录
			</button>
			<button class="login-btn" open-type="getPhoneNumber" @getphonenumber="getphonenumber" style="margin-top: 20px;">
				<image src="@/static/image/union.svg" class="btn-img"></image>
				手机号码登录
=======
				微信获取code测试
>>>>>>> c1596c72d753386a492b4d6e3b3fb4808dd9867a
			</button>
			<view class="argument" @click="handleClickChecked">
				<!-- <text class="disagree" v-if="!checked"></text> -->
				<label class="radio">
					<radio :value="1" :checked="checked" color="#d8336d" />
				</label>
				<view class="argument-text">
					<text>我确认已年满18周岁，且已认真阅读并同意</text><text class="policy" @click="goRule">《SheStays换宿小程序隐私政策》</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { reactive, ref, onMounted  } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	
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
	
	const goRule = ()=>{
		uni.navigateTo({
			url: '/pages/rules/rules'
		})
	}
	
	const wxLogin = ()=>{
		// if(!checked.value){
		// 	uni.showToast({
		// 		title:'请阅读并勾选《SheStays换宿小程序隐私政策》',
		// 		icon:'none'
		// 	})
		// }
		
		// #ifdef MP-WEIXIN
<<<<<<< HEAD
		// 获取用户信息
		    uni.getUserProfile({
		      desc: '个人中心展示昵称、头像',
		      success: function (infoRes) {
		        console.log('用户信息返回：' , infoRes);
		      }
		    });
		// #endif
		
		uni.login({
			"provider": "weixin",
			"onlyAuthorize": true, // 微信登录仅请求授权认证
			success(event) {
				console.log('登录成功',event)
				uni.showToast({
					title:'获取code成功',
					icon:'none'
				})
			},
			fail(err){
				console.log('登录失败',err)
			}
		})

		
	}
	
	const getphonenumber=(e)=>{
		console.log('手机号返回',e)
		uni.login({
			"provider": "weixin",
			"onlyAuthorize": true, // 微信登录仅请求授权认证
			success(event) {
				console.log('获取登录code返回：',event)
				uni.showToast({
					title:'获取登录code成功',
					icon:'none'
				})
			},
			fail(err){
				console.log('登录失败',err)
			}
		})
	}
	onLoad(()=>{
		console.log('进入登录页。。')
		// uni.login({
		// 	"provider": "weixin",
		// 	"onlyAuthorize": true, // 微信登录仅请求授权认证
		// 	success(event) {
		// 		console.log('登录成功',event)
		// 	},
		// 	fail(err){
		// 		console.log('登录失败',err)
		// 	}
		// })
=======
		// uni.getUserProfile({
		// 	desc:'用于完善用户信息',
		// 	lang: 'zh_CN',
		// 	success(res){
		// 		console.log('获取用户信息成功',res)
		// 	},
		// 	fail(err){
		// 		console.log('获取用户信息失败',err)
		// 	}
		// })
		

		    // 获取用户信息
		    uni.getUserInfo({
		      provider: 'weixin',
		      success: function (infoRes) {
		        console.log('用户昵称为：',infoRes);
		      }
		    });
		
		
		// #endif
		
		

	}
	onLoad(()=>{
		console.log('进入登录页。。')
		
>>>>>>> c1596c72d753386a492b4d6e3b3fb4808dd9867a
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
			width: 380upx;
			height: 130rpx;
		}
	}
	.login-btn{
		background: #D8336D;
		color: #fff;
		border-radius: 40upx;
	}
	.login-btn-box{
		margin: 222rpx 30rpx 48rpx;
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
	}
</style>
