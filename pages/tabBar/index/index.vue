<template>
	<view class="home-index-body">
		<view class="title">
			<text>欢迎姐妹住我家</text>
			<image class="title-arrow" src="../../../static/image/arrow.png" mode=""></image>
		</view>
		<!-- 搜索 -->
		<view class="search-body" @click="handleSearch">
			<image src="../../../static/image/search.jpg" class="search-image" mode=""></image>
			<text class="search-text">搜索目的地</text>
		</view>
		<!-- 房源 -->
		<view class="book-card">
			<view class="time-body">
				<text class="address">德国 - 柏林</text>
				<text class="time">开发时间：6月24日</text>
			</view>
			<view class="content-body">
				<view class="left">
					<view class="remark wrap1">
						备注：1.爱干净，维护卫生，共用厨房设施。 2.想和欧洲的姐妹换宿 3.提供沙发床 希望能找到爱旅游和摄影的小伙 伴，我们可以一起出去旅拍，探索城市～
					</view>
					<view class="fold">
						<image class="flod-icon" src="../../../static/image/chevron-home-right.png" mode=""></image>
						<text>展开全部</text>
					</view>
				</view>
				<view class="contact-button">
					联系房东
				</view>
			</view>
		</view>
		<view class="book-card">
			<view class="time-body">
				<text class="address">德国 - 柏林</text>
				<text class="time">开发时间：6月24日</text>
			</view>
			<view class="content-body">
				<view class="left">
					<view class="remark">
						备注：1.爱干净，维护卫生，共用厨房设施。 2.想和欧洲的姐妹换宿 3.提供沙发床 希望能找到爱旅游和摄影的小伙 伴，我们可以一起出去旅拍，探索城市～
					</view>
					<view class="fold">
						<image class="flod-icon" src="../../../static/image/chevron-right.png" mode=""></image>
						<text>折叠内容</text>
					</view>
				</view>
				<view class="contact-button">
					联系房东
				</view>
			</view>
		</view>
		<view class="new-house" @click="goPage('/pages/houseDetail/houseDetail')">
			<image src="../../../static/image/Frame 48096034.png" class="house-image" mode=""></image>
			<view class="time-body">
				<text class="address">美国 - 洛杉矶</text>
				<text class="time">开放时间：6月10日</text>
			</view>
			<view class="contact">
				房东：Lily11
			</view>
		</view>
		<view class="new-house">
			<image src="../../../static/image/Frame 48096034.png" class="house-image" mode=""></image>
			<view class="time-body">
				<text class="address">美国 - 洛杉矶</text>
				<text class="time">开放时间：6月10日</text>
			</view>
			<view class="contact">
				房东：Lily
			</view>
		</view>
	</view>
</template>

<script setup>
	import { reactive, ref, onMounted  } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	
	const msg = ref('首页')
	onLoad(()=>{
		console.log('进入首页。。')
	})
	
	// 搜索
	function handleSearch() {
		uni.navigateTo({
			url: "/pages/public/search/search"
		})
	}
	
	const goPage = (url)=>{
		uni.navigateTo({
			url
		})
	}
</script>

<style lang="scss" scoped>
.home-index-body {
	padding: 0 48rpx;
	.title {
		font-size: 40rpx;
		color: #000B3B;
		font-weight: 500;
		padding: 23rpx 0;
		.title-arrow {
			width: 32rpx;
			height: 24rpx;
			margin-left: 16rpx;
		}
	}
	.search-body {
		background-color: #ffffff;
		height: 80rpx;
		border-radius: 40rpx;
		position: sticky;
		top: 0rpx;
		display: flex;
		align-items: center;
		padding: 0 24rpx;
		box-shadow: rgba(0, 11, 59, 0.1) 10rpx 20rpx 70rpx;
		margin-bottom: 60rpx;
		.search-image {
			width: 48rpx;
			height: 48rpx;
			margin-right: 6rpx;
		}
		.search-text {
			font-size: 32rpx;
			font-weight: 500;
			color: #909193;
		}
	}
	.book-card {
		border: 1rpx solid #ECECEC;
		border-radius: 24rpx;
		padding: 20rpx 28rpx;
		background-color: #ffffff;
		margin-bottom: 24rpx;
		.time-body {
			display: flex;
			align-items: center;
			justify-content: space-between;
			.address {
				font-size: 32rpx;
				font-weight: 600;
			}
			.time {
				font-size: 28rpx;
				font-weight: 400;
			}
		}
		.content-body {
			display: flex;
			align-items: flex-end;
			.left {
				flex: 1;
				overflow: hidden;
				.remark {
					font-weight: 400;
					font-size: 28rpx;
				}
				.fold {
					font-weight: 400;
					color: #909193;
					font-size: 20rpx;
					margin-top: 10rpx;
					display: inline-flex;
					align-items: center;
					margin-right: 6rpx;
				}
				.flod-icon {
					width: 28rpx;
					height: 28rpx;
				}
				.wrap1 {
					white-space: nowrap; /* 保持文本在一行显示 */
					overflow: hidden;    /* 隐藏超出部分 */
					text-overflow: ellipsis; /* 显示省略号 */
				}
			}
			.contact-button {
				width: 168rpx;
				height: 64rpx;
				font-size: 28rpx;
				font-weight: 600;
				border-radius: 64rpx;
				color: #ffffff;
				text-align: center;
				line-height:64rpx ;
				background-color: #D8336D;
			}
		}
	}
	
	.new-house {
		margin-bottom: 24rpx;
		.house-image {
			width: 100%;
			height: 496rpx;
			border-radius: 32rpx;
			background-color: #eee;
		}
		.time-body {
			display: flex;
			align-items: center;
			margin-top: 6rpx;
			justify-content: space-between;
			.address {
				font-size: 32rpx;
				font-weight: 600;
			}
			.time {
				font-size: 28rpx;
				font-weight: 400;
			}
		}
		.contact {
			font-size: 32rpx;
			font-weight: 400;
			margin-top: 6rpx;
		}
	}
}
</style>
