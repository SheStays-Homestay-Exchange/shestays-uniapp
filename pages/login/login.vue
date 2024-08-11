<template>
	<view class="login-box">
		<view class="login-logo-box">
			<image src="@/static/image/logo-icon.png" class="icon"></image>
			<image src="@/static/image/logo-text.png" class="logo-text"></image>
		</view>
		<view class="login-btn-box">
			<button class="login-btn" @click="wxLogin">
				<image src="@/static/image/union.svg" class="btn-img"></image>
				微信授权登录</button>
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
		if(!checked.value){
			uni.showToast({
				title:'请阅读并勾选《SheStays换宿小程序隐私政策》',
				icon:'none'
			})
		}
	}
	onLoad(()=>{
		console.log('进入首页。。')
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
