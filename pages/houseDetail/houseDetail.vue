<template>
	<view class="house-detail">
		<view class="house-banner">
			
			<uni-swiper-dot class="uni-swiper-dot-box" @clickItem="clickItem" :info="info" :current="current" :mode="mode"
	 field="content">
						<swiper class="swiper-box" @change="change" :current="swiperDotIndex">
							<swiper-item v-for="(item, index) in 3" :key="index">
								<view class="swiper-item" :class="'swiper-item' + index">
									<text style="color: #fff; font-size: 32px;">{{index+1}}</text>
								</view>
							</swiper-item>
						</swiper>
					</uni-swiper-dot>
<!-- 			<view class="image-wrapper">
				
				
				<img src="http://photos.hotelbeds.com/giata/bigger/18/187549/187549a_hb_t_003.jpg" alt="" />
			</view> -->
			<view class="house-position">
				<view class="left">
					<view>加拿大-温哥华</view>
					<view>
						住宿条件：{}
					</view>
					<view>
						可接待人数：{}
					</view>
				</view>
				<view class="right">ddeed</view>

			</view>

		</view>
		<view class="house-content">
			<view class="house-date">
				<view class="label">房源开放日期</view>
				<view class="value">2024年6月-8月</view>
			</view>
			<view class="house-date">
				<view class="label">对房客姐妹说的话</view>
				<view>
					1.爱干净
					1.爱干净
					1.爱干净
				</view>

			</view>
			<view class="house-date">
				<view class="label">房子设施</view>
				xxxxx
			</view>
		</view>
		<view class="householder">
			<view class="image">
				<img src="" alt="" />
			</view>
			<view class="info">
				<view>
					<view>房主：</view>
					<view>成功接待换速次数：</view>
				</view>

			</view>
			<button class="contact-btn" click="onContact">联系房主</button>
		</view>
	</view>
</template>

<script setup>
	const onContact = () => {
		console.log('contact')
	}
</script>

<style lang="scss" scoped>
	.house-detail {
		background-color: $uni-bg-color-grey;
		// background-color: $uni-bg-color;
		position: relative;
		padding-bottom: 100px;
	}

	.image-wrapper {
		height: 380px;

		img {
			width: 100%;
			height: 100%;
			border-bottom-left-radius: 40px;
			border-bottom-right-radius: 40px;
		}
	}

	.house-position {
		display: flex;
		align-items: center;
		background-color: $uni-bg-color;
		border-radius: 20px;
		width: 70%;
		padding: 16px;
		position: absolute;
		top: 300px;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
	}

	.house-content {
		padding: 24px;
		margin-top: 30px;

		.house-date {
			.label {
				font-size: 28upx;
				font-weight: 700;
				height: 60rpx;
				line-height: 60rpx;

			}

			.value {
				font-size: 28upx;
				font-weight: 400;
				height: 50rpx;
				line-height: 50rpx;
			}
		}
	}

	.householder {
		width: 80%;
		padding: 14px;
		position: fixed;
		bottom: 20px;
		left: 50%;
		transform: translateX(-50%);
		background-color: $uni-bg-color;
		border-radius: 50%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #000;
		border-top-left-radius: 40px;
		border-top-right-radius: 40px;
		border-bottom-left-radius: 40px;
		border-bottom-right-radius: 40px;

		.image {
			margin-right: 10upx;

			img {
				width: 50px;
				height: 50px;
				border-radius: 50%;
			}
		}

		.contact-btn {
			width: 100px;
			height: 36px;
			font-size: 14px;
			background: #D8336D;
			color: #fff;
			border-radius: 20px;

		}
	}
</style>