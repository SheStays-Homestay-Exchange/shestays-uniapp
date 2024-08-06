<template>
	<view class="search">
		<view class="search-input-body">
			<view class="search-input">
				<image class="search-icon" src="../../../static/image/search.jpg" mode=""></image>
				<uni-easyinput :styles="styles" type="text" placeholder="选择房源地址"></uni-easyinput>
			</view>
			<text class="search-tipes">搜索</text>
		</view>
		
		<!-- 地址 -->
		<view class="address-lis">
			<image class="address-icon" src="../../../static/image/address-icon.png" mode=""></image>
			<view class="address-text">
				欧洲-意大利-都灵
			</view>
		</view>
		<view class="address-lis">
			<image class="address-icon" src="../../../static/image/address-icon.png" mode=""></image>
			<view class="address-text">
				欧洲-意大利-都灵
			</view>
		</view>
		<view class="address-lis">
			<image class="address-icon" src="../../../static/image/address-icon.png" mode=""></image>
			<view class="address-text">
				欧洲-意大利-都灵
			</view>
		</view>
		<view class="address-lis">
			<image class="address-icon" src="../../../static/image/address-icon.png" mode=""></image>
			<view class="address-text">
				欧洲-意大利-都灵
			</view>
		</view>
	</view>
</template>

<script setup> 
import { reactive } from 'vue';
const styles = reactive({
	"borderColor": "#FFFFFF"
});
</script>

<style lang="scss" scoped>
.search {
	padding: 48rpx;
	.search-input-body {
		display: flex;
		align-items: center;
		margin-bottom: 36rpx;
		.search-input {
			display: inline-flex;
			align-items: center;
			padding: 0 24rpx;
			border-radius: 999rpx;
			overflow: hidden;
			flex: 1;
			box-shadow: 0px 12rpx 60rpx 0px rgba(0, 0, 0, 0.10);
			.search-icon {
				width: 48rpx;
				height: 48rpx;
			}
		}
		.search-tipes {
			color: #000B3B;
			font-size: 32rpx;
			font-weight: 500;
			margin-left: 20rpx;
		}
	}
	
	.address-lis {
		display: flex;
		align-items: center;
		padding: 22rpx 0;
		border-bottom: 1rpx solid #EEE;
		.address-icon {
			width: 32rpx;
			height: 40rpx;
			margin-right: 40rpx;
		}
		.address-text {
			color: #000B3B;
			font-size: 32rpx;
			font-weight: 400;
		}
	}
}
</style>
