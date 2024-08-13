<template>
  <view class="house-detail">
    <view class="house-banner">
      <uni-swiper-dot class="uni-swiper-dot-box" @clickItem="clickItem" :info="info" :current="current" :mode="mode" field="content">
        <swiper class="swiper-box" @change="change" :current="swiperDotIndex">
          <swiper-item v-for="(item, index) in state.bannerList" :key="index">
            <view class="swiper-item image-wrapper">
              <img class="house-image" :src="item.url" alt="" />
            </view>
          </swiper-item>
        </swiper>
      </uni-swiper-dot>

      <view class="house-position">
        <view class="left">
          <view class="title">{{ state.position }}</view>
          <view class="desc">住宿条件：{{ state.accommodationCondition }}</view>
          <view class="desc">可接待人数：{{ state.guestCapacity }}</view>
        </view>
        <view class="right" @click="handleCollect">
          <uni-icons :type="state.icon" size="28" />
        </view>
      </view>
    </view>

    <view class="house-content">
      <view class="house-info" v-for="(item, index) in houseInfo" :key="index">
        <view class="label">{{ item.label }}</view>
        <view class="value">{{ item.value }}</view>
      </view>
    </view>

    <view class="householder">
      <view class="image">
        <img :src="state.hostImageSrc" alt="" />
      </view>
      <view class="info">
        <view>房主：{{ state.hostName }}</view>
        <view>成功接待次数：{{ state.successfulReceptionCount }}</view>
      </view>
      <button class="contact-btn" @click="onContact">联系房主</button>
    </view>

    <uni-popup ref="popup" type="center" border-radius="10px 10px 0 0">
      <view class="popup-content">
        <view class="user-info">
          <view class="image left">
            <img :src="state.hostImageSrc" alt="" />
          </view>
          <view class="right">
            <view><span class="label">房主：</span><span class="content">{{ state.hostName }}</span></view>
            <view><span class="label">微信号：</span><span class="content">123456</span></view>
          </view>
        </view>
        <view>Tips✨：主动自我介绍说明目的的成功率更高哦~</view>
        <view @click="handleCopy"><button class="copy-btn">复制名片</button></view>
      </view>
    </uni-popup>
  </view>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

const popup = ref(null);

const state = reactive({
  accommodationCondition: '舒适温馨',
  guestCapacity: '2人',
  openDate: '2024年6月-8月',
  messages: ['爱干净', '遵守规定', '保持安静'],
  facilities: '齐全的厨房设备，高速网络，舒适的床铺',
  hostImageSrc: 'https://lf-flow-web-cdn.doubao.com/obj/flow-doubao/doubao_ext/static/image/avatar-transparent.ea272b11.png',
  hostName: '张三',
  successfulReceptionCount: '10 次',
  position: '加拿大 - 温哥华',
  icon: 'star',
  bannerList: [
    { url: 'https://res.klook.com/image/upload/q_85/activities/ori7zgidaf70ildeaazw.jpg', key: 1 },
    { url: 'https://res.klook.com/image/upload/c_fill,w_1265,h_712/q_80/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/mn4cemkgx5r6fy6rgie6.webp', key: 2 },
    { url: 'https://res.klook.com/image/upload/q_85/activities/ori7zgidaf70ildeaazw.jpg', key: 3 }
  ]
});

const houseInfo = [
  { label: '房源开放日期', value: state.openDate },
  { label: '对房客姐妹说的话', value: state.messages.join(', ') },
  { label: '房子设施', value: state.facilities }
];

const handleCollect = () => {
  state.icon = state.icon === 'star' ? 'star-filled' : 'star';
  console.log('collect');
};

const onContact = () => {
  console.log('联系房东');
  popup.value.open();
};

const handleCopy = () => {
  uni.setClipboardData({
    data: '123456',
    success: () => {
      console.log('success');
      popup.value.close();
    },
    fail: () => {
      console.log('fail');
      popup.value.close();
    }
  });
};

onLoad(() => {
  console.log('进入详情，调用接口');
});
</script>

<style lang="scss" scoped>
.house-detail {
  background-color: $uni-bg-color-grey;
  position: relative;
  padding-bottom: 100px;
}

.swiper-box {
  height: 380px;
}

.image-wrapper img {
  width: 100%;
  height: 380px;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
}

.house-position {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  background-color: $uni-bg-color;
  border-radius: 20px;
  width: 70%;
  padding: 16px;
  position: absolute;
  top: 320px;
  left: 50%;
  transform: translateX(-50%);
}

.house-content {
  padding: 24px;
  margin-top: 30px;
}

.house-info {
  margin: 5px 0;

  .label {
    font-weight: 700;
    font-size: 16px;
  }

  .value {
    font-size: 14px;
    font-weight: 400;
  }
}

.householder {
  width: 80%;
  padding: 14px;
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: $uni-bg-color;
  border-radius: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #000;

  .info {
    font-size: 12px;
  }

  .image img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10upx;
  }

  .contact-btn {
    width: 100px;
    height: 36px;
    font-size: 14px;
    background: #D8336D;
    color: #fff;
    border-radius: 20px;
  }
}

.popup-content {
  background-color: #fff;
  width: 287px;
  padding: 20px;
  border-radius: 10px;
  color: #5E5E5E;

  .user-info {
    display: flex;
    align-items: center;

    .left {
      width: 120rpx;
    }

    img {
      width: 104rpx;
      height: 104rpx;
      border-radius: 50%;
    }

    .right {
      color: #000B3B;
      font-weight: 600;
      font-size: 32rpx;
    }
  }
}

.copy-btn {
  width: 128px;
  height: 34px;
  line-height: 34px;
  background-color: #D8336D;
  color: #fff;
  margin: 10px auto;
  font-weight: 600;
}
</style>
