<template>
	<view class="about">
		<view class="about-title">
			欢迎姐妹住我家
		</view>
		<view class="about-fn">
			发布房源
		</view>
		<view class="about-info">
			<view class="about-title">
				关于SheStays
			</view>
			<view class="about-content">
				SheStays 致力于打造一个安全、互助的女性借换宿平台，助力女性探索世界，享受全新的旅行体验。
			</view>
			<view class="about-content">
				 通过与当地女性借换宿，你可以大胆走出家门，以更加环保，低成本的方式享受当地文化、风俗。
			</view>
		</view>
		<view class="about-faq">
			<view class="about-faq-title">
				FAQ
			</view>
			<uni-collapse >
				<uni-collapse-item title="所有旅程都必须是 1 对 1 互换吗？" :show-animation="true">
					<view class="content">
						<text class="text">默认开启组件动画，使用动画效果折叠内容会有一个从上到下的动画。</text>
					</view>
				</uni-collapse-item>
				<uni-collapse-item title="如何上传房源？" :show-animation="true">
					<view class="content">
						<text class="text">默认开启组件动画，使用动画效果折叠内容会有一个从上到下的动画。</text>
					</view>
				</uni-collapse-item>
				<uni-collapse-item title="我该如何确保旅行安全？" :show-animation="true">
					<view class="content">
						<text class="text">默认开启组件动画，使用动画效果折叠内容会有一个从上到下的动画。</text>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
	</view>
</template>

<script setup>
	
</script>

<style lang="scss" scoped>
.about {
	padding: 48rpx;
	.about-title {
		color: #000;
		font-weight: 600;
		font-size: 40rpx;
		margin-top: 150rpx;
	}
	.about-fn {
		width: 322rpx;
		height: 88rpx;
		color: #ffffff;
		border-radius: 88rpx;
		text-align: center;
		line-height: 88rpx;
		background-color: #D8336D;
		margin-top: 26rpx;
		box-shadow: 8rpx 8rpx 16rpx rgba(212, 212, 212, 0.60);
	}
	.about-info {
		margin-top: 168rpx;
		.about-title {
			color: #D8336D;
			font-size: 64rpx;
			font-weight: 600;
		}
		.about-content {
			font-size: 32rpx;
			color: #000B3B;
			font-weight: 400;
		}
	}
	
	.about-faq {
		margin-top: 50rpx;
		.about-faq-title {
			font-size: 40rpx;
			font-weight: 600;
			color: #000B3B;
		}
		::v-deep .uni-collapse-item__title-box{
			padding-left: 0 !important;
			font-size: 32rpx;
			color: #000B3B;
			font-weight: 500;
		}
	}
}
</style>
