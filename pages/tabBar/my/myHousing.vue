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
			</view>
			<view class="lis" @click="handleEditHousing" v-if="item.statusValue.includes('上传')">
				<view class="lis-title">
					<image class="housing-image" src="" mode=""></image>
					<view class="title">
						<text>房源上传中</text>
						<image class="title-icon" src="../../../static/image/loading-01.png" mode=""></image>
					</view>
				</view>
				<image class="right-icon" src="../../../../static/image/right-Icon.jpg" mode=""></image> 
			 </view> -->
			<view class="lis" @click="handleEditHousing(1,item.houseId, item)" v-if="item.statusCode == 'pending_view'">
			 	<view class="lis-title">
			 		<image class="housing-image" :src="item.houseImgs?.length>0 ?item.houseImgs[0].imgUrl:''" mode="aspectFill"></image>
			 		<view class="title">
			 			<text>房源待发布</text>
			 			<image class="title-icon" src="../../../static/image/released.jpg" mode=""></image>
			 		</view>
			 	</view>
				<uni-icons type="more-filled" size="24" color="#000" class="more-icon"></uni-icons>

			</view>
			<view class="lis" @click="handleEditHousing(1,item.houseId, item)" v-if="item.statusCode == 'reviewing'">
				<view class="lis-title">
					<image class="housing-image" :src="item.houseImgs?.length>0 ?item.houseImgs[0].imgUrl:''" mode="aspectFill"></image>
					<view class="title">
						<text>房源审核中</text>
						<image class="title-icon" src="../../../static/image/search-refraction.png" mode="aspectFill"></image>
					</view>
				</view>
				<uni-icons type="more-filled" size="24" color="#000" class="more-icon"></uni-icons>
			</view>
			<view class="lis" @click="handleEditHousing(2,item.houseId, item)" v-if="item.statusCode == 'online'">
				<view class="lis-title">
					<image class="housing-image" :src="item.houseImgs?.length>0 ?item.houseImgs[0].imgUrl:''" mode="aspectFill"></image>
					<view class="title">
						<text>房源已上线</text>
						<image class="title-icon" src="../../../static/image/success.png" mode=""></image>
					</view>
				</view>
				<uni-icons type="more-filled" size="24" color="#000" class="more-icon"></uni-icons>
			</view>
			<view class="lis" @click="handleEditHousing(3,item.houseId, item, true)" v-if="item.statusCode == 'not_approved'">
				<view class="lis-title error">
					<image class="housing-image" :src="item.houseImgs?.length>0 ?item.houseImgs[0].imgUrl:''" mode="aspectFill"></image>
					<view class="title">
						<text>房源审核未通过</text>
						<image class="title-icon" src="../../../static/image/error.png" mode=""></image>
					</view>
				</view>
				<uni-icons type="more-filled" size="24" color="#000" class="more-icon"></uni-icons>
			</view>
			<view class="lis" @click="handleEditHousing(4,item.houseId, item)" v-if="item.statusCode == 'offline'">
				<view class="lis-title disabled">
					<image class="housing-image" :src="item.houseImgs?.length>0 ?item.houseImgs[0].imgUrl:''" mode="aspectFill"></image>
					<view class="title">
						<text>房源已下线</text>
						<image class="title-icon" src="../../../static/image/slash-circle-01.png" mode="" ></image>
					</view>
				</view>
				<uni-icons type="more-filled" size="24" color="#000" class="more-icon"></uni-icons>
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
		<editHousing ref="editRef" @doAction="doAction" :popStatus="activePopStatus" :notPass="notPass" :popUnpassReason="houseObj.unpassReason"></editHousing>
		<!-- 下架房源 -->
		<Modal
			:show="actionShow"
			@popTap="popTap"
			:title="modTitle"
			:confirmText="confirmText"
			:cancelText="cancelText"
		>
			<template #content>
				<view class="action-content" v-if="actionType == 'down'">
					<text>您确定要下架该房源吗？</text>
					<br />
					<text>下架之后您可以重新提交上线房源</text>
				</view>
				<view class="action-content" v-if="actionType == 'del'">
					<text>您确定要删除该房源吗？</text>
					<br />
					<text>删除后将无法恢复</text>
				</view>
			</template>
		</Modal>
	</view>
	
</template>

<script setup>
	import { reactive, ref } from 'vue';
	import { onLoad ,onShow} from '@dcloudio/uni-app'
	import editHousing from './components/editHousing.vue';
	import Modal from './components/modal' 
	import { 
		getHouseByUserId,
		houseDel,
		houseOffline
	} from '@/common/api/common'
	import cache from "@/common/js/cache.js";
	import  {msg}  from '@/common/js/util.js'
	import {buriedPoint} from '@/common/js/burying_point.js'
	
	const userInfo = ref({})
	onLoad(()=>{
		userInfo.value = typeof(cache.get('userInfo')) == 'string' ? JSON.parse( cache.get('userInfo') ) : cache.get('userInfo')
		getHouse()
	})
	
	onShow(()=>{
		buriedPoint(4,{title:'我的房源'})
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
	const houseObj = ref({}); // 编辑房源对象
	const doAction = (e)=>{
		// 编辑回显
		if (e == 'edit') {
			let copEditObje = {
				area: [
					{
						countryCode: houseObj.value.countryCode,
						countryName: houseObj.value.countryName
					},
					{
						regionCode: houseObj.value.regionCode,
						regionName: houseObj.value.regionName
					},
					{
						cityCode: houseObj.value.cityCode,
						cityName: houseObj.value.cityName
					}
				],
				cityCode: houseObj.value.cityCode,
				countryCode: houseObj.value.countryCode,
				describle: houseObj.value.describle,
				endTime: houseObj.value.endTime,
				houseAmount: houseObj.value.houseAmount,
				regionCode: houseObj.value.regionCode,
				startTime: houseObj.value.startTime,
				houseImgs: houseObj.value.houseImgs
			};
			cache.put('draftHouse',{...copEditObje});
			uni.navigateTo({
				url: `/pages/tabBar/my/uploadHousing?edit=${JSON.stringify(houseObj.value)}`
			});
		} else {
			if (e == 'del') {
				modTitle.value = "删除房源";
				cancelText.value = "取消删除";
				confirmText.value = "确定删除";
			}
			if (e == 'down') {
				modTitle.value = "下线房源";
				cancelText.value = "否";
				confirmText.value = "是";
			}
			// 下架，删除
			actionType.value = e
			actionShow.value = true
		}
	}
	// 编辑房源
	const editRef = ref(null);
	/**
	 * 	1:'房源审核中',
		2:'房源已上线',
		3:'房源审核未通过',
		4:'房源已下线'
	*/
	const activePopStatus = ref(1)   //当前打开弹窗-房源状态
	const notPass = ref(false)   //true就是点击查看不通过原因
	const houseId = ref('')   //当前打开弹窗-房源id
	function handleEditHousing(type,id,item,isShowReason) {
		activePopStatus.value = type
		houseId.value = id
		houseObj.value = item
		notPass.value = isShowReason || false
		editRef.value.open();
	}
	
	//弹窗操作
	const modTitle = ref("");
	const cancelText = ref("");
	const confirmText = ref("");
	
	const popTap =(e)=>{
		console.log('弹窗操作==',actionType.value,e)
		if(e=='close'){
			actionShow.value = false
		}else{
			//确定-请求接口
			if(actionType.value == 'del'){
				//删除
				delHouse()
			} else {
				//下架
				offlineHouse()
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
				houseId: houseId.value || '1'   ,//测试id,
				openId: userInfo.value.openId
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
	
	
	//下架
	const offlineHouse = async (type)=>{
		try{
			const res = await houseOffline({
				houseId: houseId.value || '1'   ,//测试id,
			})
			if(res.code == 200){
				msg('下架该房源成功')
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
	padding: 40rpx 48rpx 220rpx;
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
	.more-icon{
		margin-left: 28rpx;
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

.action-content {
	text-align: center;
}
</style>