<template>
	<view class="my-housing">
		<view class="lis" @click="handleEditHousing">
			<view class="lis-title">
				<image class="housing-image" src="" mode=""></image>
				<view class="title">
					<text>房源待发布</text>
					<image class="title-icon" src="../../../static/image/my-edit.png" mode=""></image>
				</view>
			</view>
			<image class="right-icon" src="../../../static/image/right-Icon.jpg" mode=""></image>
		</view>
		<view class="lis">
			<view class="lis-title">
				<image class="housing-image" src="" mode=""></image>
				<view class="title">
					<text>房源上传中</text>
					<image class="title-icon" src="../../../static/image/loading-01.png" mode=""></image>
				</view>
			</view>
			<image class="right-icon" src="../../../static/image/right-Icon.jpg" mode=""></image>
		</view>
		<view class="lis">
			<view class="lis-title">
				<image class="housing-image" src="" mode=""></image>
				<view class="title">
					<text>房源审核中</text>
					<image class="title-icon" src="../../../static/image/search-refraction.png" mode=""></image>
				</view>
			</view>
			<image class="right-icon" src="../../../static/image/right-Icon.jpg" mode=""></image>
		</view>
		<view class="lis">
			<view class="lis-title">
				<image class="housing-image" src="" mode=""></image>
				<view class="title">
					<text>房源已上线</text>
					<image class="title-icon" src="../../../static/image/success.png" mode=""></image>
				</view>
			</view>
			<image class="right-icon" src="../../../static/image/right-Icon.jpg" mode=""></image>
		</view>
		<view class="lis">
			<view class="lis-title error">
				<image class="housing-image" src="" mode=""></image>
				<view class="title">
					<text>房源未审核通过</text>
					<image class="title-icon" src="../../../static/image/error.png" mode=""></image>
				</view>
			</view>
			<image class="right-icon" src="../../../static/image/right-Icon.jpg" mode=""></image>
		</view>
		<view class="lis">
			<view class="lis-title disabled">
				<image class="housing-image" src="" mode=""></image>
				<view class="title">
					<text>房源已下线</text>
					<image class="title-icon" src="../../../static/image/slash-circle-01.png" mode=""></image>
				</view>
			</view>
			<image class="right-icon" src="../../../static/image/right-Icon.jpg" mode=""></image>
		</view>
		<!-- 发布我的房子 -->
		<view class="uploade-button" @click="handleGoPage('/pages/tabBar/my/uploadHousing')">
			<image class="uploade-icon" src="../../../static/image/upload_room_icon.png" mode=""></image>
			<text>发布我的房子</text>
		</view>
		
		<!-- 编辑房源弹框 -->
		<editHousing ref="editRef"></editHousing>
	</view>
	
</template>

<script setup>
import { ref } from 'vue';
import editHousing from './components/editHousing.vue';

function handleGoPage(url) {
	uni.navigateTo({
		url: url
	})
}

// 编辑房源
const editRef = ref(null);
function handleEditHousing() {
	editRef.value.open();
}
</script>

<style lang="scss" scoped>
page {
	background-color: #FCFCFC !important;
}
.my-housing {
	padding: 0 48rpx;
	.lis {
		display: flex; 
		align-items: center;
		margin-bottom: 16rpx;
		justify-content: space-between;
		.lis-title {
			flex: 1;
			border: 1rpx solid #EEE;
			background-color: #ffffff;
			display: flex;
			align-items: center;
			padding: 24rpx;
			justify-content: space-between;
			border-radius: 24rpx;
			.housing-image {
				width: 104rpx;
				height: 104rpx;
				border-radius: 16rpx;
				background-color: #eeeeee;
			}
			.title {
				font-size: 32rpx;
				font-weight: 400;
				display: inline-flex;
				align-items: center;
				.title-icon {
					width: 48rpx;
					height: 48rpx;
					margin-left: 8rpx;
				}
			}
		}
		.right-icon {
			width: 36rpx;
			height: 8rpx;
			margin-left: 34rpx;
			background-color: #eeeeee;
		}
		
		.error {
			border-color: #C90E0E;
			background-color: #FFEEF4;
			.title {
				color: #C90E0E;
			}
		}
		
		.disabled {
			background-color: #D1D1D1;
		}
	}
	
	.uploade-button {
		position: fixed;
		bottom: 80rpx;
		left: 0;
		right: 0;
		height: 136rpx;
		width: 680rpx;
		margin: 0 auto;
		display: flex;
		font-size: 40rpx;
		font-weight: 400;
		align-items: center;
		justify-content: center;
		border-radius: 136rpx;
		background-color: #FFF;
		border: 1rpx solid #ECECEC;
		box-shadow: 0px 8rpx 30rpx 0px rgba(212, 212, 212, 0.60);
		.uploade-icon {
			width: 80rpx;
			height: 80rpx;
		}
		>text {
			display: inline-block;
			margin-left: 30rpx;
		}
	}
}
</style>