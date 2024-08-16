<template>
	<!-- 无图片房源来源于小红书,有图片是小程序自己上传的房源 -->
	<view :class="['new-house',(item.houseImgs?.length > 0)?'':'hava-border']" @click="houseClick">
		<swiper class="swiper" circular :indicator-dots="true" :autoplay="false" indicator-active-color="#D8336D" v-if="item?.houseImgs?.length > 0">
			<swiper-item v-for="(el,index) in item.houseImgs">
				<image src="../../../static/image/Frame 48096034.png" class="house-image" mode=""></image>
			</swiper-item>
		</swiper>
		<view class="time-body">
			<text class="address wrap1">{{item.countryName}} - {{item.regionName}}</text>
			<text class="time" v-if="item.startTime">开放时间：{{ item.startTime.split(' ')[0] }}</text>
		</view>
		<view class="contact" v-if="item?.houseImgs?.length > 0">
			房东：Lily11
		</view>
		<view class="content-body">
			<view class="left">
				<view class="remark wrap2">
					备注：{{item.describle}}
				</view>
				<!-- <view class="fold">
					<image class="flod-icon" src="../../../static/image/chevron-home-right.png" mode=""></image>
					<text>展开全部</text>
				</view> -->
			</view>
			<view class="contact-button" @tap.stop="emits('contactHost',item)">
				联系房东
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref,watch,nextTick,onMounted  } from 'vue'
	
	const emits = defineEmits(['itemClick','contactHost'])
	const props = defineProps({
		item: {
			default: ()=>{},
			type: Object
		},
	})
	
	const houseClick = ()=>{
		//有图片才去详情
		if(props.item.houseImgs?.length > 0){
			emits('itemClick',item)
		}
	}
	
</script>

<style lang="scss" scoped>
	.new-house {
		margin-bottom: 24rpx;
		&.hava-border{
			border: 1rpx solid #ECECEC;
			border-radius: 24rpx;
			padding: 20rpx 28rpx;
		}
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
				display: block;
				max-width: 60%;
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
	.wrap1 {
		white-space: nowrap; /* 保持文本在一行显示 */
		overflow: hidden;    /* 隐藏超出部分 */
		text-overflow: ellipsis; /* 显示省略号 */
	}
	.wrap2 {
		display: -webkit-box;  
		-webkit-line-clamp: 2; /* 限制为两行 */  
		-webkit-box-orient: vertical;  
		overflow: hidden; /* 隐藏超出部分 */  
		text-overflow: ellipsis; /* 超出部分用省略号表示 */  
		white-space: normal; /* 允许换行 */  
	}
</style>