<template>
	<view class="search">
		<view class="search-input-body">
			<view class="search-input">
				<image class="search-icon" src="../../../static/image/search.jpg" mode=""></image>
				<uni-easyinput :styles="styles" type="text" placeholder="搜索目的地"></uni-easyinput>
			</view>
			<text class="search-tipes" @click="search">搜索</text>
		</view>
		
		<!-- 默认值 -->
		<view class="search-value" v-if="!showResult">
			<view class="search-title">
				推荐目的地
			</view>
			<view class="search-fn">
				中国
			</view>
		</view>
		<view class="result-box" v-else>
			<!-- 房源 -->
			<view class="">
				<HouseItem v-for="(item,i) in listData" :key="i" :item="item" @contactHost="contactHost" @itemClick="itemClick"/>
			</view>
			<template v-if="false">
				<view class="no-data">
					该地区暂时没有换宿房源，<br/>请修改或调整搜索区域
				</view>
			</template>
		</view>
		
	</view>
</template>

<script setup> 
	import { reactive,ref } from 'vue';
	import { getHouseList } from '@/common/api/common'
	import  HouseItem from '@/components/HouseItem.vue'
	
	const showResult = ref(false)
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
	const getHouseListFun = async ()=>{
		loadStatus.value ='loading'
		try{
			const res = await getHouseList({
				pageIndex: pages.pageIndex,
			})
			if(res.code == 200){
				listData.value = listData.value.concat(res.data.data)
				pages.totalPage = res.data.pageCount
			}
			// 已请求完所有数据
			if(pages.pageIndex >= res.data.pageCount){
				loadStatus.value = 'noMore'
			}
		}catch(e){
			//TODO handle the exception
			console.log('列表错误==',e)
		}
	}
	
	const search = ()=>{
		showResult.value = true
		getHouseListFun()
	}
	
	const styles = reactive({
		"borderColor": "#FFFFFF"
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
			border-radius: 999rpx;
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
	}
}
</style>
