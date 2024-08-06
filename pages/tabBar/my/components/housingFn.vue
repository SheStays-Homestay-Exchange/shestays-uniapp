<template>
	<uni-popup ref="housingFnPopup">
		<view class="housing-fn">
			<view class="housing-title">
				<text>{{props.title}}</text>
				<view class="close">
					<image src="../../../../static/image/x-close.png" mode=""></image>
				</view>
			</view>
			<slot name="housingContent"></slot>
		</view>
	</uni-popup>
</template>

<script setup>
import { ref, defineExpose, defineProps } from 'vue';

const props = defineProps({
	title: {
		type: String,
		default: '测试标题'
	}
});

const housingFnPopup = ref(null);
function open() {
	housingFnPopup.value.open();
}
function close() {
	housingFnPopup.value.close();
}
defineExpose({
	open, close
});
</script>

<style lang="scss" scoped>
	.housing-fn {
		width: 100vw;
		height: 590rpx;
		padding: 48rpx 0 0 0;
		background-color: #fff;
		border-top-right-radius: 40rpx;
		border-top-left-radius: 40rpx;
		.housing-title {
			font-size: 40rpx;
			font-weight: 600;
			color: #000B3B;
			position: relative;
			text-align: center;
			.close {
				position: absolute;
				width: 48rpx;
				height: 48rpx;
				top: 0;
				right: 58rpx;
				bottom: 0;
				.close-icon {
					width: 48rpx;
					height: 48rpx;
				}
			}
		}
	}
</style>