<template>
	<view class="search">
		<view class="search-input-body">
			<view class="search-input">
				<image class="search-icon" src="../../../static/image/search.jpg" mode=""></image>
				<uni-easyinput :styles="styles" :inputBorder="false" type="text" trim="both" primaryColor="#D8336D" placeholder="搜索目的地"
				 confirmType="search" v-model="region" @confirm="search" @input="inputChange"></uni-easyinput>
			</view>
			<!-- <text class="search-tipes" @click="search">搜索</text> -->
		</view>
		
		<!-- 默认值 -->
		<view class="search-value" v-if="!showResult">
			<view class="search-title">
				推荐目的地
			</view>
			<view class="search-fn" v-for="(item,i) in citys" :key="i" @click="cityClick(item)">
				{{item.countryName}}
			</view>
		</view>
		<view class="result-box" v-else>
			<!-- 房源 -->
			<view class="" v-if="listData.length > 0">
				<HouseItem v-for="(item,i) in listData" :key="i" :item="item" @contactHost="contactHost" @itemClick="itemClick"/>
			</view>
			<template v-if="noData">
				<view class="no-data">
					该地区暂时没有换宿房源，<br/>请修改或调整搜索区域
				</view>
			</template>
		</view>
		
	</view>
	<!-- 联系弹窗 -->
	<DetailPopup :show="popShow" @tapClose="popShow=false"/>
</template>

<script setup> 
	import { reactive,ref } from 'vue';
	import { onLoad } from '@dcloudio/uni-app'
	import { getHouseList, getHouseByRegion, getName } from '@/common/api/common'
	import  HouseItem from '@/components/HouseItem.vue'
	import  DetailPopup from '@/components/DetailPopup.vue'
	
	onLoad(()=>{
		recommend()  //获取推荐
	})
	const showResult = ref(false)
	//加载更多状态
	const loadStatus = ref('contentdown')	
	const listData = ref([])
	const region = ref('')
	const pages = reactive({
		pageIndex:1,
		totalPage: 0   //总共有多少页数据
	})
	const noData = ref(false)   //没有搜索到数据
	const getHouseListFun = async ()=>{
		noData.value = false
		uni.showLoading({
			title: '加载中'
		});
		try{
			const res = await getHouseByRegion({
				region: region.value
			})
			if(res.code == 200){
				listData.value = res.data || []
				if(res.data?.length == 0){
					noData.value = true
				}
			}
			uni.hideLoading()
		}catch(e){
			//TODO handle the exception
			uni.showToast({
				title:e.msg,
				icon:'none'
			})
			uni.hideLoading()
		}
	}
	
	//打开联系房主弹窗
	const popShow = ref(false)
	const contactHost = (item)=>{
		popShow.value = true
	}
	
	const itemClick=(item)=>{
		uni.navigateTo({
			url:'/pages/houseDetail/houseDetail'
		})
	}
	
	const search = ()=>{
		getHouseListFun()
		showResult.value = true
	}
	const citys = ref([])
	//推荐
	const recommend = ()=>{
		getName().then(res=>{
			if(res.code == 200){
				citys.value = res.data || []
			}
		}).catch(err=>{
			
		})
	}
	const cityClick = (item)=>{
		region.value = item.countryName
		listData.value = []
		search()
	}
	
	const inputChange = (e)=>{
		if(!e){
			showResult.value = false
		}
	}
	
	const styles = reactive({
		"borderColor": "#FFFFFF",
		"outLine":"none"
	});

</script>

<style lang="scss" scoped>
.search {
	padding: 48rpx;
	.result-box{
		padding: 20upx 0;
	}
	.search-input-body {
		display: flex;
		align-items: center;
		.search-input {
			display: inline-flex;
			align-items: center;
			padding: 0 24rpx;
			border-radius: 999rpx;
			overflow: hidden;
			flex: 1;
			box-shadow: 0px 12rpx 60rpx 0px rgba(0, 0, 0, 0.10);
			.search-icon {
				width: 48rpx;
				height: 48rpx;
			}
		}
		.search-tipes {
			color: #000B3B;
			font-size: 32rpx;
			font-weight: 500;
			margin-left: 20rpx;
		}
	}
	
	.search-value {
		margin-top: 36rpx;
		.search-title {
			font-size: 32rpx;
			color: #000B3B;
			font-weight: 600;
			margin-bottom: 26rpx;
		}
		.search-fn {
			font-size: 28rpx;
			font-weight: 500;
			display: inline-block;
			padding: 6rpx 24rpx;
			text-align: center;
			border: 1rpx solid #000B3B;
			border-radius: 40rpx;
			margin-right: 28upx;
		}
	}
	.no-data {
		width: 462rpx;
		line-height: 48rpx;
		font-size: 32rpx;
		font-weight: 500;
		color: #000B3B;
		margin: 0 auto;
		text-align: center;
		margin-top: 140upx;
	}
}
</style>
