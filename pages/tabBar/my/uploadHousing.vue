<template>
	<view class="uploade">
		<view class="uploade-button">
			<view class="title">
				请上传您的房源照片（至少一张）
			</view>
			<scroll-view class="uploade-scroll" :scroll-x="true" >
				<view class="uploade">
					<image src="../../../static/image/union.png" mode=""></image>
				</view>
				<view class="uploade-image">
					
				</view>
				<view class="uploade-image">
					
				</view>
				<view class="uploade-image">
					
				</view>
				<view class="uploade-image">
					
				</view>
				<view class="uploade-image">
					
				</view>
				<view class="uploade-image">
					
				</view>
				<view class="uploade-image">
					
				</view>
			</scroll-view>
		</view>
		
		<view class="uploade-col" @click="hanldeSelectAddress">
			<view class="uploade-title">
				房源所在地址
			</view>
			<view class="col-select">
				<view class="tips">
					亚洲-中国-深圳
				</view>
				<image class="icon" src="../../../static/image/arrow-right.png" mode=""></image>
			</view>
		</view>
		<view class="uploade-col">
			<view class="uploade-title">
				可接待房客数
			</view>
			<view class="col-select">
				<view class="tips">
					2
				</view>
				<uni-number-box :min="1"></uni-number-box>
			</view>
		</view>
		<view class="uploade-col">
			<view class="uploade-title">
				开放换宿时间
			</view>
			<view class="col-select">
				<view class="tips">
					<text style="color: #909193;">未设置</text>
				</view>
				<image class="icon" src="../../../static/image/arrow-right.png" mode=""></image>
			</view>
		</view>
		<view class="uploade-col-textarea">
			<view class="uploade-title">
				对房客说的话
			</view>
			<view class="col-input">
				<uni-easyinput :styles="styles" type="textarea" :autoHeight="false" placeholder="请输入内容"></uni-easyinput>
				<view class="sum">
					0 / 300
				</view>
			</view>
		</view>
	</view>
	<!-- 按钮 -->
	<view class="button-body">
		<view class="save">
			保存编辑
		</view>
		<view class="submit">
			提交房源
		</view>
	</view>
</template>

<script setup>
	import { reactive } from 'vue';
	const styles = reactive({
		"borderColor": "#ffffff"
	})
	
	// 选择房源地址
	function hanldeSelectAddress() {
		uni.navigateTo({
			url: '/pages/public/searchAddress/searchAddress'
		})
	}
</script>

<style lang="scss" scoped>
	.uploade {
		.uploade-button {
			.title {
				font-weight: 500;
				font-size: 32rpx;
				color: #000B3B;
				padding: 0 48rpx;
				margin-bottom: 16rpx;
			}
		}
		.uploade-scroll {
			// display: flex;
			// align-items: center;
			white-space: nowrap;
			width: 100%;
			.uploade {
				width: 176rpx;
				height: 176rpx;
				border-radius: 16rpx;
				margin-left: 48rpx;
				display: inline-flex;
				align-items: center;
				justify-content: center;
				background-color: #F3F3F3;
				float: left;
				>image {
					width: 30rpx;
					height: 30rpx;
				}
			}
			.uploade-image {
				width: 176rpx;
				height: 176rpx;
				background-color: #eee;
				margin-left: 20rpx;
				border-radius: 16rpx;
				display: inline-block;
				>image {
					width: 176rpx;
					height: 176rpx;
				}
			}
			.uploade-image:last-child {
				margin-right: 48rpx;
			}
		}
		
		.uploade-col {
			margin: 0 48rpx;
			display: flex;
			align-items: center;
			padding: 32rpx 0;
			border-bottom: 1rpx solid #EEE;
			.uploade-title {
				font-weight: 500;
				font-size: 32rpx;
				color: #000B3B;
				margin-right: 46rpx;
			}
			.col-select {
				display: flex;
				flex: 1;
				align-items: center;
				.tips {
					flex: 1;
					font-size: 32rpx;
					font-weight: 400;
					color: #000B3B;
				}
				.icon {
					width: 16rpx;
					height: 26rpx;
				}
			}
		}
		
		.uploade-col-textarea {
			padding: 0 48rpx;
			.uploade-title {
				font-weight: 500;
				font-size: 32rpx;
				color: #000B3B;
				margin-right: 46rpx;
				padding: 32rpx 0;
			}
			.col-input {
				padding: 20rpx;
				border-radius: 8rpx;
				border: 1rpx solid #EEE;
				.sum {
					font-size: 24rpx;
					color: #909193;
					font-weight: 400;
					text-align: right;
				}
			}
		}
	}
	.button-body {
		display: flex;
		align-items: center;
		position: fixed;
		bottom: 88rpx;
		left: 0;
		right: 0;
		margin: 0 auto;
		justify-content: space-evenly;
		>view {
			width: 314rpx;
			height: 86rpx;
			text-align: center;
			line-height: 86rpx;
			border-radius: 86rpx;
			color: #ffffff;
			font-size: 32rpx;
			font-weight: 600;
			box-shadow: 8rpx 8rpx 16rpx rgba(212, 212, 212, 0.60);
		}
		.save {
			background-color: #909193;
		}
		.submit {
			background-color: #D8336D;
		}
	}
</style>