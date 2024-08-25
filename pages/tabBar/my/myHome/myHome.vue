<template>
	<view class="my-home">
		<view class="my-head">
			<view class="my-icon">
				<image class="my-icon-image" :src="userInfo.avatarUrl?userInfo.avatarUrl:'../../../../static/image/avatar.png'" mode=""></image>
			</view>
			<!-- 默认头像 -->
		<!-- 	<view class="init-head">
				<uni-icons type="person-filled" size="50" color="#999"></uni-icons>
			</view> -->
			<view class="my-head-content">
				<view class="my-head-name">
					<view class="name">
						{{userInfo.userName}}
					</view>
					<view class="address">
						<image class="address-icon" src="../../../../static/image/location.png" mode=""></image>
						<text>{{userInfo.cityName}}-{{userInfo.nationName}}</text>
					</view>
				</view>
				<view class="my-info">
					<view class="phone">
						<text>手机号：{{userInfo.phone}}</text>
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
				{{userInfo.personalProfile || '暂无个人简介~'}}
			</view>
		</view>
		<!-- 我的房源 -->
		<view class="my-houseing">
			<view class="my-houseing-title">
				我的房源
			</view>
			<view class="houseing-col" v-if="houseList.length > 0">
				<view class="houseing" v-for="(item,i) in houseList" :key="i" @click="goPage(item)">
					<image class="houseing-image" :src="item.houseImgs?.length>0?item.houseImgs[0].imgUrl:''" mode="aspectFill"></image>
					<view class="houseing-title">
						{{item.cityName}}-{{item.countryName}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { reactive, ref, onMounted,computed  } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { getUserInfoByOpenId, getHouseByUserId } from '@/common/api/common'
	import {msg} from '@/common/js/util.js'
	
	const userId = ref()
	const openId = ref()
	onLoad((option)=>{
		console.log('----',option)
		userId.value = option.userId || 280
		openId.value = option.openId || 'oqmkh7bujr3pkHclTLhGUxwbmVqI'
		getUserInfo()
		getHouse()
	})
	
	const goPage = (item)=>{
		uni.navigateTo({
			url:'/pages/houseDetail/houseDetail?id='+item.houseId
		})
	}
	
	const userInfo = ref({})
	const getUserInfo= async (type)=>{
		try{
			const res = await getUserInfoByOpenId({
				openId: openId.value
			})
			if(res.code == 200){
				userInfo.value = res.data || {}
			}
	
		}catch(e){
			msg(e.msg || '系统繁忙，请稍后重试')
		}
	}
	
	const houseList = ref([])    //房源
	const getHouse = async (type)=>{
		try{
			const res = await getHouseByUserId({
				userId: userId.value
			})
			if(res.code == 200){
				houseList.value = res.data || []
			}
	
		}catch(e){
			msg(e.msg || '系统繁忙，请稍后重试')
		}
	}
	
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
