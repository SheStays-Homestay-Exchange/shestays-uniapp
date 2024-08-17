<!-- 定位组件 -->
<template>
	<view>
<!-- 		<view class="address-box flex-jb" @click="openAddress">
			<view class="flex-center" >
				<image src="/otherPages/static/images/address.png" mode=""></image>
				<text class="fs28">{{cityName}}</text>
			</view>
			<uni-icons type="forward" size="14" color="#ccc"></uni-icons>
		</view> -->
		<!-- 省市区弹窗 -->
		<PopupBottom :show="show" title="选择地区" @tapOver="popupCancle">
			<view class="address-pop">
				<view class="description">
					请选择所在的地区，以便推荐匹配的内容
				</view>
				<view class="address-content">
					<view class="address-item position flex-jb">
						<view class="address-item-add flex-1">
							<template v-if="chooseArea?.province?.id">
								<text @click="changeArea({})">{{chooseArea.province.areaName}}</text>
								<text v-if="chooseArea?.city?.id" @click="changeArea(chooseArea.province)">/{{chooseArea.city.areaName}}</text>
								<text v-if="chooseArea?.area?.id">/{{chooseArea.area.areaName}}</text>
							</template>
							<view class="" v-else @click="getAreaList('000000')">
								{{cityName}}
							</view>
						</view>
<!-- 						<view class="position-text" @click="locateCurrent('')">
							<image src="/otherPages/static/images/address.png" mode=""></image>重新定位
						</view> -->
					</view>
					<view class="address-item" v-for="(item,i) in addressList" @click="itemClick(item)" >
						{{item.areaName}}
					</view>
				</view>
			</view>
		</PopupBottom>
	</view>
</template>

<script lang="ts" setup>
	import { ref,reactive,onMounted, computed } from "vue";
	import PopupBottom from '@/components/popup-bottom.vue'
	import { getNation, getRegion, getCity } from '@/common/api/common'

	const isShowLocationPopup = ref(false)
	const tapPhoneOver = (e) => {
		isShowLocationPopup.value = false
		if( e == 'confirm' ){
			openAddress()
		}
	}
	
	//省市区弹窗
	const show = ref(false)
	const authCity = ref(true)  //是否定位授权
	const openAddress = ()=>{
		//已经选了地区
		let code = '000000'
		if(chooseArea?.area?.areaCode){
			code = chooseArea.city.areaCode
			getAreaList(code)
			show.value = true;
		}else{
			//没选地区
			locateCurrent('wrap')
		}
		
	}
	//关闭省市区弹窗
	const popupCancle =(e)=>{
		if(e==='cancel'){
			show.value = false
		}
	} 
	//000000代表查询所有的省
	const getAreaList = (code='000000')=>{
		authCity.value = true
		getNation({
			parentCode: code
		}).then(res=>{
			if(res.code == 200){
				addressList.value = res.data || []
			}
		}).catch(err=>{
			console.log('获取省市区失败')
		})
	}
	
	//地区列表
	const addressList = ref([{areaName:'',id:'',areaLevel:'',areaCode:''}])
	//选中的省市区
	const chooseArea = reactive({})
	//选中城市回显
	const cityName = computed(()=>{
		let result = '请选择城市'
		if(chooseArea?.area?.id){
			result = chooseArea.area.areaName
		}
		return result
	})
	//省市区列表点击
	const itemClick = (item)=>{
		authCity.value = true
		if(item.areaLevel === 1){   //省
			chooseArea.province = item
			chooseArea.city = {}
			chooseArea.area = {}
			getAreaList(item.areaCode)
		}else if(item.areaLevel === 2){
			chooseArea.city = item
			chooseArea.area = {}
			getAreaList(item.areaCode)
		}else{
			chooseArea.area = item
			show.value = false
		}
	}
	
	
	//点击选中的省市区重新选择
	const changeArea = (obj)=>{
		getAreaList(obj.areaCode)
	}
	
	// 获取当前定位地址
	const  locateCurrent = async()=> {
		chooseArea.province = {}
		chooseArea.city = {}
		chooseArea.area = {}
		// handlePosition()
		show.value = true
		getAreaList()   //打开省市区选择面板
	}
	

</script>

<style lang="scss" scoped>
 .address-box{
 	padding: 30rpx 30rpx;
 	margin: 30rpx 0;
 	border-top: 2px solid #FAFAFA;
 	border-bottom: 2px solid #FAFAFA;
 	image{
 		width: 32rpx;
 		height: 32rpx;
 		margin-right: 10rpx;
 	}
 }
 .address-pop{
 	min-height: 30vh;
 	color: #333;
 	.description{
 		color: #0E1215;
 		font-size: 24rpx;
 		text-align: center;
 		margin-bottom: 30rpx;
 	}
 	.address-content{
 		color: #333;
 		// font-weight: bold;
 		font-size: 32rpx;
 		image{
 			width: 24rpx;
 			height: 24rpx;
 			margin-right: 10rpx;
 		}
 		.address-item{
 			// padding: 30rpx;
 			font-weight: bold;
 			height: 100rpx;
 			line-height: 100rpx;
 			padding: 0 30rpx;
 			border-bottom: 2rpx solid #FAFAFA;
			.address-item-add{
				// display: -webkit-box;
				// overflow: hidden;
				// -webkit-box-orient: vertical;
				// -webkit-line-clamp: 1;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
 		}
 	}
 	.position{
 		background: #FAFAFA;
 		border-radius: 16rpx;
 		font-size: 36rpx;
 		.position-text{
 			font-size: 28rpx;
 		}
 	}
 }
 .btn-position{
 	margin: 60rpx 138rpx;
 }
 .tip-button{
 	margin-top: 30rpx;
 }
 .tips-title{
 	font-size: 36rpx;
 	color: #333;
 	font-weight: bold;
 }
</style>