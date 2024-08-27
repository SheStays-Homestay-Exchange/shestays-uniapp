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
				<template v-for="(item, index) in formData.files">
					<view class="uploade-image">
						<image :src="item" mode="aspectFill" @click="previewImage(index)"></image>
						<view class="remover" @click="handleRemover(index)">
							删除图片
						</view>
					</view>
				</template>
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
					<hl-calendar-range
						@selectorDate="handleSelectorDate"
						ref="hlCalendarRange"
						:startTime="formData.startTime"
						:endTime="formData.endTime"
					></hl-calendar-range>
				</view>
				<image class="icon" src="../../../static/image/arrow-right.png" mode=""></image>
			</view>
		</view>
		<view class="uploade-col-textarea">
			<view class="uploade-title">
				对房客说的话
			</view>
			<view class="col-input">
				<uni-easyinput :styles="styles" type="textarea" maxlength="300" :autoHeight="false" placeholder="请输入内容" v-model="formData.describle"></uni-easyinput>
				<view class="sum">
					{{formData.describle.length ?? 0}} / 300
				</view>
			</view>
		</view>
	</view>
	<!-- 按钮 -->
	<view class="button-body">
		<view class="save" @click="handleUploadHouse('pending_view')">
			保存编辑
		</view>
		<view class="submit" @click="handleUploadHouse('reviewing')">
			提交房源
		</view>
	</view>
	
	<Location @popupClick="popupClick" :show="provinceShow" :chooseArea="chooseArea"></Location>
</template>

<script setup>
	import { reactive, ref } from 'vue';
	import Location from '@/components/location'
	import hlCalendarRange from '@/components/hlCalendarRange.vue'
	import { uploadHouse, uploadAvatar } from '@/common/api/common'
	import  { imgToBase64, msg }  from '@/common/js/util.js'
	import { onLoad, onShow, onReady, onUnload } from '@dcloudio/uni-app'
	import cache from '/common/js/cache.js'
	import { uploadFile, uploadHouseImg } from '@/common/js/request';
	
	const styles = reactive({
		"borderColor": "#ffffff",
		"height": "600px"
	})
	
	// 用户信息
	const userInfo = ref({});
	const draft = ref({});
	const form = reactive({
		address:'请选择'
	});
	// 表单
	const formData = ref({
		houseTitle: '测试新增房源',
		houseAmount: 1,
		describle: '',
		startTime: '',
		endTime: '',
		files: [],
		countryCode: '',
		cityCode: '',
		regionCode: '',
		countryName:'',
		regionName:'',
		cityName:'',
		detailAddress: '',
		statusCode:'reviewing'   //房源状态reviewing新增，pending_view编辑
	});
	
	onShow(() => {
		userInfo.value = uni.getStorageSync('userInfo');
	});
	
	onLoad((option)=>{
		//有编辑展示编辑信息，没有编辑查找是否有草稿
		if(option.edit){
			//编辑页面跳转过来的
			let editHouse = JSON.parse(option.edit); 
			// editHouse.statusCode = 'pending_view'    //编辑状态
			// formData.value = editHouse
			// 数据回显
			formData.value.files = editHouse.houseImgs.map(item=>item.imgUrl);
			
			formData.value.houseTitle =  editHouse.houseTitle;
			formData.value.houseAmount = editHouse.houseAmount ?? 1;
			formData.value.describle = editHouse.describle ?? "";
			formData.value.startTime = editHouse.startTime?.split(" ")[0];
			formData.value.endTime = editHouse.endTime?.split(" ")[0];
			formData.value.countryCode = editHouse.countryCode;
			formData.value.cityCode = editHouse.cityCode;
			formData.value.regionCode = editHouse.regionCode;
			formData.value.countryName = editHouse.countryName;
			formData.value.regionName = editHouse.regionName;
			formData.value.cityName = editHouse.cityName;
			formData.value.detailAddress = editHouse.detailAddress;
			
			console.log(formData.value)
			//地址
			var houseArea = []
			if(editHouse.cityCode){
				 houseArea = [
					{
						countryName: editHouse.countryName,
						countryCode: editHouse.countryCode
					},
					{
						regionName: editHouse.regionName,
						regionCode: editHouse.regionCode
					},
					{
						cityName: editHouse.cityName,
						cityCode: editHouse.cityCode
					}
				]
				console.log('地址~~~~',houseArea)
				chooseArea.value = houseArea
				form.address = houseArea[0].countryName+'-'+houseArea[1].regionName+'-'+ houseArea[2].cityName
			}
			//含区县
			if(editHouse.districtCode){
				chooseArea.value.push({
					districtName: editHouse.districtName,
					districtCode: editHouse.districtCode
				})
				form.address = houseArea[0].countryName+'-'+houseArea[1].regionName+'-'+ houseArea[2].cityName+'-'+ houseArea[3].districtName
			}
			console.log('editHouse',formData.value)
			// 图片回显
			
		}else{
			draft.value = uni.getStorageSync('draftHouse') || {}
			// formData.value = draft.value
			//草稿里地址
			if(draft.value?.area){
				chooseArea.value = draft.value?.area
				form.address = chooseArea.value[0].countryName+'-'+chooseArea.value[1].regionName+'-'+chooseArea.value[2].cityName
			}
		}
	})
	
	
	
	//选中的省市区
		const chooseArea = ref([])
		//省市区弹窗
		const provinceShow = ref(false)
	
	const popupClick = (e) => {
	  if( e.funName == 'cancle' ){
	    provinceShow.value = false
	  }else if( e.funName == 'submit' ){
		  chooseArea.value = e.value
		  provinceShow.value = false   //关闭地址弹窗
		  console.log('选址的地址====',chooseArea.value)
		  form.address = chooseArea.value[0].countryName+'-'+chooseArea.value[1].regionName+'-'+chooseArea.value[2].cityName+'-'+chooseArea.value[3].districtName
		  // 获取code
		  formData.value.countryCode = chooseArea.value[0].countryCode;
		  formData.value.regionCode = chooseArea.value[1].regionCode;
		  formData.value.cityCode = chooseArea.value[2].cityCode;
		  formData.value.countryName= chooseArea.value[0].countryName;
		  formData.value.regionName = chooseArea.value[1].regionName;
		  formData.value.cityName = chooseArea.value[2].cityName;
		  formData.value.districtName = chooseArea.value[3].districtName;
		  formData.value.districtCode = chooseArea.value[3].districtCode;
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
			count: 10,
			crop: {
				width: 100,
				height: 100
			},
			success: async(e)=>{
				//判断文件后缀名
				if (e.tempFilePaths[0].split('.')[e.tempFilePaths[0].split('.').length - 1].includes('gif')) {
					msg('暂不支持上传gif图片，请重新选择后上传')
					return false
				}
				
				uploadHouseImg(e.tempFilePaths).then(res => {
					console.log('图片上传返回',res)
					if(res?.length>0){
						formData.value.files = formData.value.files.concat(res)
					}
				}).catch(err=>{
					console.log('图片上传返回失败',err)
				})
				
			},
			fail(e) {
				console.log('选择图片错误', e)
			}
		})
	}
	
	// 日期范围选择回调
	function handleSelectorDate({start, end}) {
		formData.value.startTime = `${start.year}/${start.month}/${start.day}` ?? '';
		formData.value.endTime = `${end.year}/${end.month}/${end.day}` ?? '';
	}

	// 提交房源信息
	const handleUploadHouse = async (status) => {
		uni.showLoading()
		let data = {userId: userInfo.value.userId, ...formData.value,houseImgPath:formData.value.files}
		data.statusCode = status;
		if(data?.area){
			delete data.area
		}
		try {
			const res = await uploadHouse(data);
			uni.hideLoading()
			//提交成功清除本地草稿箱
			// cache.remove('draftHouse')
			uni.switchTab({
				url:'/pages/tabBar/my/my'
			})
		} catch(e) {
			msg(e.msg || '系统繁忙，请稍后重试')
			uni.hideLoading()
		}
	}
	
	//保存草稿
	const saveDraft = ()=>{
		cache.put('draftHouse',{...formData.value,area:chooseArea.value})
		uni.showModal({
			content:'保存房源成功！',
			title:'提示',
			showCancel: false,
			confirmText:'知道啦',
			confirmColor: '#D8336D',
			success(e){
				uni.navigateBack()
			}
		})
	}
	
	// 编辑回显
	onReady(() => {
		const hlCalendarRange = ref(null);
		console.log(hlCalendarRange.value)
		console.log(123);
	});
	
	// 预览图片
	function previewImage(index) {
		uni.previewImage({
			current: index, // 当前显示图片索引
			urls: formData.value.files // 需要预览的图片http链接列表
		});
	}
	
	// 删除图片
	function handleRemover(index) {
		formData.value.files.splice(index, 1);
	}
	
	// 界面离开
	onUnload(() => {
		cache.remove('draftHouse');
	});
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
		.uploade-scroll::after {
			content: "";
			display: block;
			height: 0;
			clear: both;
			visibility: hidden;
		}
		.uploade-scroll {
			// display: flex;
			// align-items: center;
			white-space: nowrap;
			width: 100%;
			height: 176rpx;
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
				position: relative;
				>image {
					width: 176rpx;
					height: 176rpx;
					border-radius: 16rpx;
				}
				.remover {
					position: absolute;
					left: 0;
					right: 0;
					bottom: 0;
					width: 100%;
					height: 40rpx;
					display: flex;
					line-height: 40rpx;
					align-items: center;
					color: #D8336D;
					font-weight: 600;
					justify-content: space-around;
					background-color: rgba(212, 212, 212, 0.60);
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