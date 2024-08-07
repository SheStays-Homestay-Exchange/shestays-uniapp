<template>
	<view class="update-info">
		<view class="user-icon">
			<image class="user-icon-image" src="" mode=""></image>
			<view class="user-update-icon">
				<image class="update-icon" src="../../../../static/image/camera-01.png" mode=""></image>
			</view>
		</view>
		<view class="user-cli">
			<view class="user-title">
				用户名
			</view>
			<uni-easyinput type="text" placeholder="未设置"></uni-easyinput>
		</view>
		<view class="user-cli">
			<view class="user-title">
				性别
			</view>
			<uni-easyinput type="text"></uni-easyinput>
		</view>
		<view class="user-cli">
			<view class="user-title">
				微信号
			</view>
			<uni-easyinput type="text" placeholder="未设置"></uni-easyinput>
		</view>
		<view class="user-cli">
			<view class="user-title">
				手机号
			</view>
			<uni-easyinput type="text" placeholder="未设置"></uni-easyinput>
		</view>
		<view class="user-cli">
			<view class="user-title">
				生日
			</view>
			<view class="user-info">
				<view class="user-info-title">
					2000-9-10
				</view>
				<image class="user-info-right-icon" src="../../../../static/image/chevron-right.jpg" mode=""></image>
			</view>
		</view>
		<view class="user-cli">
			<view class="user-title">
				地区
			</view>
			<view class="user-info">
				<view class="user-info-title">
					中国-深圳
				</view>
				<image class="user-info-right-icon" src="../../../../static/image/chevron-right.jpg" mode=""></image>
			</view>
		</view>
		<view class="user-cli textarea-body">
			<view class="user-title">
				个人简介
			</view>
			<uni-easyinput type="textarea"></uni-easyinput>
		</view>
		<view class="submit-button">
			保存个人信息
		</view>
	</view>
</template>

<script setup>
	
</script>

<style lang="scss" scoped>
.update-info {
	padding: 22rpx 48rpx 200rpx 48rpx;
	.user-icon {
		width: 232rpx;
		height: 232rpx;
		margin: 0 auto;
		margin-bottom: 30rpx;
		position: relative;
		.user-icon-image {
			width: 232rpx;
			height: 232rpx;
			border-radius: 232rpx;
			background-color: #eeeeee;
		}
		.user-update-icon {
			width: 58rpx;
			height: 58rpx;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			background-color: #D8336D;
			border: 1rpx solid #ffffff;
			border-radius: 58rpx;
			position: absolute;
			right: 0;
			bottom: 0;
			.update-icon {
				width: 30rpx;
				height: 30rpx;
			}
		}
	}
	
	.user-cli {
		display: flex;
		align-items: center;
		padding: 28rpx 0;
		justify-content: space-between;
		border-bottom: 1rpx solid #eeeeee;
		.user-title {
			font-size: 32rpx;
			font-weight: 600;
			color: #000B3B;
			width: 200rpx;
		}
		
		.user-info {
			display: flex;
			flex: 1;
			align-items: center;
			justify-content: space-around;
			.user-info-title {
				flex: 1;
				font-size: 32rpx;
				color: #000B3B;
				text-align: left;
				font-weight: 400;
			}
			.user-info-right-icon {
				width: 48rpx;
				height: 48rpx;
			}
		}
		
		::v-deep .is-input-border {
			border-color: transparent !important;
		}
	}
	
	.textarea-body {
		display: block;
		border-bottom-color: transparent;
		.user-title {
			margin-bottom: 32rpx;
		}
		::v-deep .is-input-border {
			border-color: #e5e5e5 !important;
		}
	}
	
	.submit-button {
		width: 322rpx;
		height: 88rpx;
		color: #ffffff;
		font-size: 32rpx;
		font-weight: 600;
		text-align: center;
		line-height: 88rpx;
		border-radius: 88rpx;
		background-color: #D8336D;
		box-shadow: 8rpx 8rpx 16rpx rgba(212, 212, 212, 0.60);
		position: fixed;
		bottom: 88rpx;
		left: 0;
		right: 0;
		margin: 0 auto;
	}
}
</style>
