<template>
	<view class="housing-list">
		<template v-if="houseList.length != 0">
			<view v-for="(item, index) in houseList" class="list" :key="index" @click="hanldeGoPage(item)">
				<text>待审核：</text>
				<text v-if="item.countryName"> {{ item.countryName }} </text>
				<text v-if="item.regionName"> - {{ item.regionName }} </text>
				<text v-if="item.cityName">- {{ item.cityName }}</text>
			</view>
		</template>
		<template v-else>
			<view class="no-data">
				<text>你已完成房源审核！</text>
			</view>
		</template>
	</view>
</template>

<script setup>
import  {msg}  from '@/common/js/util.js'
import { getUnderViewHouse } from '@/common/api/common'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { ref } from 'vue';
import cache from '@/common/js/cache.js'

const houseList = ref([]);

const userInfo = ref({})
onLoad(() => {
	userInfo.value = cache.get('userInfo') || {}
});
onShow(() => {
	getUnderViewHouseFun();
});
const getUnderViewHouseFun = async () => {
	try {
		const res = await getUnderViewHouse();
		if (res.code == 200) {
			houseList.value = res.data;
		}
	}catch(e){
		msg(e.msg || '系统繁忙，请稍后重试')
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
	
function hanldeGoPage(item) {
	if(isLogin()){
		goPage('/pages/houseDetail/houseDetail?id='+item.houseId)
	}
}
</script>

<style lang="scss" scoped>
.housing-list {
	padding: 48rpx;
	.list {
		color: #000B3B;
		padding: 28rpx;
		font-size: 32rpx;
		font-weight: 400;
		border: 1rpx solid #EEE;
		border-radius: 24rpx;
		margin-bottom: 24rpx;
	}
	.no-data {
		padding-top: 264rpx;
		font-size: 32rpx;
		font-weight: 500;
		color: #000B3B;
		text-align: center;
	}
}
</style>
