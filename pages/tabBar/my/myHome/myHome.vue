<template>
	<view class="my-home">
		<view class="my-head">
			<view class="my-icon">
				<image class="my-icon-image" src="../../../static/image/avatar.png" mode=""></image>
			</view>
			<!-- 默认头像 -->
		<!-- 	<view class="init-head">
				<uni-icons type="person-filled" size="50" color="#999"></uni-icons>
			</view> -->
			<view class="my-head-content">
				<view class="my-head-name">
					<view class="name">
						Lily
					</view>
					<view class="address">
						<image class="address-icon" src="../../../../static/image/location.png" mode=""></image>
						<text>深圳-中国</text>
					</view>
				</view>
				<view class="my-info">
					<view class="phone">
						<text>手机号：123456</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 个人简介 -->
		<view class="my-intro">
			<view class="my-intro-title">
				个人简介
			</view>
			<view class="my-info-contert">
				大家好，我是一位在深圳生活、曾在洛杉矶居住过的女生。我喜欢设计与创新，热爱探索不同文化与城市，希望结识更多有趣的人。
			</view>
		</view>
		<!-- 我的房源 -->
		<view class="my-houseing">
			<view class="my-houseing-title">
				我的房源
			</view>
			<view class="houseing-col">
				<view class="houseing">
					<image class="houseing-image" src="" mode=""></image>
					<view class="houseing-title">
						深圳-中国
					</view>
				</view>
				<view class="houseing">
					<image class="houseing-image" src="" mode=""></image>
					<view class="houseing-title">
						深圳-中国
					</view>
				</view>
				<view class="houseing">
					<image class="houseing-image" src="" mode=""></image>
					<view class="houseing-title">
						深圳-中国
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>

</script>

<style lang="scss" scoped>
	.init-head{
		width: 160rpx;
		height: 160rpx;
		background: #eee;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
	}
.my-home {
	padding: 48rpx;
	.my-head {
		padding: 48rpx;
		border-radius: 48rpx;
		border: 1rpx #ECECEC;
		background: #FFF;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-shadow: 0rpx 8rpx 30rpx 0rpx rgba(212, 212, 212, 0.60);
		.my-icon {
			width: 160rpx;
			height: 160rpx;
			.my-icon-image {
				width: 160rpx;
				height: 160rpx;
				border-radius: 160rpx;
				background-color: #ECECEC;
			}
		}
		.my-head-content {
			flex: 1;
			margin-left: 40rpx;
			.my-head-name {
				display: flex;
				align-items: center;
				margin-bottom: 16rpx;
				.name {
					flex: 1;
					color: #000B3B;
					font-size: 40rpx;
					font-weight: 600;
				}
				.address {
					font-size: 20rpx;
					font-weight: 400;
					border-radius: 6rpx;
					padding: 4rpx 12rpx;
					color: #D8336D;
					display: inline-flex;
					align-items: center;
					background-color: rgba(255, 214, 228, 0.30);
					.address-icon {
						width: 24rpx;
						height: 24rpx;
					}
				}
			}
			.my-info {
				font-size: 28rpx;
				font-weight: 400;
				color: #000B3B;
			}
		}
	}
	
	.my-intro {
		margin-top: 26rpx;
		.my-intro-title {
			font-size: 32rpx;
			font-weight: 600;
			color: #000B3B;
			margin-bottom: 16rpx;
		}
		.my-info-contert {
			font-size: 28rpx;
			color: #000B3B;
			font-weight: 400;
		}
	}
	
	.my-houseing {
		margin-top: 26rpx;
		.my-houseing-title {
			font-size: 32rpx;
			font-weight: 600;
			color: #000B3B;
			margin-bottom: 16rpx;
		}
	}
	.houseing-col {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		.houseing {
			width: 308rpx;
			margin-bottom: 23rpx;
			.houseing-image {
				width: 100%;
				height: 224rpx;
				border-radius: 16rpx;
				background-color: #ECECEC;
			}
			.houseing-title {
				font-size: 23rpx;
				color: #000B3B;
				font-weight: 600;
				margin-top: 16rpx;
			}
		}
	}
}
</style>
