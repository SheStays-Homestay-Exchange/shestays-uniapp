<template>
	<view class="housing-list">
		<template v-if="houseList.length != 0">
			<view class="list">
				<text>待审核：亚洲 - 中国 - 上海</text>
			</view>
			<view class="list">
				<text>待审核：亚洲 - 中国 - 上海</text>
			</view>
			<view class="list">
				<text>待审核：亚洲 - 中国 - 上海</text>
			</view>
			<view class="list">
				<text>待审核：亚洲 - 中国 - 上海</text>
			</view>
			<view class="list">
				<text>待审核：亚洲 - 中国 - 上海</text>
			</view>
			<view class="list">
				<text>待审核：亚洲 - 中国 - 上海</text>
			</view>
			<view class="list">
				<text>待审核：亚洲 - 中国 - 上海</text>
			</view>
			<view class="list">
				<text>待审核：亚洲 - 中国 - 上海</text>
			</view>
			<view class="list">
				<text>待审核：亚洲 - 中国 - 上海</text>
			</view>
			<view class="list">
				<text>待审核：亚洲 - 中国 - 上海</text>
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
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue';

const houseList = ref([]);

onLoad(() => {
	getUnderViewHouseFun();
});

const getUnderViewHouseFun = async () => {
	try {
		const res = await getUnderViewHouse();
		if (res.code === 200) {
			houseList.value = res.data;
		}
	}catch(e){
		msg(e.msg || '系统繁忙，请稍后重试')
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
