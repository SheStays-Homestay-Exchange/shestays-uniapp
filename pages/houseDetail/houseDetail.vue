<template>
	<view class="house-detail">
		<view class="house-banner">
			<uni-swiper-dot class="uni-swiper-dot-box" @clickItem="clickItem" :info="info" :current="current"
				:mode="mode" field="content">
				<swiper class="swiper-box" @change="change" :current="swiperDotIndex">
					<swiper-item v-for="(item, index) in state.bannerList" :key="index">
						<view class="swiper-item image-wrapper" :class="'swiper-item' + index">
							<img class="house-image" :src="item.url" alt="" />
						</view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>

			<view class="house-position">
				<view class="left">
					<view class="title">加拿大 - 温哥华</view>
					<view class="desc">住宿条件：{{ state.accommodationCondition }}</view>
					<view class="desc">可接待人数：{{ state.guestCapacity }}</view>
				</view>
				<view class="right" @click="handleCollect">
					<img src="../../static/image/bookmark.svg" alt="" />
				</view>
			</view>
		</view>
		<view class="house-content">
			<view class="house-date">
				<view class="label">房源开放日期</view>
				<view class="value">{{ state.openDate }}</view>
			</view>
			<view class="house-date">
				<view class="label">对房客姐妹说的话</view>
				<view class="value" v-for="(message, index) in state.messages" :key="index">
					<text>{{ message }}</text>
				</view>
			</view>
			<view class="house-date">
				<view class="label">房子设施</view>
				<view class="value">{{ state.facilities }}</view> <!-- 建议添加具体的数据绑定 -->
			</view>
		</view>
		<view class="householder">
			<view class="image">
				<img :src="state.hostImageSrc" alt="" /> <!-- 建议添加具体的数据绑定 -->
			</view>
			<view class="info">
				<view>
					<view>房主：{{ state.hostName }}</view> <!-- 建议添加具体的数据绑定 -->
					<view>成功接待换速次数：{{ state.successfulReceptionCount }}</view> <!-- 建议添加具体的数据绑定 -->
				</view>
			</view>
			<button class="contact-btn" @click="onContact">联系房主</button>
		</view>

		<view>
			<uni-popup ref="popup" type="center" border-radius="10px 10px 0 0">
				<view class="popup-content">
					<view>
						<view>
							<span>房主：</span>
							<span>Lily</span>
						</view>
						<view>
							<span>微信号：</span>
							<span>123456</span>
						</view>
					</view>
					<view>Tips✨：主动自我介绍说明目的的成功率更高哦~
						例如：嗨，你好！我从SheStays看到了您的房源。期待能够获得借宿的机会，一起分享有趣的经历。
					</view>
					<view @click="hanleCopy"><button>复制名片</button></view>
				</view>
			</uni-popup>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref,
		onMounted
	} from 'vue'
	import {
		onLoad
	} from '@dcloudio/uni-app'


	const popup = ref(null);

	const onOpen = () => {
		// 通过组件定义的 ref 调用 uni-popup 方法 ，如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']

	}

	// 定义数据
	const state = reactive({
		accommodationCondition: '',
		guestCapacity: '',
		openDate: '',
		messages: [],
		facilities: '',
		hostImageSrc: 'https://lf-flow-web-cdn.doubao.com/obj/flow-doubao/doubao_ext/static/image/avatar-transparent.ea272b11.png',
		hostName: '',
		successfulReceptionCount: ''
	})


	const handleCollect = () => {

		console.log('collect ')
	}

	const onContact = () => {
		console.log('联系房东')
		popup.value.open('top');
	}

	const hanleCopy = () => {
		console.log('复制')
	}

	onLoad(() => {
		console.log('进入详情，调用接口')
		// 模拟获取数据并赋值
		state.accommodationCondition = '舒适温馨'
		state.guestCapacity = '2人'
		state.openDate = '2024年6月-8月'
		state.messages = ['爱干净', '遵守规定', '保持安静']
		state.facilities = '齐全的厨房设备，高速网络，舒适的床铺'
		state.hostImageSrc =
			'https://lf-flow-web-cdn.doubao.com/obj/flow-doubao/doubao_ext/static/image/avatar-transparent.ea272b11.png'
		state.hostName = '张三'
		state.successfulReceptionCount = '10 次'
		state.bannerList = [{
				url: 'https://res.klook.com/image/upload/q_85/activities/ori7zgidaf70ildeaazw.jpg',
				key: 1
			},
			{
				url: 'https://res.klook.com/image/upload/c_fill,w_1265,h_712/q_80/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/mn4cemkgx5r6fy6rgie6.webp',
				key: 2
			},
			{
				url: 'https://res.klook.com/image/upload/q_85/activities/ori7zgidaf70ildeaazw.jpg',
				key: 3
			}
		]
	})
</script>

<style lang="scss" scoped>
	.house-detail {
		background-color: $uni-bg-color-grey;
		// background-color: $uni-bg-color;
		position: relative;
		padding-bottom: 100px;
	}

	.swiper-box {
		height: 380px;
	}

	.image-wrapper {
		img {
			width: 100%;
			height: 380px;
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
		top: 320px;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		align-items: flex-start;
		justify-content: space-between;

		.title {
			font-size: 20px;
			font-weight: 600;
			height: 29px;
			line-height: 29px;
		}

		.desc {
			font-size: 14px;
			height: 20px;
			line-height: 20px;
		}
	}

	.house-content {
		padding: 24px;
		margin-top: 30px;

		.house-date {
			margin: 5px 0;

			.label {
				font-weight: 700;
				height: 60rpx;
				line-height: 60rpx;
				font-size: 16px;

			}

			.value {
				font-size: 14px;
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

		.info {
			font-size: 12px;
		}

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

	.popup-content {
		background-color: #fff;
		width: 287px;
		width: 287px;
		top: 50%;
		transform: translateY(100%);
		margin: 0 auto;
		padding: 20px;
		border-radius: 10px;
	}
</style>