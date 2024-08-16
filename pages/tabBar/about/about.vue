<template>
	<view class="bg-box">
		<image src="@/static/image/about.png" mode=""></image>
		<view class="about-fn" @click="goPage">
			发布房源
			<uni-icons type="arrow-right" size="26" color="#fff" style="margin-left: 16rpx;"></uni-icons>
		</view>
	</view>
	<view class="about">
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
						<text class="text">不是的！我们支持提供双方互换住宿、单向借宿。只要你有需求，就可以寻找愿意提供房源的姐妹借宿。当然，如果你有空闲的资源，也非常欢迎你为其他姐妹提供帮助!</text>
					</view>
				</uni-collapse-item>
				<uni-collapse-item title="如何上传房源？" :show-animation="true">
					<view class="content">
						<text class="text">你可以在「个人主页-发布房源」中发布你的房源，提交房源后，SheStays 管理员将审核你的房源，通过后将开启你的互换旅程！</text>
					</view>
				</uni-collapse-item>
				<uni-collapse-item title="我该如何确保旅程的安全？" :show-animation="true">
					<view class="content">
						<text class="text">
							身份验证：双方在自愿情况下，可交换 ID 等有效证件的复印件或照片，以确认彼此身份。
						</text>
						<text class="text">
							视频通话：自愿情况下，姐妹们可以通过视频通话进一步确认对方的真实性，并详细了解住宿环境。
						</text>
						<text class="text margin-t-10">
							请一定注意相关法律风险，SheStays 目前仅提供借换宿信息，不参与任何身份验证过程。
						</text>
					</view>
				</uni-collapse-item>
				<uni-collapse-item title="借换宿是收费的吗？" :show-animation="true">
					<view class="content">
						<text class="text">我们提倡免费住宿，但在你开启旅程之前，建议双方需要再次确认是否完全免费，避免产生误会，同时需要确认是否存在额外费用，如水电费或清洁费。</text>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
	</view>
</template>

<script setup>
	
	const goPage = ()=>{
		uni.switchTab({
			url:'/pages/tabBar/my/my'
		})
	}
</script>

<style lang="scss" scoped>
	// 顶部图片
	.bg-box{
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		&>image{
			width: 100%;
			height: 650upx;
		}
		.about-fn {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 322rpx;
			height: 88rpx;
			color: #ffffff;
			border-radius: 88rpx;
			text-align: center;
			// line-height: 88rpx;
			background-color: #D8336D;
			margin-top: 26rpx;
			box-shadow: 8rpx 8rpx 16rpx rgba(212, 212, 212, 0.60);
			margin-top: -50upx;
		}
	}
.about {
	padding: 48rpx;
	.about-info {
		.about-title {
			color: #D8336D;
			font-size: 64rpx;
			font-weight: 600;
			margin-bottom: 20upx;
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
		.content{
			font-size: 28upx;
			color: #696A6D;
			padding-bottom: 60upx;
			.text{
				display: block;
				margin-bottom: 8upx;
			}
			.margin-t-10{
				margin-top: 20upx;
			}
		}
	}
}
</style>
