<template>
  <uni-popup
    ref="detialpop"
    type="center"
    :is-mask-click="true"
    @close="close"
    @maskClick="close"
  >
    <div class="popup-content">
      <!-- 删除图标 -->
      <view class="ptc-icon">
        <uni-icons type="closeempty" size="24" @click="close"></uni-icons>
      </view>
      <view class="info-box">
        <!-- <view class="img"> </view> -->
		<image class="img" :src="avatar ? avatar:defaultAvatar" mode="aspectFill"></image>
        <view class="name-box">
          <view class="name text-ellipis">用户名：{{ name }}</view>
          <view class="name text-ellipis">{{ userNameType }}：{{ id }}</view>
        </view>
      </view>
      <view class="tips-box">
        <text>Tips✨：主动自我介绍说明目的的成功率更高哦~</text>
        <text class="margin-top-10"
          >例如：嗨，你好！我从SheStays看到了您的房源。期待能够获得借宿的机会，一起分享有趣的经历。</text
        >
      </view>
      <view class="btn-box" v-if="id">
        <view class="btn" @click="btnClick"> 复制ID </view>
      </view>
    </div>
  </uni-popup>
</template>

<script setup>
import { ref, watch, nextTick, onMounted } from "vue";
import defaultAvatar from '@/static/image/avatar.png'
const emits = defineEmits(["tapClose"]);
const props = defineProps({
  show: {
    default: false,
    type: Boolean,
  },
  //小红书id
  id: {
    type: String,
    default: "",
  },
  //小红书昵称
  name: {
    type: String,
    default: "",
  },
  // 名字类型
  userNameType: {
    type: String,
    default: "小红书ID",
  },
  //头像图片
  avatar:{
	  type: String,
	  default: defaultAvatar,
  }
});
const detialpop = ref(null);
watch(
  () => props.show,
  (v, ov) => {
    nextTick(() => {
      if (v) {
        detialpop.value.open();
      } else {
        detialpop && detialpop.value.close();
      }
    });
  },
  { deep: true }
);

const close = () => {
  emits("tapClose");
};

const btnClick = () => {
  uni.setClipboardData({
    data: props.id,
    success: function () {
      close();
      uni.showToast({
        title: `已复制房主${props.userNameType}到剪贴板`,
        icon: "none",
      });
    },
  });
};
</script>

<style lang="scss" scoped>
.popup-content {
  max-width: 80%;
  background: #fff;
  box-sizing: border-box;
  padding: 20rpx 32rpx 40rpx 32rpx;
  box-shadow: 0rpx 0rpx 10rpx 1rpx rgba(179, 179, 179, 0.3);
  border-radius: 24rpx;
  margin: auto;
  .text-ellipis {
    white-space: nowrap; /* 不换行 */
    overflow: hidden; /* 隐藏超出的内容 */
    text-overflow: ellipsis; /* 用省略号表示被隐藏的部分 */
    max-width: 200px; /* 设置最大宽度以限制文本的显示长度 */
  }
  .ptc-icon {
    text-align: right;
  }
  .info-box {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-bottom: 2upx solid #bbb;
    padding-bottom: 26upx;
    margin-bottom: 26upx;
    .img {
      width: 104upx !important;
      height: 104upx !important;
      background-color: #c4c4c4;
      border-radius: 50%;
      margin-right: 32upx;
	  flex-shrink: 0;
    }
    .name-box {
      font-size: 32upx;
      font-weight: bold;
      color: #000b3b;
      .name {
        margin-bottom: 8upx;
      }
    }
  }
  .tips-box {
    font-size: 28upx;
    color: #5e5e5e;
    .margin-top-10 {
      margin-top: 16upx;
      display: block;
    }
  }
  .btn-box {
    display: flex;
    justify-content: center;
    .btn {
      width: 260upx;
      height: 68upx;
      line-height: 68upx;
      font-size: 32upx;
      font-weight: bold;
      color: #fff;
      background: #d8336d;
      text-align: center;
      border-radius: 32upx;
      margin-top: 60upx;
    }
  }
}
</style>