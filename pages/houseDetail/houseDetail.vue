<template>
  <div class="house-detail">
    <view
      class="return-box"
      :style="{ top: `${boundingData.top - 5}px` }"
      @tap="goBefore"
    >
      <image src="@/static/image/return.png" mode=""></image>
    </view>
    <view class="house-banner">
      <uni-swiper-dot
        :current="current"
        :total="userInfo.houseImgs.length"
        :dots-styles="dotsStyles"
        :info="userInfo.houseImgs"
        mode="dot"
      >
        <swiper
          :duration="500"
          :interval="3000"
          :autoplay="true"
          class="swiper-box"
          :current="current"
          @change="onSwiperChange"
        >
          <swiper-item
            v-for="item in userInfo.houseImgs"
            :key="item.houseImgId"
          >
            <view class="swiper-item image-wrapper" style="height: 100%">
              <image
                class="house-image"
                :src="item.imgUrl"
                alt=""
                mode="aspectFill"
              />
            </view>
          </swiper-item>
        </swiper>
      </uni-swiper-dot>
      <view class="house-position">
        <view class="left">
          <view class="title"
            >{{ userInfo.countryName }} - {{ userInfo.cityName }}</view
          >
          <view class="desc">可接待人数：{{ userInfo.houseAmount }}人</view>
        </view>
      </view>
    </view>

    <view class="house-content">
      <view class="house-info data-info">
        <view class="label">房源开放日期</view>
        <view class="value"
          ><text>{{
            userInfo.startTime
              ? `${formatDate(userInfo.startTime)} ~ ${formatDate(
                  userInfo.endTime
                )}`
              : "-"
          }}</text></view
        >
      </view>
      <view class="house-info">
        <view class="label">对房客姐妹说的话</view>
        <view class="value"
          ><text>{{ userInfo.describle }}</text></view
        >
      </view>
    </view>

    <view
      class="btn-box"
      v-if="
        userInfo.statusCode == 'reviewing' &&
        roleDictCode.some((item) => item == 'admin')
      "
    >
      <view class="btn-fn" @click="handleNoBtn"> 不通过 </view>
      <view class="btn-fn success-fn" @click="hanldeSuccessBtn">
        通过审核
      </view>
    </view>
    <view class="householder" v-else>
      <view class="userInfo" @click="handleGoPage">
        <image
          class="user-image"
          :src="
            userInfo.avatarUrl
              ? userInfo.avatarUrl
              : '../../static/image/avatar.png'
          "
          alt=""
          mode="aspectFill"
        />
        <view class="info"
          >房主：{{ userInfo.userName || userInfo.xiaohongshuUsername }}</view
        >
      </view>
      <view>
        <button class="contact-btn" @click="contactHost">联系房主</button>
      </view>
    </view>

    <DetailPopup
      :show="popShow"
      :avatar="userInfo.avatarUrl"
      @tapClose="popShow = false"
      :id="userInfo.contactInfo || '未知'"
      :name="userInfo.userName || userInfo.xiaohongshuUsername"
      userNameType="联系方式"
    />

    <!-- 审核不通过 -->
    <uni-popup type="center" ref="noRef" :is-mask-click="false">
      <view class="no-box">
        <view class="close-icon" @click="handleNoClose">
          <image src="../../static/image/x-close.png" mode=""></image>
        </view>
        <view class="no-title">
          <text>审核不通过</text>
        </view>
        <uni-easyinput
          type="textarea"
          v-model="formData.unpassReason"
          placeholder="请输入不通过原因"
        ></uni-easyinput>
        <view class="no-ok-fn" @click="handleNoSubmit">OK</view>
      </view>
    </uni-popup>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { onLoad, useRoute, onShow } from "@dcloudio/uni-app";
import { getHouseDetail, review,saveBuriedPoint } from "@/common/api/common";
import DetailPopup from "@/components/DetailPopup.vue";
import holdImage from "@/static/image/avatar.png";
import holdBannerImage from "@/static/image/about.png";
import { msg } from "../../common/js/util";
import cache from "/common/js/cache.js";
import {buriedPoint} from '@/common/js/burying_point.js'

const current = ref(0);

//打开联系房主弹窗
const popShow = ref(false);
const houseId = ref(0);

const contactHost = (item) => {
  popShow.value = true;
  buriedPoint(3,{houseId:houseId.value})
};

const dotsStyles = {
  backgroundColor: "#D9D9D9",
  border: "1px rgb(217, 217, 217) soild",
  selectedBackgroundColor: "#D8336D",
  selectedBorder: "1px rgba(256, 256, 256, 1) solid",
  bottom: 50,
  width: 7,
  height: 7,
};

const userInfo = reactive({
  houseAmount: 0,
  countryName: "",
  cityName: "",
  startTime: "",
  endTime: "",
  describle: "",
  houseImgs: [
    {
      imgUrl: holdBannerImage,
      houseImgId: 1,
    },
  ],
  avatarUrl: holdImage,
  phone: "",
  xiaohongshuUsername: "",
  userName: "",
});

const goBefore = () => {
  uni.navigateBack({
    delta: 1,
    fail: function () {
      // 返回失败，说明上一个页面不存在，跳转到首页
      uni.reLaunch({
        url: "/pages/tabBar/index/index",
      });
    },
  });
};

const formatDate = (time) => {
  return time ? time.split(" ")[0] : "";
};
let boundingData = null;
// #ifndef APP-PLUS
boundingData = cache.getBoundingData();
// #endif

const onSwiperChange = (e) => {
  current.value = e.detail.current;
};

onLoad((options) => {
  const that = this
  uni.showLoading({
    title: "加载中",
  });
  houseId.value = options?.id 
  getHouseDetail({ houseId: options?.id })
    .then((res) => {
      uni.hideLoading();
      const { code, data = {} } = res || {};
      if (code == 200) {
        const keys = Object.keys(data);
        if (keys.length) {
          keys.forEach((key) => {
            if (key === "houseImgs") {
              if (data[key] && data[key].length) {
                userInfo[key] = data[key] || userInfo[key];
              }
            } else {
              userInfo[key] = data[key] || userInfo[key];
            }
          });
        }
		buriedPoint(1)
		// pointFun()
      }
    })
    .catch((error) => {
      msg(error.msg);
      uni.hideLoading();
      console.log(error, "error");
    });
  // 保存房源ID
  formData.houseId = options?.id;
});

	const pointFun = async ()=>{
		try{
			const {userId} = cache.get("userInfo")
			const equipment = cache.get('device')
			const res = await saveBuriedPoint({
				buriedId:'PROPERTY_VIEW',
				key: userId,
				equipment:equipment||''
			})
		}catch(err){
			console.log('埋点接口错误',err)
		}
	}
	
// 审核不通过弹框
const noRef = ref(null);
function handleNoBtn() {
  noRef.value.open();
}
function handleNoClose() {
  formData.unpassReason = "";
  noRef.value.close();
}
// 审核表单
const formData = reactive({
  houseId: "",
  statusCode: "",
  unpassReason: "",
});
// 不通过
const handleNoSubmit = async () => {
  formData.statusCode = "not_approved";
  try {
    const res = await review(formData);
    if (res.code == 200) {
      msg(res.msg);
      noRef.value.close();
      setTimeout(() => {
        uni.navigateBack();
      }, 1000);
    }
  } catch (e) {
    msg(e.msg || "系统错误");
  }
};
// 审核通过
const hanldeSuccessBtn = async () => {
  formData.statusCode = "online";
  try {
    const res = await review(formData);
    if (res.code == 200) {
      msg(res.msg);
      setTimeout(() => {
        uni.navigateBack();
      }, 1000);
    }
  } catch (e) {
    msg(e.msg || "系统错误");
  }
};

// 跳转个人主页
function handleGoPage() {
  uni.navigateTo({
    url: `/pages/tabBar/my/myHome/myHome?userId=${userInfo.userId}&openId=''`,
  });
}

// 保存用户权限
// 用户权限
const roleDictCode = ref([]);
onShow(() => {
	buriedPoint(4,{title:'房源详情'})
  roleDictCode.value = cache.get("roles");
});
</script>

<style lang="scss" scoped>
.house-detail {
  background-color: #fff;
  position: relative;
  padding-bottom: 50rpx;
  .house-banner {
    position: relative;
  }
  .return-box {
    position: fixed;
    left: 24rpx;
    z-index: 5;
    image {
      width: 64rpx;
      height: 64rpx;
    }
  }
}

.swiper-box {
  height: 750rpx;
}
.image-wrapper {
  overflow: hidden;
  border-radius: 0 0 40px 40px;
}
.image-wrapper .house-image {
  width: 100%;
  // height: 600rpx !important;
  height: 100% !important;
  border-bottom-left-radius: 80rpx;
  border-bottom-right-radius: 80rpx;
}

.uni-swiper-dot-box {
  background-color: "pink";
  width: "8rpx";
  height: "8rpx";
  border-radius: "50%";
}

.house-position {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  background-color: $uni-bg-color;
  border-radius: 40rpx;
  width: 78%;
  padding: 32rpx 40rpx;
  position: absolute;
  bottom: -90rpx;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 10rpx 20rpx rgba(0, 0, 0, 0.1);

  .left {
    .title {
      font-size: 40rpx;
      color: #000b3b;
      font-weight: 600;

      height: 58rpx;
      line-height: 58rpx;
      margin-bottom: 12rpx;
    }
    .desc {
      color: #000b3b;
      font-size: 28rpx;
      font-weight: 400;
      height: 36rpx;
      line-height: 36rpx;
    }
  }
}

.house-content {
  padding: 48rpx 0 140rpx;
  margin-top: 30rpx;
}

.house-info {
  margin: 32rpx 0;
  padding: 0 48rpx;
  &.data-info {
    margin-top: 54rpx;
  }
  .label {
    font-weight: 700;
    font-size: 32rpx;
  }

  .value {
    font-size: 28rpx;
    font-weight: 400;
    display: block;
    margin-top: 16rpx;
  }
}

.householder {
  border: 1px solid #f3f3f3;
  box-shadow: 0px 8rpx 30rpx 0px rgba(212, 212, 212, 0.6);
  width: 80%;
  position: fixed;
  bottom: 88rpx;
  left: 50%;
  transform: translateX(-50%);
  background-color: $uni-bg-color;
  border-radius: 80rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #000;
  padding: 10rpx 16rpx;
  // height: 136rpx;

  .userInfo {
    display: flex;
    align-items: center;
    flex: 1;
    .user-image {
      width: 100rpx;
      height: 100rpx !important;
      border-radius: 50%;
      margin-right: 24rpx;
    }
    .info {
      font-size: 32rpx;
      font-weight: 600;
      max-width: 40vw;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .contact-btn {
    width: 168rpx;
    height: 68rpx;
    line-height: 68rpx;
    font-size: 28rpx;
    background: #d8336d;
    color: #fff;
    border-radius: 38rpx;
    box-shadow: 8rpx 8rpx 8rpx 0rpx rgba(212, 212, 212, 0.6);
  }
}

.btn-box {
  display: flex;
  align-items: center;
  padding: 38rpx;
  position: fixed;
  bottom: 86rpx;
  left: 0;
  right: 0;
  justify-content: space-between;
  .btn-fn {
    width: 324rpx;
    height: 86rpx;
    border-radius: 86rpx;
    text-align: center;
    line-height: 86rpx;
    font-size: 32rpx;
    font-weight: 600;
    color: #fff;
    background-color: #909193;
    box-shadow: 8rpx 8rpx 16rpx rgba(212, 212, 212, 0.6);
  }
  .success-fn {
    background-color: #d8336d;
  }
}

.no-box {
  width: 536rpx;
  background-color: #fff;
  border-radius: 48rpx;
  padding: 40rpx 32rpx;
  position: relative;
  .close-icon {
    display: inline-block;
    width: 48rpx;
    height: 48rpx;
    position: absolute;
    right: 32rpx;
    top: 20rpx;
    > image {
      width: 48rpx;
      height: 48rpx;
    }
  }
  .no-title {
    font-weight: 600;
    font-size: 40rpx;
    text-align: center;
    color: #000b3b;
    margin-bottom: 16rpx;
  }
  .no-ok-fn {
    margin-top: 20rpx;
    width: 150rpx;
    height: 64rpx;
    line-height: 64rpx;
    margin: 0 auto;
    color: #fff;
    text-align: center;
    border-radius: 64rpx;
    background-color: #d8336d;
    margin-top: 20rpx;
    box-shadow: 8rpx 8rpx 16rpx 0px rgba(212, 212, 212, 0.6);
  }
}
</style>