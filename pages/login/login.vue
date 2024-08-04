<template>
	<view class="login-box">
		<view class="login-logo-box">
			<image src="@/static/image/logo.png"></image>
		</view>
		<view class="login-btn-box">
			<button class="login-btn">微信授权登录</button>
			<view class="argument" @click="handleClickChecked">
				<!-- <text class="disagree" v-if="!checked"></text> -->
				<label class="radio">
					<radio :value="checked" />
				</label>
				我确认已年满18周岁，且已认真阅读并同意<text>《SheStays换宿小程序隐私政策》</text>
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
	onLoad(()=>{
		console.log('进入首页。。')
	})
</script>

<style lang="scss" scoped>
	.login-logo-box{
		padding-top: 180rpx;
		width: 70vw;
		margin: 0 auto;
		image{
			width: 100%;
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
		align-items: center;
		justify-content: center;
		margin-top: 48upx;
		flex-wrap: wrap;
		color: #000;
		font-size: 24upx;
		text {
			color: #D8336D;
		}
		image{
			width: 28upx;
			height: 28upx;
			margin-right: 8upx;
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
</style>
