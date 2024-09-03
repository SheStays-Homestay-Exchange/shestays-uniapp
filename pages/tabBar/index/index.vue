<template>
	<view class="baner-box">
		<image src="@/static/image/index-top.png" mode=""></image>
	</view>
	<view class="home-index-body">
		<!-- <view class="title">
			<text>欢迎姐妹住我家</text>
			<image class="title-arrow" src="../../../static/image/arrow.png" mode=""></image>
		</view> -->
		<!-- 搜索 -->
		<view class="search-body" @click="handleSearch">
			<image src="../../../static/image/search.png" class="search-image" mode=""></image>
			<text class="search-text">搜索目的地（仅支持国家和城市关键词搜索）</text>
		</view>
		<!-- 房源 -->
		<view class="list-box">
			<HouseItem v-for="(item,i) in listData" :key="i" :item="item" @contactHost="contactHost" @itemClick="itemClick"/>
		</view>
		<!-- 加载更多 -->
		<uni-load-more :status="loadStatus" :contentText="contentText" ></uni-load-more>
		
		<!-- 联系弹窗 -->
		<DetailPopup :show="popShow" @tapClose="popShow=false" :name="itemInfo.name" :id="itemInfo.id" :avatar="itemInfo.avatarUrl"/>
	</view>
	<view class="btn-box" v-if="!userInfo?.openId">
		<button class="login-btn" style="margin-top: 20px;" @click="isLogin">
			<image src="@/static/image/union.svg" class="btn-img"></image>
			微信授权登录
		</button>
	</view>
</template>

<script setup>
	import { reactive, ref, onMounted,computed  } from 'vue'
	import { onShow, onLoad, onReachBottom, onPullDownRefresh , onShareAppMessage } from '@dcloudio/uni-app'
	import { getHouseList } from '@/common/api/common'
	import  DetailPopup from '@/components/DetailPopup.vue'
	import  HouseItem from '@/components/HouseItem.vue'
	import cache from '@/common/js/cache.js'
	import {buriedPoint} from '@/common/js/burying_point.js'
	
	const userInfo = ref({})
	onLoad(()=>{
		 userInfo.value = cache.get('userInfo') || {}
		console.log('userInfo',userInfo)
	});
	
	onShow(() => {
		buriedPoint(4,{title:'SheStays借换宿'})
		pages.pageIndex =  1;
		listData.value = [];
		getHouseListFun();
		
		// 获取地址位置
		// uni.authorize({
		// 	scope: 'scope.userLocation',
		// 	success() {
		// 		uni.getLocation({
		// 			success(res) {
		// 				console.log(res)
		// 			},
		// 			fail(e) {
		// 				console.log(e, '拒绝2');
		// 			}
		// 		})
		// 	},
		// 	fail(e) {
		// 		uni.showModal({
		// 			title: '提示',
		// 			content: '您拒绝了位置的授权，将不会为您推荐附近房源，确定拒绝吗？',
		// 			showCancel:false,
		// 			success(res) {
		// 				uni.openSetting({
		// 					success(res) {
		// 						let userLocation = res.authSetting['scope.userLocation'];
		// 						if (userLocation) {
		// 							// 继续进行授权成功后的操作
		// 							//用户开启位置权限
		// 							uni.chooseLocation({
		// 								success: res => {
		// 									// 返回用户当前选择的位置信息；
		// 									// 可进行保存data 回显在表单上/提交后台
		// 									if (state === 'start') {
		// 										this.formDate.startDestination = res.name
		// 									} else {
		// 										this.formDate.endDestination = res.name
		// 									};
		// 									console.log('位置名称：' + res.name);
		// 									console.log('详细地址：' + res.address);
		// 									console.log('纬度：' + res.latitude);
		// 									console.log('经度：' + res.longitude);
		// 								}
		// 							});
		// 						} else {
		// 							// 用户拒接授权 给提示
		// 							uni.showToast({
		// 								title: '您已拒绝位置授权',
		// 								duration: 2000
		// 							});
		// 						}
		// 					}
		// 				})
		// 			}
		// 		})
		// 	}
		// })
	});
	
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
		// uni.startPullDownRefresh()
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
		if(isLogin()){
			goPage('/pages/public/search/search')
		}
	}
	
	//测试接口
	//加载更多状态
	const loadStatus = ref('contentdown')	
	const listData = ref([])
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
			}
			if(type == 'refresh'){
				uni.stopPullDownRefresh()
			}
			// 已请求完所有数据
			if(pages.pageIndex >= res.data.pageCount){
				loadStatus.value = 'noMore'
			}
		}catch(e){
			//TODO handle the exception
			uni.showToast({
				title:e.msg,
				icon:'none'
			})
			uni.stopPullDownRefresh()
		}
	}
	
	//打开联系房主弹窗
	const popShow = ref(false)
	const itemInfo = reactive({
		id: '',
		name:''
	})
	const contactHost = (item)=>{
		if(isLogin()){
			itemInfo.id = item.xiaohongshuId || '-'
			itemInfo.name = item.xiaohongshuUsername || '-'
			popShow.value = true
			buriedPoint(3,{houseId:item.houseId})
		}
	}
	
	const goPage = (url)=>{
		uni.navigateTo({
			url
		})
	}
	
	//是否登录
	const isLogin =()=>{
		if(!userInfo.value?.openId){
			uni.reLaunch({
				url:'/pages/login/login'
			})
			return false
		}
		return true
	}
	
	const itemClick=(item)=>{
		if(isLogin()){
			goPage('/pages/houseDetail/houseDetail?id='+item.houseId)
		}
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
	.list-box{
		padding-top: 40rpx;
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
		z-index: 999;
		box-shadow: rgba(0, 11, 59, 0.1) 10rpx 20rpx 70rpx;
		margin-top: -40upx;
		z-index: 5;
		.search-image {
			width: 48rpx;
			height: 48rpx;
			margin-right: 6rpx;
		}
		.search-text {
			font-size: 24rpx;
			font-weight: 500;
			color: #909193;
		}
	}

}
.btn-box{
		position: fixed;
		bottom: 40upx;
		left: 10%;
		width: 80%;
		display: inline-block;
		align-items: center;
		.btn-img{
			width: 38upx;
			height: 34upx;
			margin-right: 10rpx;
		}
		.login-btn{
			background: #D8336D;
			color: #fff;
			border-radius: 40upx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
	.baner-box{
		height: 160upx;
		image{
			width: 100%;
			height: 100%;
		}
	}
</style>
