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
		<view class="">
			<!-- 无图片房源来源于小红书,有图片是小程序自己上传的房源 -->
			<view :class="['new-house',(item.houseImgs?.length > 0)?'':'hava-border']" @click="goPage('/pages/houseDetail/houseDetail')" 
				v-for="(item,i) in listData" :key="i">
				<swiper class="swiper" circular :indicator-dots="true" :autoplay="false" indicator-active-color="#D8336D" v-if="item?.houseImgs?.length > 0">
					<swiper-item v-for="(el,index) in item.houseImgs">
						<image src="../../../static/image/Frame 48096034.png" class="house-image" mode=""></image>
					</swiper-item>
				</swiper>
				<view class="time-body">
					<text class="address">{{item.countryName}} - {{item.regionName}}</text>
					<text class="time">开放时间：{{item.startTime || '-'}}</text>
				</view>
				<view class="contact" v-if="item?.houseImgs?.length > 0">
					房东：Lily11
				</view>
				<view class="content-body">
					<view class="left">
						<view class="remark wrap2">
							备注：{{item.describle}}备注发的发发的发备注发的发发的发备注发的发发的发备注发的发发的发备注发的发发的发备注发的发发的发备注发的发发的发备注发的发发的发
						</view>
						<!-- <view class="fold">
							<image class="flod-icon" src="../../../static/image/chevron-home-right.png" mode=""></image>
							<text>展开全部</text>
						</view> -->
					</view>
					<view class="contact-button" @tap.stop="contactHost(item)">
						联系房东
					</view>
				</view>
			</view>
		</view>
		
		<!-- 加载更多 -->
		<uni-load-more :status="loadStatus" :contentText="contentText" v-if="listData.length > 0"></uni-load-more>
		
		<!-- 联系弹窗 -->
		<DetailPopup :show="popShow" @tapClose="popShow=false"/>
	</view>
</template>

<script setup>
	import { reactive, ref, onMounted  } from 'vue'
	import { onLoad, onReachBottom, onPullDownRefresh , onShareAppMessage } from '@dcloudio/uni-app'
	import { getHouseList } from '@/common/api/common'
	import  DetailPopup from '@/components/DetailPopup.vue'
	

	onLoad(()=>{
		getHouseListFun()
	})
	
	onShareAppMessage(() => {
		
	});
	
	//页面触底
	onReachBottom(()=>{
		if(loadStatus.value != 'noMore'){
			pages.pageIndex++
			getHouseListFun()
		}
	})
	
	//下拉刷新
	onPullDownRefresh(()=>{
		pages.pageIndex = 1
		listData.value = []
		getHouseListFun('refresh')
	})
	
	const contentText = {
			contentdown: '上拉显示更多',
			contentrefresh: '正在加载...',
			contentnomore: '暂时没有更多房源啦，期待更多寄宿家庭加入我们'
		}
	
	// 搜索
	function handleSearch() {
		uni.navigateTo({
			url: "/pages/public/search/search"
		})
	}
	
	//测试接口
	//加载更多状态
	const loadStatus = ref('contentdown')	
	const listData = ref([
		{
			countryName:'中国'
		}
	])
	const pages = reactive({
		pageIndex:1,
		totalPage: 0   //总共有多少页数据
	})
	const getHouseListFun = async (type)=>{
		loadStatus.value ='loading'
		try{
			const res = await getHouseList({
				pageIndex: pages.pageIndex,
			})
			if(res.code == 200){
				listData.value = listData.value.concat(res.data.data)
				pages.totalPage = res.data.pageCount
				if(type == 'refresh'){
					uni.showToast({
						title:'刷新成功',
						icon:'none'
					})
				}
			}
			// 已请求完所有数据
			if(pages.pageIndex >= res.data.pageCount){
				loadStatus.value = 'noMore'
			}
			console.log('房源',listData.value)
		}catch(e){
			//TODO handle the exception
			console.log('列表错误==',e)
		}
	}
	
	//打开联系房主弹窗
	const popShow = ref(false)
	const contactHost = (item)=>{
		popShow.value = true
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
			.wrap2 {
				display: -webkit-box;  
				    -webkit-line-clamp: 2; /* 限制为两行 */  
				    -webkit-box-orient: vertical;  
				    overflow: hidden; /* 隐藏超出部分 */  
				    text-overflow: ellipsis; /* 超出部分用省略号表示 */  
				    white-space: normal; /* 允许换行 */  
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
