<template>
	<view class="uploade">
		<view class="uploade-button">
			<view class="title">
				请上传您的房源照片（至少一张）
			</view>
			<scroll-view class="uploade-scroll" :scroll-x="true" >
				<view class="uploade" @click="uploadHead">
					<image src="../../../static/image/union.png" mode=""></image>
				</view>
				<view class="uploade-image">
					
				</view>
			</scroll-view>
		</view>
		
		<view class="uploade-col" @click="provinceShow=true">
			<view class="uploade-title">
				房源所在地址
			</view>
			<view class="col-select">
				<view class="tips">
					{{ form.address}}
				</view>
				<image class="icon" src="../../../static/image/arrow-right.png" mode=""></image>
			</view>
		</view>
		<view class="uploade-col">
			<view class="uploade-title">
				可接待房客数
			</view>
			<view class="col-select">
				<view class="tips">
					{{ formData.houseAmount }}
				</view>
				<uni-number-box :min="1" v-model="formData.houseAmount"></uni-number-box>
			</view>
		</view>
		<view class="uploade-col" @click="handleSetTime">
			<view class="uploade-title">
				开放换宿时间
			</view>
			<view class="col-select">
				<view class="tips">
					<!-- <text style="color: #909193;">未设置</text> -->
					<!-- 日期选择器 -->
					<hl-calendar-range @selectorDate="handleSelectorDate"></hl-calendar-range>
				</view>
				<image class="icon" src="../../../static/image/arrow-right.png" mode=""></image>
			</view>
		</view>
		<view class="uploade-col-textarea">
			<view class="uploade-title">
				对房客说的话
			</view>
			<view class="col-input">
				<uni-easyinput :styles="styles" type="textarea" :autoHeight="false" placeholder="请输入内容" v-model="formData.describle"></uni-easyinput>
				<view class="sum">
					0 / 300
				</view>
			</view>
		</view>
	</view>
	<!-- 按钮 -->
	<view class="button-body">
		<view class="save">
			保存编辑
		</view>
		<view class="submit" @click="handleUploadHouse">
			提交房源
		</view>
	</view>
	
	<Location @popupClick="popupClick" :show="provinceShow" :chooseArea="chooseArea"></Location>
</template>

<script setup>
	import { reactive,ref } from 'vue';
	import Location from '@/components/location'
	import hlCalendarRange from '@/components/hlCalendarRange.vue'
	import { uploadHouse, uploadAvatar } from '@/common/api/common'
	import  { imgToBase64, msg }  from '@/common/js/util.js'
	import { onShow } from '@dcloudio/uni-app'
	const styles = reactive({
		"borderColor": "#ffffff",
		"height": "600px"
	})
	
	// 用户信息
	const userInfo = ref({});
	onShow(() => {
		userInfo.value = uni.getStorageSync('userInfo');
	});
	
	const form = reactive({
		address:'请选择'
	})
	
	//选中的省市区
		const chooseArea = ref([])
		//省市区弹窗
		const provinceShow = ref(false)
	
	const popupClick = (e) => {
	  console.log(e,'---------------------------popupClick')
	  if( e.funName == 'cancle' ){
	    provinceShow.value = false
	  }else if( e.funName == 'submit' ){
		  chooseArea.value = e.value
		  provinceShow.value = false   //关闭地址弹窗
		  form.address = chooseArea.value[0].countryName+'-'+chooseArea.value[1].regionName+'-'+chooseArea.value[2].cityName
	  }
	}
	
	// 选择房源地址
	function hanldeSelectAddress() {
		uni.navigateTo({
			url: '/pages/public/searchAddress/searchAddress'
		})
	}
	const locationVisible = ref(false);
	
	// 上传图片
	const uploadHead = async()=>{
		uni.chooseImage({
			count: 1,
			crop: {
				width: 100,
				height: 100
			},
			success: async(e)=>{
				//判断文件后缀名
				console.log('图片上传',e)
				if (e.tempFilePaths[0].split('.')[e.tempFilePaths[0].split('.').length - 1].includes('gif')) {
					msg('暂不支持上传gif图片，请重新选择后上传')
					return false
				}
				// form.avatar = e.tempFiles[0]
				
				try{
					const base = await imgToBase64(e.tempFiles[0].path)
					const avatarRes = await uploadAvatar({
						avatar: base,
						userId:userInfo.value.userId
					})
					console.log(avatarRes)
					// form.avatar = avatarRes.data || e.tempFiles[0]
				}catch(e){
					msg(e.msg)
				}
				
				
				// uploadFile(e.tempFilePaths).then(res => {
				// 	console.log('图片上传成功',res)
				// 	form.avatar = res[0]
				// }).catch(e => {
				// 	console.log('图片上传错误', e)
				// })
			},
			fail(e) {
				console.log('选择图片错误', e)
			}
		})
	}
	
	const formData = reactive({
		houseTitle: '测试新增房源',
		houseAmount: 1,
		describle: '',
		startTime: '',
		endTime: '',
		files: [],
		countryId: 1,
		cityId: 1,
		regionId: 1
	});
	
	// 日期范围选择回调
	function handleSelectorDate({start, end}) {
		formData.startTime = `${start.year}/${start.weak}/${start.day}` ?? '';
		formData.endTime = `${end.year}/${end.weak}/${end.day}` ?? '';
	}
	// 提交房源信息
	const handleUploadHouse = async () => {
		let data = {userId: 630, ...formData}
		try {
			const res = await uploadHouse(data);
			console.log(res);
		} catch(e) {
			msg(e || '系统繁忙，请稍后重试')
		}
	}
</script>

<style lang="scss" scoped>
	.uploade {
		.uploade-button {
			.title {
				font-weight: 500;
				font-size: 32rpx;
				color: #000B3B;
				padding: 0 48rpx;
				margin-bottom: 16rpx;
			}
		}
		.uploade-scroll {
			// display: flex;
			// align-items: center;
			white-space: nowrap;
			width: 100%;
			.uploade {
				width: 176rpx;
				height: 176rpx;
				border-radius: 16rpx;
				margin-left: 48rpx;
				display: inline-flex;
				align-items: center;
				justify-content: center;
				background-color: #F3F3F3;
				float: left;
				>image {
					width: 30rpx;
					height: 30rpx;
				}
			}
			.uploade-image {
				width: 176rpx;
				height: 176rpx;
				background-color: #eee;
				margin-left: 20rpx;
				border-radius: 16rpx;
				display: inline-block;
				>image {
					width: 176rpx;
					height: 176rpx;
				}
			}
			.uploade-image:last-child {
				margin-right: 48rpx;
			}
		}
		
		.uploade-col {
			margin: 0 48rpx;
			display: flex;
			align-items: center;
			padding: 32rpx 0;
			border-bottom: 1rpx solid #EEE;
			.uploade-title {
				font-weight: 500;
				font-size: 32rpx;
				color: #000B3B;
				margin-right: 46rpx;
			}
			.col-select {
				display: flex;
				flex: 1;
				align-items: center;
				.tips {
					flex: 1;
					font-size: 32rpx;
					font-weight: 400;
					color: #000B3B;
				}
				.icon {
					width: 16rpx;
					height: 26rpx;
				}
			}
		}
		
		.uploade-col-textarea {
			padding: 0 48rpx;
			.uploade-title {
				font-weight: 500;
				font-size: 32rpx;
				color: #000B3B;
				margin-right: 46rpx;
				padding: 32rpx 0;
			}
			.col-input {
				padding: 20rpx;
				border-radius: 8rpx;
				border: 1rpx solid #EEE;
				.sum {
					font-size: 24rpx;
					color: #909193;
					font-weight: 400;
					text-align: right;
				}
			}
		}
	}
	.button-body {
		display: flex;
		align-items: center;
		position: fixed;
		bottom: 88rpx;
		left: 0;
		right: 0;
		margin: 0 auto;
		justify-content: space-evenly;
		>view {
			width: 314rpx;
			height: 86rpx;
			text-align: center;
			line-height: 86rpx;
			border-radius: 86rpx;
			color: #ffffff;
			font-size: 32rpx;
			font-weight: 600;
			box-shadow: 8rpx 8rpx 16rpx rgba(212, 212, 212, 0.60);
		}
		.save {
			background-color: #909193;
		}
		.submit {
			background-color: #D8336D;
		}
	}
</style>