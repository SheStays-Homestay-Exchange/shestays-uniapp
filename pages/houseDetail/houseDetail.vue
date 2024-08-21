<template>
  <div class="house-detail">
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
            <view class="swiper-item image-wrapper">
              <img class="house-image" :src="item.imgUrl" alt="" />
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
      <view class="house-info" v-for="(item, index) in houseInfo" :key="index">
        <view class="label">{{ item.label }}</view>
        <view class="value"
          ><text>{{ item.value }}</text></view
        >
      </view>
    </view>

    <view class="householder">
      <view class="userInfo">
        <img class="user-image" :src="userInfo.avatarUrl" alt="" />
        <view class="info">房主：{{ userInfo.xiaohongshuUsername }}</view>
      </view>
      <view>
        <button class="contact-btn" @click="contactHost">联系房主</button>
      </view>
    </view>
    <DetailPopup
      :show="popShow"
      @tapClose="popShow = false"
      :id="userInfo.phone"
      :name="userInfo.xiaohongshuUsername"
      userNameType="联系方式"
    />
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { onLoad, useRoute } from "@dcloudio/uni-app";
import { getHouseDetail } from "@/common/api/common";
import DetailPopup from "@/components/DetailPopup.vue";
import holdImage from "@/static/60x60.png";
import holdBannerImage from "@/static/image/about.png";

const current = ref(0);

//打开联系房主弹窗
const popShow = ref(false);
const contactHost = (item) => {
  popShow.value = true;
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
});

const formatDate = (time) => {
  return time ? time.split(" ")[0] : "";
};

const houseInfo = [
  {
    label: "房源开放日期",
    value: userInfo.startTime ? `${formatDate(userInfo.startTime)} ~ ${formatDate(userInfo.endTime)}` : '-',
  },
  {
    label: "对房客姐妹说的话",
    value: userInfo.describle,
  },
];

const onSwiperChange = (e) => {
  current.value = e.detail.current;
};

onLoad((options) => {
  getHouseDetail({ houseId: options?.id })
    .then((res) => {
      const { code, data = {} } = res || {}
      if (+code === 200) {
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
      }
    })
    .catch((error) => {
      console.log(error, "rrrr");
    });
});
</script>

<style lang="scss" scoped>
.house-detail {
  background-color: #fff;
  position: relative;
  padding-bottom: 50rpx;
}

.swiper-box {
  height: 600rpx;
}

.image-wrapper .house-image {
  width: 100%;
  height: 600rpx;
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
  width: 70%;
  padding: 32rpx 40rpx;
  position: absolute;
  top: 480rpx;
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
  padding: 48rpx;
  margin-top: 30rpx;
}

.house-info {
  margin: 32rpx 0;

  .label {
    font-weight: 700;
    font-size: 32rpx;
  }

  .value {
    font-size: 28rpx;
    font-weight: 400;
  }
}

.householder {
  border: 1px solid #f3f3f3;
  box-shadow: 0px 8rpx 30rpx 0px rgba(212, 212, 212, 0.6);
  width: 80%;
  position: fixed;
  bottom: 40rpx;
  left: 50%;
  transform: translateX(-50%);
  background-color: $uni-bg-color;
  border-radius: 80rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #000;
  padding: 12rpx 18rpx;
  height: 126rpx;

  .userInfo {
    display: flex;
    align-items: center;
    .user-image {
      width: 100rpx;
      height: 100rpx;
      border-radius: 50%;
      margin-right: 24rpx;
    }
    .info {
      font-size: 32rpx;
      font-weight: 600;
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
</style>