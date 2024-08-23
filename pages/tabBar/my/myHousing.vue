<template>
	<view class="my-housing">
		<view class="house-wrap" v-for="(item,i) in houseList" :key="i" v-if="houseList.length > 0">
			<!-- <view class="lis" @click="handleEditHousing" v-if="item.statusValue.includes('')">
				<view class="lis-title">
					<image class="housing-image" src="" mode=""></image>
					<view class="title">
						<text>房源待发布</text>
						<image class="title-icon" src="../../../static/image/released.jpg" mode=""></image>
					</view>
				</view>
				<image class="right-icon" src="../../../static/image/right-Icon.jpg" mode=""></image>
			</view> -->
	<!-- 		<view class="lis" @click="handleEditHousing" v-if="item.statusValue.includes('上传')">
				<view class="lis-title">
					<image class="housing-image" src="" mode=""></image>
					<view class="title">
						<text>房源上传中</text>
						<image class="title-icon" src="../../../static/image/loading-01.png" mode=""></image>
					</view>
				</view>
<<<<<<< HEAD
				<!-- <image class="right-icon" src="../../../../static/image/right-Icon.jpg" mode=""></image> -->
			<!-- </view> -->
			<!-- <view class="lis" @click="handleEditHousing" v-if="item.statusValue.includes('审核中')">
				<image class="right-icon" src="../../../static/image/right-Icon.jpg" mode=""></image>
			</view> -->
			<view class="lis" @click="handleEditHousing(1,item.houseId)" v-if="item.status == 1">
				<view class="lis-title">
					<image class="housing-image" src="" mode=""></image>
					<view class="title">
						<text>房源审核中</text>
						<image class="title-icon" src="../../../static/image/search-refraction.png" mode=""></image>
					</view>
				</view>
				<image class="right-icon" src="../../../static/image/right-Icon.jpg" mode=""></image>
			</view>
			<view class="lis" @click="handleEditHousing(2,item.houseId)" v-if="item.status == 2">
				<view class="lis-title">
					<image class="housing-image" src="" mode=""></image>
					<view class="title">
						<text>房源已上线</text>
						<image class="title-icon" src="../../../static/image/success.png" mode=""></image>
					</view>
				</view>
				<image class="right-icon" src="../../../static/image/right-Icon.jpg" mode=""></image>
			</view>
			<view class="lis" @click="handleEditHousing(3,item.houseId)" v-if="item.status == 3">
				<view class="lis-title error">
					<image class="housing-image" src="" mode=""></image>
					<view class="title">
						<text>房源审核未通过</text>
						<image class="title-icon" src="../../../static/image/error.png" mode=""></image>
					</view>
				</view>
				<image class="right-icon" src="../../../static/image/right-Icon.jpg" mode=""></image>
			</view>
			<view class="lis" @click="handleEditHousing(4,item.houseId)" v-if="item.status == 4">
				<view class="lis-title disabled">
					<image class="housing-image" src="" mode=""></image>
					<view class="title">
						<text>房源已下线</text>
						<image class="title-icon" src="../../../static/image/slash-circle-01.png" mode=""></image>
					</view>
				</view>
				<image class="right-icon" src="../../../static/image/right-Icon.jpg" mode=""></image>
			</view>
		</view>
		<view class="no-text" v-else>
			还没有发布房子哦~
		</view>
		<!-- 发布我的房子 -->
		<view class="uploade-button" @click="handleGoPage('/pages/tabBar/my/uploadHousing')">
			<image class="uploade-icon" src="../../../static/image/upload_room_icon.png" mode=""></image>
			<text>发布我的房子</text>
		</view>
		
		<!-- 编辑房源弹框 -->
		<editHousing ref="editRef" @doAction="doAction" :popStatus="activePopStatus"></editHousing>
		<Modal :show="actionShow" @popTap="popTap">
			<template #content>
				<view class="action-content" v-if="actionType == 'down'">
					<text>您确定要下架该房源吗？</text>
					<text>下架之后您可以重新提交上线房源</text>
				</view>
				<view class="" v-if="actionType == 'del'">
					<text>您确定要删除该房源吗？</text>
					<text>删除后将无法恢复</text>
				</view>
			</template>
		</Modal>
	</view>
	
</template>

<script setup>
	import { ref } from 'vue';
	import { onLoad } from '@dcloudio/uni-app'
	import editHousing from './components/editHousing.vue';
	import Modal from './components/modal' 
	import { getHouseByUserId, houseDel } from '@/common/api/common'
	import cache from "@/common/js/cache.js";
	import {msg} from '@/common/js/util.js'
	
	const userInfo = ref({})
	onLoad(()=>{
		userInfo.value = typeof(cache.get('userInfo')) == 'string' ? JSON.parse( cache.get('userInfo') ) : cache.get('userInfo')
		// getHouse()
	})
	
	const status = {
		1:'房源审核中',
		2:'房源已上线',
		3:'房源审核未通过',
		4:'房源已下线'
	}
	
	function handleGoPage(url) {
		uni.navigateTo({
			url: url
		})
	}

	const actionShow = ref(false)
	const actionType = ref('')   //房源操作类型，down:下架 ，del:删除
	const doAction =(e)=>{
		actionType.value = e
		actionShow.value = true
	
	}
	// 编辑房源
	const editRef = ref(null);
	const activePopStatus = ref(1)   //当前打开弹窗-房源状态
	const houseId = ref('')   //当前打开弹窗-房源id
	function handleEditHousing(type,id) {
		activePopStatus.value = type
		houseId.value = id
		editRef.value.open();
	}
	
	//弹窗操作
	const popTap =(e)=>{
		console.log('弹窗操作==',actionType.value,e)
		if(e=='close'){
			actionShow.value = false
		}else{
			//确定-请求接口
			if(actionType.value == 'del'){
				//删除
				delHouse()
			}else{
				//下架
				console.log('执行下架操作===')
				msg('执行下架操作~')
			}
			actionShow.value = false
		}
	}
	
	const houseList = ref([
		{
			houseId:'1',
			status:1
		},
		{
			houseId:'1',
			status:2
		},
		{
			houseId:'1',
			status:3
		},{
			houseId:'1',
			status:4
		}
	])    //房源
	const getHouse = async (type)=>{
		try{
			const res = await getHouseByUserId({
				userId: userInfo.value.userId
			})
			if(res.code == 200){
				houseList.value = res.data || []
			}
	
		}catch(e){
			msg(e.msg || '系统繁忙，请稍后重试')
		}
	}
	
	//删除
	const delHouse = async (type)=>{
		try{
			const res = await houseDel({
				houseId: houseId.value || '1'   //测试id,
			})
			if(res.code == 200){
				msg('删除房源成功')
				houseList.value = []
				getHouse()
			}
	
		}catch(e){
			msg(e.msg || '系统繁忙，请稍后重试')
		}
	}
</script>

<style lang="scss" scoped>
page {
	background-color: #FCFCFC !important;
}
.my-housing {
	padding: 0 48rpx;
	.lis {
		display: flex; 
		align-items: center;
		margin-bottom: 16rpx;
		justify-content: space-between;
		.lis-title {
			flex: 1;
			border: 1rpx solid #EEE;
			background-color: #ffffff;
			display: flex;
			align-items: center;
			padding: 24rpx;
			justify-content: space-between;
			border-radius: 24rpx;
			.housing-image {
				width: 104rpx;
				height: 104rpx;
				border-radius: 16rpx;
				background-color: #eeeeee;
			}
			.title {
				font-size: 32rpx;
				font-weight: 400;
				display: inline-flex;
				align-items: center;
				.title-icon {
					width: 48rpx;
					height: 48rpx;
					margin-left: 8rpx;
				}
			}
		}
		.right-icon {
			width: 36rpx;
			height: 8rpx;
			margin-left: 34rpx;
			background-color: #eeeeee;
		}
		
		.error {
			border-color: #C90E0E;
			background-color: #FFEEF4;
			.title {
				color: #C90E0E;
			}
		}
		
		.disabled {
			background-color: #D1D1D1;
		}
	}
	
	.uploade-button {
		position: fixed;
		bottom: 80rpx;
		left: 0;
		right: 0;
		height: 136rpx;
		width: 680rpx;
		margin: 0 auto;
		display: flex;
		font-size: 40rpx;
		font-weight: 400;
		align-items: center;
		justify-content: center;
		border-radius: 136rpx;
		background-color: #FFF;
		border: 1rpx solid #ECECEC;
		box-shadow: 0px 8rpx 30rpx 0px rgba(212, 212, 212, 0.60);
		.uploade-icon {
			width: 80rpx;
			height: 80rpx;
		}
		>text {
			display: inline-block;
			margin-left: 30rpx;
		}
	}
}
.no-text{
	padding-top: 20vh;
	text-align: center;
	font-size: 32upx;
	color: #999;
}
</style>