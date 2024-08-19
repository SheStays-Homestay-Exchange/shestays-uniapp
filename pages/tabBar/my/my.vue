<template>
	<view class="my-body">
		<!-- 头像 -->
		<view class="user">
			<view class="user-icon">
				<image :src="myInfo.avatarUrl" class="user-image" mode="" v-if="myInfo.avatarUrl" @click="handleGoPage('/pages/tabBar/my/updateMyInfo/updateMyInfo')"></image>
				<view class="init-head" v-else @click="handleGoPage('/pages/tabBar/my/updateMyInfo/updateMyInfo')">
					<uni-icons type="person-filled" size="40" color="#999"></uni-icons>
				</view>
				<view class="user-name">
					<view class="user-title" @click="handleGoPage('/pages/tabBar/my/updateMyInfo/updateMyInfo')">
						{{myInfo.userName ? myInfo.userName : myInfo.phone}}
					</view>
					<view class="user-home" @click="handleGoPage('/pages/tabBar/my/myHome/myHome')">
						个人主页
					</view>
				</view>
			</view>
			<view class="user-update" @click="handleGoPage('/pages/tabBar/my/updateMyInfo/updateMyInfo')">
				<image class="edit-icon" src="../../../static/image/edit.jpg" mode=""></image>
				个人信息
			</view>
		</view>
		<!-- 我的房源 -->
		<view class="my-house">
			<view class="left" @click="handleGoPage('/pages/tabBar/my/myHousing')">
				<image class="my-icon" src="../../../static/image/image_25.png" mode=""></image>
				<view class="house-title">
					我的房源
				</view>
			</view>
			<view class="line"></view>
			<view class="right" @click="handleGoPage('/pages/tabBar/my/uploadHousing')">
				<image class="my-icon" src="../../../static/image/upload_room_icon.png" mode=""></image>
				<view class="house-title">
					发布房源
				</view>
			</view>
		</view>
		
		<!-- 房屋审核管理 -->
		<view class="fn-body">
			<view class="title">
				房屋审核管理
			</view>
			<view class="fn-li" @click="handleGoPage('/pages/tabBar/my/housingList/housingList')">
				<view class="left">
					<image class="fn-icon" src="../../../static/image/user-square.png" mode=""></image>
					<text class="fn-li-title">待审核房源</text><text>(3)</text>
				</view>
				<image class="fn-right" src="../../../static/image/chevron-right.jpg" mode=""></image>
			</view>
		</view>
		
		<!-- 设置 -->
		<view class="fn-body">
			<view class="title">
				设置
			</view>
			<view class="fn-li">
				<view class="left">
					<image class="fn-icon" src="../../../static/image/user-square.png" mode=""></image>
					<text class="fn-li-title">个人信息</text>
				</view>
				<image class="fn-right" src="../../../static/image/chevron-right.jpg" mode=""></image>
			</view>
			<view class="fn-li" @click="handleGoPage('/pages/rules/rules')">
				<view class="left">
					<image class="fn-icon" src="../../../static/image/tool-02.png" mode=""></image>
					<text class="fn-li-title">隐私和共享</text>
				</view>
				<image class="fn-right" src="../../../static/image/chevron-right.jpg" mode=""></image>
			</view>
		</view>
		<!-- 支持 -->
		<view class="fn-body">
			<view class="title">
				支持
			</view>
			<view class="fn-li" @click="concact">
				<view class="left" >
					<image class="fn-icon" src="../../../static/image/mail-01.png" mode=""></image>
					<text class="fn-li-title">联系我们</text>
				</view>
				<image class="fn-right" src="../../../static/image/chevron-right.jpg" mode=""></image>
			</view>
			<view class="fn-li" @click="handleGoPage('/pages/rules/rules')">
				<view class="left">
					<image class="fn-icon" src="../../../static/image/file-05.png" mode=""></image>
					<text class="fn-li-title">法律条款</text>
				</view>
				<image class="fn-right" src="../../../static/image/chevron-right.jpg" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { reactive, ref, onMounted,computed  } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { getUserInfoByOpenId } from '@/common/api/common'
	import  {msg}  from '@/common/js/util.js'
	import cache from "@/common/js/cache.js";
	
	
	onLoad(()=>{
		getUserInfo()
	})
	
	const myInfo = ref({})
	const getUserInfo= async (type)=>{
		let userInfo = typeof(cache.get('userInfo')) == 'string' ? JSON.parse( cache.get('userInfo') ) : cache.get('userInfo') 
		try{
			const res = await getUserInfoByOpenId({
				openId: userInfo.openId
			})
			if(res.code == 200){
				myInfo.value = res.data || {}
			}

		}catch(e){
			msg(e.msg || '系统繁忙，请稍后重试')
		}
	}
	
	
	const concact = ()=>{
		uni.showModal({
			title: '联系我们',
			content: '邮箱：SheStays@163.com',
			showCancel: false,
			confirmText:'知道啦',
			success: function (res) {

			}
		});
	}
	function handleGoPage (url) {
		console.log(url);
		uni.navigateTo({
			url: url
		})
	}
</script>

<style lang="scss" scoped>
	.init-head{
		width: 128rpx;
		height: 128rpx;
		background: #eee;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
	}
.my-body {
	padding: 40rpx 48rpx;
	.user {
		display: flex;
		justify-content: space-between;
		.user-icon {
			display: flex;
			.user-image {
				width: 128rpx;
				height: 128rpx;
				border-radius: 128rpx;
				background-color: #eee;
			}
			.user-name {
				margin-left: 40rpx;
				.user-title {
					font-size: 48rpx;
					font-weight: 600;
					white-space: nowrap; /* 保持文本在一行显示 */
					overflow: hidden;    /* 隐藏超出部分 */
					text-overflow: ellipsis; /* 显示省略号 */
				}
				.user-home {
					color: #D8336D;
					font-weight: 600;
					font-size: 28rpx;
				}
			}
 		}
		.user-update {
			font-size: 24rpx;
			color: #909193;
			font-weight: 600;
			display: inline-flex;
			align-items: center;
			.edit-icon {
				width: 26rpx;
				height: 26rpx;
			}
		}
 	}
	
	.my-house {
		display: flex;
		align-items: center;
		background-color: #ffffff;
		padding: 32rpx 0;
		border-radius: 48rpx;
		margin-top: 48rpx;
		box-shadow: 0rpx 8rpx 30rpx 0rpx rgba(212, 212, 212, 0.60);
		.left,
		.right{
			flex: 1;
			text-align: center;
			.my-icon {
				width: 94rpx;
				height: 94rpx;
			}
			.house-title {
				font-size: 24rpx;
				font-weight: 400;
			}
		}
		.line {
			width: 1rpx;
			height: 124rpx;
			background-color: #D4D4D4;
		}
	}
	
	.fn-body {
		margin-top: 66rpx;
		.title {
			font-size: 48rpx;
			font-weight: 500;
		}
		.fn-li {
			display: flex;
			padding: 18rpx 0;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1rpx solid #eeeeee;
			.left {
				display: flex;
				align-items: center;
				.fn-icon {
					width: 44rpx;
					height: 44rpx;
					margin-right: 26rpx;
				}
				.fn-li-title {
					font-size: 32rpx;
					font-weight: 400;
				}
			}
			
			.fn-right {
				width: 48rpx;
				height: 48rpx;
			}
		}
	}
}
</style>
