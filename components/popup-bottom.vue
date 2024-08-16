<template>
	<uni-popup ref="popup" type="bottom" @touchmove.stop.prevent="moveHandle"  :safe-area="false" class="pop-my" @maskClick="tapOver('cancel')">
		<view class="t-popup">
			<slot name="title">
				<view class="t-popup-title t-popup-pad" v-if="title">
					<uni-icons 
						v-if="isShowBackArrow"
						class="t-popup-title-back" 
						type="back" 
						size="24" 
						:color="'#333'" 
						@tap="tapOver('cancel')"></uni-icons>
					<text>{{ title }}</text>
					<!-- <uni-icons 
						v-if="isShowCloseIcon"
						type="closeempty" 
						size="24" 
						color="#333" 
						class="t-popup-title-close"
						@tap="tapOver('cancel')"></uni-icons> -->
					<image class="t-popup-title-close" 	v-if="isShowCloseIcon" src="https://dt-1308323619.cos.ap-chengdu.myqcloud.com/9116a8378f3a49b7b4a14d9cbfa65da8.png" @tap="tapOver('cancel')"></image>
				</view>
			</slot>
			<view class="t-popup-content t-popup-pad" :style="contentStyle">
				<slot></slot>
			</view>
			<view class="t-popup-bottom t-popup-pad" v-if="diyBtn">
				<slot name="button"></slot>
			</view>
			<!-- 安全高度start -->
			<view class="safe-bottom"></view>
			<!-- 安全高度end -->
		</view>
	</uni-popup>
</template>

<script setup>
	import {
		ref,
		watch,
		nextTick,
		onMounted
	} from 'vue';

	// 引入按钮组件
	const popup = ref(null)
	/**
	 * @module   中间弹出弹窗组件
	 * @property {boolean} show = [false | true]					弹窗显示：[隐藏 | 显示]
	 * @property {string}  title									弹窗标题
	 * @property {string}  confirmText = '确认' 						确认按钮文字
	 * @property {string}  cancelText = '取消'						取消按钮文字
	 * @property {string}  content									弹窗内容
	 * @property {string}  image									图片地址：如果有图片则显示图片（带http的完整图片地址）
	 * @property {boolean} hideCancel								隐藏取消按钮
	 * @property {boolean} confirmCancel							隐藏确认按钮
	 */
	const emits = defineEmits(['tapOver'])

	const props = defineProps({
		show: {
			default: false,
			type: Boolean
		},
		// 弹窗标题
		title: {
			type: String,
			default: ''
		},
		confirmText: {
			type: String,
			default: '提交'
		},
		// 按钮是否禁用
		disabled: {
			type: Boolean,
			default: false,
		},
		//内容区域自定义样式
		contentStyle: {
			type: Object,
			default: () => {}
		},
		//是否显示返回箭头
		isShowBackArrow: {
			type:Boolean,
			default:false,
		},
		//是否显示关闭图标
		isShowCloseIcon: {
			type:Boolean,
			default:true
		},
		//是否展示自定义按钮
		diyBtn: {
			type:Boolean,
			default:false
		}
	})
	// 按钮是否禁用
	const btnStatus = ref(false);
	onMounted(() => {
		if (props.show) {
			popup.value.open()
		}
		btnStatus.value = props.disabled;
	})

	const tapOver = (e) => {
		// this.hide()
		emits('tapOver', e)
	}

	const moveHandle = () => {
		return false
	}

	watch(() => [props.show, props.disabled], (val, ov) => {
		let [v, d] = val;
		nextTick(() => {
			if (v) {
				popup.value.open()
			} else {
				popup && popup.value.close()
			}
			btnStatus.value = d;
		})
	}, {
		deep: true
	})
</script>

<style lang="scss" scoped>
	.pop-my{
		border-radius: 40rpx 40rpx 0rpx 0rpx;
	}
	// 弹出选择层
	.t-popup {
		z-index:9;
		box-sizing: border-box;
		// padding: 40rpx 30rpx;
		background-color: #fff;
		border-radius: 40rpx 40rpx 0rpx 0rpx;
		padding-top:30rpx;

		// margin: auto 40rpx;
		&-title {
			text-align: center;
			font-size: 40rpx;
			font-family: PingFang SC-Bold, PingFang SC;
			font-weight: bold;
			color: #1B2225;
			position: relative;
			// height: 56rpx;

			&-back{
				position: absolute;
				top: 30rpx;
				left: 30rpx;
			}

			&-close {
				width: 28rpx;
				height: 28rpx;
				position: absolute;
				top: 30rpx;
				right: 30rpx;
			}
		}

		&-content {
			height: auto;
			max-height: 780rpx;
			overflow-y: scroll;
		}

		&-pad {
			box-sizing: border-box;
			padding: 30rpx;
		}

		&-bottom {
			// box-shadow: 0rpx -1rpx 0rpx 1rpx rgba(0, 0, 0, 0.1);
			// box-shadow: 0rpx -1rpx 10rpx 1rpx rgba(179,179,179,0.15);
		}
	}
	.safe-bottom{
		padding-bottom: constant(safe-area-inset-bottom) !important;
		padding-bottom:  env(safe-area-inset-bottom) !important;
	}
</style>