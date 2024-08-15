<template>
	<uni-popup ref="detialpop" type="center"  :is-mask-click="true" @close="close" @maskClick="close">
		<div class="popup-content">
			<!-- 删除图标 -->
			<view class="ptc-icon">
				<uni-icons type="closeempty" size="24" @click="close"></uni-icons>
			</view>
			<view class="info-box">
				<view class="img">
				</view>
				<view class="name-box">
					<view class="name">用户名：花花</view>
					<view>小红书ID：花花</view>
				</view>
			</view>
			<view class="tips-box">
				Tips✨：主动自我介绍说明目的的成功率更高哦~ 例如：嗨，你好！我从SheStays看到了您的房源。期待能够获得借宿的机会，一起分享有趣的经历。
			</view>
			<view class="btn-box">
				<view class="btn" @click="btnClick">
					复制ID
				</view>
			</view>
		</div>
	</uni-popup>
</template>

<script setup>
	import { ref,watch,nextTick,onMounted  } from 'vue'
	
	const emits = defineEmits(['tapClose'])
	const props = defineProps({
		show: {
			default: false,
			type: Boolean
		},
	})
	const detialpop = ref(null)
	watch(()=>props.show,(v,ov)=>{
		nextTick(()=>{
			if (v) {
				detialpop.value.open()
			} else {
				detialpop && detialpop.value.close()
			}
		})
	},{ deep:true })
	
	const close = (()=>{
		emits('tapClose')
	})
	
	const btnClick =()=>{
		uni.setClipboardData({
			data: 'hello',
			success: function () {
				close()
				uni.showToast({
					title:'已复制房主小红书ID到剪贴板',
					icon:'none'
				})
			}
		});
	}
</script>

<style lang="scss" scoped>
	.popup-content{
		max-width: 70%;
		background: #fff;
		box-sizing: border-box;
		padding: 20rpx 32rpx 40rpx 32rpx;
		box-shadow: 0rpx 0rpx 10rpx 1rpx rgba(179,179,179,0.3);
		border-radius: 24rpx;
		margin: auto;
		.ptc-icon{
			text-align: right;
		}
		.info-box{
			display: flex;
			align-items: center;
			justify-content: flex-start;
			border-bottom: 2upx solid #bbb;
			padding-bottom: 26upx;
			margin-bottom: 26upx;
			.img{
				width: 104upx;
				height: 104upx;
				background-color: #C4C4C4;
				border-radius: 50%;
				margin-right: 32upx;
			}
			.name-box{
				font-size: 32upx;
				font-weight: bold;
				color: #000B3B;
				.name{
					margin-bottom: 8upx;
				}
			}
		}
		.tips-box{
			font-size: 28upx;
			color: #5E5E5E;
		}
		.btn-box{
			display: flex;
			justify-content: center;
			.btn{
				width: 260upx;
				height: 68upx;
				line-height: 68upx;
				font-size: 32upx;
				font-weight: bold;
				color: #fff;
				background: #D8336D;
				text-align: center;
				border-radius: 32upx;
				margin-top: 60upx;
			}
		}
	}
</style>