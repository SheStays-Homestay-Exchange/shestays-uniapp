<!-- 定位组件 -->
<template>
	<view>
		<!-- 省市区弹窗 -->
		<PopupBottom :show="show" title="选择地区" @tapOver="popupCancle">
			<view class="address-pop">
				<view class="description">
					请选择所在的地区，以便推荐匹配的内容
				</view>
				<view class="address-content">
					<view class="address-item position flex-jb">
						<view class="address-item-add flex-1">
							<template v-if="myAreaData[0]?.countryName">
								<text @click="changeArea(1,'')">{{myAreaData[0]?.countryName}}</text>
								<text v-if="myAreaData[1]?.regionName" @click="changeArea(2,myAreaData[0].countryCode)">/{{myAreaData[1]?.regionName}}</text>
								<text v-if="myAreaData[2]?.cityName" @click="changeArea(3,myAreaData[1].regionCode)">/{{myAreaData[2]?.cityName}}</text>
								<text v-if="myAreaData[3]?.districtName">/{{myAreaData[3]?.districtName}}</text>
							</template>
							<view class="" v-else @click="getAreaList('000000')">
								{{cityName}}
							</view>
						</view>
						<!-- <view class="position-text" @click="locateCurrent">
							<image src="@/static/images/address.png" mode=""></image>重新定位
						</view> -->
					</view>
					<scroll-view
						:scroll-y="true" 
						style="height: 600rpx">
						<view class="address-item" v-for="(item,i) in addressList" @click="itemClick(item)">
							{{item.countryName || item.regionName || item.cityName || item.districtName}}
						</view>
					</scroll-view>
					
			
				</view>
			</view>
		</PopupBottom>

	</view>
</template>

<script setup>
	import { ref, watch , computed } from "vue";
	import PopupBottom from '@/components/popup-bottom.vue'
	import { getNation, getRegion, getCity, getDistrict } from '@/common/api/common'
	import cache from '@/common/js/cache.js'
	

	const emits = defineEmits(['btnClick'])
	//省市区弹窗
  const props = defineProps({
    show: {
      type: Boolean,
      default: true
    },
	  //选中的省市区
    chooseArea: {
      type: Array,
      default: () => []
    },
	//总共层级，3级or四级
	totalLevel: {
		type: [String, Number],
		default: 3
	}
	});
	const authCity = ref(true)  //是否定位授权

  const myAreaData = ref([])

  watch(() => props.show , (val) => {
    console.log(val,'----------------------------------------watchLocation')
    if( val ){
      //已经选了地区
      let code = '000000'
	  console.log('watch====',props.chooseArea)
      if(props.chooseArea.length ==3){
		  areaLevel.value = 3
			code = props.chooseArea[1].regionCode
      }else if(props.chooseArea.length ==4){   //国家-省-市-区
			areaLevel.value = 4;
		  code = props.chooseArea[2].cityCode
	  }
		myAreaData.value = JSON.parse(JSON.stringify(props.chooseArea))	
		getAreaList(code)
    } else {
		// 关闭弹窗
		areaLevel.value = 1;
	}
  })

	//关闭省市区弹窗
	const popupCancle =(e)=>{
		emits('popupClick',{funName:'cancle'})
	} 
	
	const getAreaList = (code='000000')=>{
		// authCity.value = true
		console.log('级别===',areaLevel.value)
		if(areaLevel.value == 1){
			getCountry()
		}else if(areaLevel.value == 2){
			getReginFun(code)
		}else if(areaLevel.value == 3){
			getCityFun(code)
		}else{
			//需要显示四级，最低级县城
			if(props.totalLevel == 4){
				getDisFun(code)
			}
		}
	}
	
	//获取国家
	const getCountry = ()=>{
		getNation().then(res=>{
			if(res.code == 200){
				addressList.value = res.data || []
			}
		}).catch(err=>{
			console.log('获取省市区失败')
		})
	}
	
	//获取省、州
	const getReginFun = (countryCode)=>{
		getRegion({
			countryCode
		}).then(res=>{
			if(res.code == 200){
				addressList.value = res.data || []
			}
		}).catch(err=>{
			console.log('获取省市区失败')
		})
	}
	
	//获取城市
	const getCityFun = (regionCode)=>{
		getCity({
			regionCode
		}).then(res=>{
			if(res.code == 200){
				addressList.value = res.data || []
			}
		}).catch(err=>{
			console.log('获取省市区失败')
		})
	}
	
	//获取区县
	const getDisFun = (cityCode)=>{
		getDistrict({
			cityCode
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
	//选中城市回显
	const cityName = computed(()=>{
		let result = '请选择城市'
		if(myAreaData.value?.area?.areaCode){
			result = myAreaData.value.area.areaName
		}
		return result
	})
	
	//当前展示的列表层级
	const areaLevel = ref(1)  //1国家，2区省、3市、4区县
	//省市区列表点击
	const itemClick = (item)=>{
		console.log('item',item)
		if(areaLevel.value == 1){   //省
			myAreaData.value = [item]
			areaLevel.value = 2   //去请求省
			getAreaList(item.countryCode)
	
		}else if(areaLevel.value == 2){
			myAreaData.value[1] = item
			myAreaData.value[2] = []
			areaLevel.value = 3   //去请求城市
			getAreaList(item.regionCode)

		}else if(areaLevel.value == 3){
			myAreaData.value[2] = item
			myAreaData.value[3] = []
			if(props.totalLevel == 4){
				areaLevel.value = 4   //去请求区县
				getAreaList(item.cityCode)
			}else{
				emits('popupClick',{funName:'submit',value:myAreaData.value})
			}
			
		}else{
			myAreaData.value[3] = item
			console.log('myAreaData.value',myAreaData.value)
			emits('popupClick',{funName:'submit',value:myAreaData.value})
		}
	}
	
	//点击选中的省市区重新选择
	const changeArea = (level,code)=>{
		if(level == 1){
			//点击国家，清除省、城市
			myAreaData.value.splice(1,2)
		}else if(level == 2){
			//点击省，清除城市
			myAreaData.value.splice(2,1)
		}else{
			//点击城市，清除县
			myAreaData.value.splice(3,1)
		}
		areaLevel.value = level
		getAreaList(code)
	}
	
	// 获取当前定位地址

	//经纬度换实际地址

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