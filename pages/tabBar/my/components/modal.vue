<template>
	<uni-popup
		ref="popup"
		type="bottom"
		:is-mask-click="false"
		:safe-area="false"
	>
		<view class="housing-fn">
			<view class="housing-title flex-jb">
				<text class="ptc-title">{{props.title}}</text>
				<view class="close" @click="cancle">
					<image src="../../../../static/image/x-close.png" mode=""></image>
				</view>
			</view>
			<slot name="content"></slot>
			<view class="ptc-button flex justify-content-between align-items-center">
				<view class="flex-1" @click="cancle">
					<button type="primary" class="cancle-btn">{{cancelText}}</button>
				</view>
				<view class="flex-1" @click="confirm">
					<button type="default" class="sure-btn">{{confirmText}}</button>
				</view>
			</view>
		</view>
		
	</uni-popup>
</template>

<script setup>
import { ref, defineExpose, defineProps,watch,nextTick } from 'vue';

const props = defineProps({
	show: {
		default: false,
		type: Boolean
	},
	// 弹窗标题
	title: {
		type: String,
		default: '提示'
	},
	// 确认按钮文字
	confirmText: {
		type: String,
		default: '是'
	},
	// 取消按钮文字
	cancelText: {
		type: String,
		default: '否'
	},
	// 隐藏取消按钮
	hideCancel: {
		type: Boolean,
		default: false
	},
	// 隐藏确认按钮
	confirmCancel: {
		type: Boolean,
		default: false
	},
});

	const emits = defineEmits(['popTap'])

	watch(()=>props.show,(v,ov)=>{
		nextTick(()=>{
			if (v) {
				popup.value.open()
			} else {
				popup && popup.value.close()
			}
		})
	},{ deep:true })

const cancle = ()=>{
	emits('popTap','close')
	popup.value.close()
}

const confirm = ()=>{
	emits('popTap','confirm')
}

const popup = ref(null);
function open() {
	popup.value.open();
}
function close() {
	popup.value.close();
}
defineExpose({
	open, close
});
</script>

<style lang="scss" scoped>
	// 弹出选择层
	.housing-fn {
		width: 100%;
		background: #fff;
		box-sizing: border-box;
		border-top-left-radius: 24rpx;
		border-top-right-radius: 24rpx;
		padding: 40rpx 50rpx 138rpx 50rpx;
		box-shadow: 0rpx 0rpx 10rpx 1rpx rgba(179,179,179,0.3);
		.flex-jb{
			display: flex;
			align-item: center;
			justify-content: space-between;
		}
		.close{
			text-align: right;
		}
		.close image{
			width: 48rpx;
			height: 48rpx;
		}
		.ptc-title {
			margin-bottom: 35rpx;
			text-align: center;
			font-size: 40rpx;
			font-family: PingFang SC-Bold, PingFang SC;
			font-weight: bold;
			color: #333333;
			display: inline-block;
			flex: 1;
			text-align: center;
		}
	
		// 内容
		.ptc-content {
			width: 100%;
			text-align: center;
	
			// 图片
			.ptc-img {
				width: 360rpx;
				height: 360rpx;
				overflow: hidden;
				margin: 0 auto;
				margin-bottom: 40rpx;
				.image {
					width: 100%;
					height: 100%;
				}
			}
			.text{
				text-align: center;
				line-height: 40rpx;
				font-size: 28rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #999999;
			}
		}
	
		.ptc-button {
			margin-top: 50rpx;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			.flex-1 + .flex-1 {
			  margin-left: 20rpx;
			}
			button{
				width: 30vw;
				border-radius: 40rpx;
				color: #fff;
				height: 80rpx;
				line-height: 80rpx;
			}
			.cancle-btn{
				
				background-color: #909193;
				// color: #fff;
			}
			.sure-btn{
				// width: 30vw;
				// height: 80rpx;
				// color: #ffffff;
				// border-radius: 88rpx;
				text-align: center;
				background-color: #D8336D;
			}
			
		}
		
	}
</style>