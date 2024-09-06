<template>
	<view class="bg-box">
		<image src="@/static/image/about.png" mode=""></image>
		<view class="about-fn" @click="goPage">
			发布房源
			<uni-icons type="arrow-right" size="26" color="#fff" style="margin-left: 16rpx;"></uni-icons>
		</view>
	</view>
	<view class="about">
		<view class="about-info">
			<view class="about-title">
				关于SheStays
			</view>
			<view class="about-content">
				SheStays 致力于打造一个安全、互助的女性借换宿平台，助力女性探索世界，享受全新的旅行体验。
			</view>
			<view class="about-content">
				 通过与当地女性借换宿，你可以大胆走出家门，以更加环保，低成本的方式享受当地文化、风俗。
			</view>
		</view>
		<view class="about-faq">
			<view class="about-faq-title">
				FAQ
			</view>
			<uni-collapse >
				<uni-collapse-item title="所有旅程都必须是 1 对 1 互换吗？" :show-animation="true">
					<view class="content">
						<text class="text">不是的！我们支持提供双方互换住宿、单向借宿。只要你有需求，就可以寻找愿意提供房源的姐妹借宿。当然，如果你有空闲的资源，也非常欢迎你为其他姐妹提供帮助!</text>
					</view>
				</uni-collapse-item>
				<uni-collapse-item title="如何联系房源？" :show-animation="true">
					<view class="content">
						<text class="text">你可以在「发现」页面中浏览或检索目的地房源，通过房主留下的联系方式主动向房主发送借换宿申请，并进一步沟通具体的借换宿安排。</text>
						<text class="text">为了提高借换宿成功率，我们建议你完善个人主页信息，方便房主更快速地了解你。在发送申请时，可以提供简单的自我介绍和出行计划，有助于双方高效沟通。</text>
					</view>
				</uni-collapse-item>
				<uni-collapse-item title="如何上传房源？" :show-animation="true">
					<view class="content">
						<text class="text">你可以在「个人主页-发布房源」中发布你的房源，提交房源后，SheStays 管理员将审核你的房源，通过后将开启你的互换旅程！</text>
					</view>
				</uni-collapse-item>
				<uni-collapse-item title="【预告】姐妹币规则" :show-animation="true">
					<view class="content">
						<text class="text">姐妹币可以用于支付平台上的换宿费用，帮助您轻松入住心仪的房源。更棒的是，您还可以在我们的合作酒店和民宿中使用姐妹币，甚至能部分抵扣全球优质品牌五星级酒店和特色民宿的费用。此外，我们还为您准备了专属的姐妹币兑换专区，您可以用姐妹币换取各种精美礼品。</text>
						<text>姐妹币将会在下个小程序版本正式上线，在下个版本上线之前完成注册的用户将会在姐妹币规则生效时获得一定数额的姐妹币补偿。</text>
					</view>
				</uni-collapse-item>
				<uni-collapse-item title="【预告】如何获取姐妹币" :show-animation="true">
					<view class="content mg-b-20">
						<text class="text bold">1、注册新用户</text>
						<text class="text">成为 SheStays 平台的新用户，注册完成后即可获取一定数量的姐妹币。作为我们的欢迎礼物，<text class="bold">第一批注册用户将享受更多姐妹币的特别赠送，</text>帮助您更快开启换宿之旅。</text>
					</view>
					<view class="content mg-b-20">
						<text class="text bold">2、实名认证</text>
						<text class="text">完成实名认证，验证身份后将获得额外的姐妹币奖励。</text>
					</view>
					<view class="content mg-b-20">
						<text class="text bold">3、发布房源</text>
						<text class="text">成功发布一个房源，并通过平台审核，即可根据房源质量获得相应的姐妹币。</text>
					</view>
					<view class="content mg-b-20">
						<text class="text bold">4、完成换宿</text>
						<text class="text">当您完成一次成功的换宿交易时，您将获得房客支付的姐妹币。</text>
					</view>
					<view class="content mg-b-20">
						<text class="text bold">5、邀请奖励</text>
						<text class="text">如果您邀请朋友加入SheStays平台，每当您的朋友成功注册并完成首次换宿，您和您的朋友都会获得额外的姐妹币奖励。</text>
					</view>
				</uni-collapse-item>
				<uni-collapse-item title="【预告】姐妹币的使用方式" :show-animation="true">
					<view class="content mg-b-20">
						<text class="text bold">1、换宿支付</text>
						<text class="text">姐妹币可用于在平台上支付换宿费用，直接用于支付给房东。</text>
					</view>
					<view class="content mg-b-20">
						<text class="text bold">2、合作酒店/民宿换宿</text>
						<text class="text">姐妹币可在 SheStays 平台合作的酒店或民宿中进行换宿支付。</text>
					</view>
					<view class="content mg-b-20">
						<text class="text bold">3、线下女性赋能优质活动参与</text>
						<text class="text">姐妹币可用于兑换各类线下女性赋能优质活动的入场券，如瑜伽营、女性健身房、心理疗愈工作坊、学习成长活动、职业规划、财商培养、理财规划等各类主题项目，助力您在旅行之外依然能从SheStay获取源源不断的能量，与来自不同背景的姐妹相互赋能、共同前行。</text>
					</view>
					<view class="content mg-b-20">
						<text class="text bold">4、部分抵扣</text>
						<text class="text">姐妹币可部分抵扣全球优质品牌五星级酒店或特色民宿项目的费用。</text>
					</view>
					<view class="content mg-b-20">
						<text class="text bold">5、福利兑换 </text>
						<text class="text">姐妹币还可用于在兑换专区兑换各种礼品或福利等。</text>
					</view>
					<view class="content mg-b-20">
						<text class="text">……更多获取和使用方式陆续推出，敬请期待惊喜。 </text>
					</view>
				</uni-collapse-item>
				<uni-collapse-item title="我该如何确保旅程的安全？" :show-animation="true">
					<view class="content">
						<text class="text">
							身份验证：双方在自愿情况下，可交换 ID 等有效证件的复印件或照片，以确认彼此身份。
						</text>
						<text class="text">
							视频通话：自愿情况下，姐妹们可以通过视频通话进一步确认对方的真实性，并详细了解住宿环境。
						</text>
						<text class="text margin-t-10">
							请一定注意相关法律风险，SheStays 目前仅提供借换宿信息，不参与任何身份验证过程。
						</text>
					</view>
				</uni-collapse-item>
				<uni-collapse-item title="借换宿是收费的吗？" :show-animation="true">
					<view class="content">
						<text class="text">我们提倡免费住宿，但在你开启旅程之前，建议双方需要再次确认是否完全免费，避免产生误会，同时需要确认是否存在额外费用，如水电费或清洁费。</text>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
	</view>
</template>

<script setup>
	import { onShow } from '@dcloudio/uni-app'
	import {buriedPoint} from '@/common/js/burying_point.js'
	onShow(() => {
		buriedPoint(4,{title:'关于SheStays'})
	})
	const goPage = ()=>{
		uni.navigateTo({
			url:'/pages/tabBar/my/uploadHousing'
		});
	}
</script>

<style lang="scss" scoped>
	// 顶部图片
	.bold{
		font-weight: bold;
	}
	.bg-box{
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		&>image{
			width: 100%;
			height: 650upx;
		}
		.about-fn {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 322rpx;
			height: 88rpx;
			color: #ffffff;
			border-radius: 88rpx;
			text-align: center;
			// line-height: 88rpx;
			background-color: #D8336D;
			margin-top: 26rpx;
			box-shadow: 8rpx 8rpx 16rpx rgba(212, 212, 212, 0.60);
			margin-top: -50upx;
		}
	}
.about {
	padding: 48rpx;
	.about-info {
		.about-title {
			color: #D8336D;
			font-size: 64rpx;
			font-weight: 600;
			margin-bottom: 20upx;
		}
		.about-content {
			font-size: 32rpx;
			color: #000B3B;
			font-weight: 400;
		}
	}
	
	.about-faq {
		margin-top: 50rpx;
		.about-faq-title {
			font-size: 40rpx;
			font-weight: 600;
			color: #000B3B;
		}
		::v-deep .uni-collapse-item__title-box{
			padding-left: 0 !important;
			font-size: 32rpx;
			color: #000B3B;
			font-weight: 500;
		}
		.content{
			font-size: 28upx;
			color: #696A6D;
			padding-bottom: 60upx;
			&.mg-b-20{
				padding-bottom: 20rpx;
			}
			.text{
				display: block;
				margin-bottom: 8upx;
			}
			.margin-t-10{
				margin-top: 20upx;
			}
		}
	}
}
</style>
