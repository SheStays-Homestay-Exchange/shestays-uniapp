<template>
	<uni-popup
		type="bottom"
		ref="editPopup"
		:is-mask-click="false"
		:safe-area="false"
	>
		<view class="edit-housing">
			<view class="edit-title">
				<text>管理房源</text>
				<view class="close" @click="close">
					<image class="close-icon" src="../../../../static/image/x-close.png" mode=""></image>
				</view>
			</view>
			<view class="edit-fn">
				<view class="edit-fn-col" @click="downAction('edit')">
					<view class="edit-fn-col-icon">
						<image class="edit-fn-col-image" src="../../../../static/image/edit-05.png" mode=""></image>
					</view>
					<view class="edit-fn-col-title">
						编辑房源
					</view>
				</view>
				<view class="edit-fn-col" @click="downAction('down')" v-if="popStatus == 2">
					<view class="edit-fn-col-icon">
						<image class="edit-fn-col-image" src="../../../../static/image/slash-circle-01.png" mode=""></image>
					</view>
					<view class="edit-fn-col-title">
						下架房源
					</view>
				</view>
				<view class="edit-fn-col" @click="downAction('del')">
					<view class="edit-fn-col-icon">
						<image class="edit-fn-col-image" src="../../../../static/image/trash-01.png" mode=""></image>
					</view>
					<view class="edit-fn-col-title delete-title">
						删除房源
					</view>
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script setup>
	import { ref, defineExpose } from 'vue';
	/**
	 * 1.审核中、未通过、已下线，不展示下架房源按钮
	 * 
	*/
	const props = defineProps({
		//当前弹窗展示的房源状态
		popStatus: {
			type: [String,Number],
			default: 1
		}
	});
	const editPopup = ref(null);
	const emits = defineEmits(['doAction'])
	// 打开弹框
	function open () {
		editPopup.value.open();
	}
	// 关闭弹框
	function close () {
		editPopup.value.close();
	}
	
	const edit = ()=>{
		close()
		uni.navigateTo({
			url: '/pages/tabBar/my/uploadHousing'
		})
	}
	
	//下架
	const  downAction =(type)=>{
		close()
		emits('doAction',type)   
		// uni.showModal({
		// 	title: '提示',
		// 	content: '您确定要下架房源吗？下架之后您可以重新提交上线房源',
		// 	cancelText:'否',
		// 	confirmText:'是',
		// 	success: function (res) {
		// 		if (res.confirm) {
		// 			console.log('用户点击确定');
		// 		} else if (res.cancel) {
		// 			console.log('用户点击取消');
		// 		}
		// 	}
		// });
	}
	
	// 暴露方法
	defineExpose({
		open, close
	});
</script>

<style lang="scss" scoped>
	.edit-housing {
		width: 100vw;
		height: 590rpx;
		padding: 48rpx 0 0 0;
		background-color: #fff;
		border-top-right-radius: 40rpx;
		border-top-left-radius: 40rpx;
		.edit-title {
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
		
		.edit-fn {
			display: flex;
			align-items: center;
			padding: 140rpx 80rpx 0 80rpx;
			justify-content: space-between;
			.edit-fn-col {
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				.edit-fn-col-icon {
					width: 96rpx;
					height: 96rpx;
					border-radius: 96rpx;
					background-color: #E6E6E6;
					display: flex;
					align-items: center;
					justify-content: center;
					.edit-fn-col-image {
						width: 48rpx;
						height: 48rpx;
					}
				}
				.edit-fn-col-title {
					font-size: 32rpx;
					font-weight: 600;
					color: #000B3B;
					margin-top: 16rpx;
				}
				.delete-title {
					color: #C90E0E;
				}
			}
		}
	}
</style>