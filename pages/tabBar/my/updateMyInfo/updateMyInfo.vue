<template>
  <view class="update-info">
    <view class="user-icon" @click="uploadHead">
      <image
        class="user-icon-image"
        :src="
          form.avatarUrl
            ? form.avatarUrl
            : '../../../../static/image/avatar.png'
        "
        mode="aspectFill"
      ></image>
      <!-- <uni-icons type="person-filled" size="60" color="#999" class="init-head" v-if="!form.avatarimg"></uni-icons> -->

      <view class="user-update-icon">
        <image
          class="update-icon"
          src="../../../../static/image/camera-01.png"
          mode=""
        ></image>
      </view>
    </view>
    <view class="user-cli">
      <view class="user-title"> 用户名 </view>
      <uni-easyinput
        type="text"
        placeholder="未设置"
        maxlength="16"
        v-model="form.userName"
        primaryColor="#D8336D"
        :clearable="false"
        placeholderStyle="color:#909193;font-size:16px;"
      ></uni-easyinput>
    </view>
    <view class="user-cli">
      <view class="user-title"> 性别 </view>
      <view class="radio-box">
        <radio-group @change="radioChange">
          <label class="radio" style="margin-right: 40rpx">
            <radio color="#d8336d" value="1" :checked="form.sex == '1'" />女
          </label>
          <!-- <label class="radio">
						<radio color="#d8336d" value="2" :checked="form.sex == '2'"/>男
					</label> -->
        </radio-group>
      </view>
    </view>
    <!-- <view class="user-cli">
			<view class="user-title">
				微信号
			</view>
			<uni-easyinput type="text" placeholder="未设置" v-model="form.wechatId"></uni-easyinput>
		</view> -->
    <view class="user-cli">
      <view class="user-title"> 联系方式 </view>
      <uni-easyinput
        type="text"
        placeholder="未设置"
        :clearable="false"
        placeholderStyle="color:#909193;font-size:16px;"
        v-model="form.contactInfo"
        maxlength="30"
        primaryColor="#D8336D"
      ></uni-easyinput>
    </view>
    <view class="user-cli">
      <view class="user-title"> 生日 </view>
      <view class="user-info">
        <uni-datetime-picker
          class="my-date"
          type="date"
          :value="form.date"
          :border="none"
          :end="dateEnd"
          @change="dateChange"
        >
          {{ form.date }}
        </uni-datetime-picker>
        <image class="user-info-right-icon" :src="chevronIMage" mode=""></image>
      </view>
    </view>
    <view class="user-cli" @click="provinceShow = true">
      <view class="user-title"> 地区 </view>
      <view class="user-info">
        <view class="user-info-title">
          {{ form.address }}
        </view>
        <image class="user-info-right-icon" :src="chevronIMage" mode=""></image>
      </view>
    </view>
    <view class="user-cli textarea-body">
      <view class="user-title des-title">
        个人简介
        <text class="gray">（选填）</text>
      </view>
      <uni-easyinput
        type="textarea"
        v-model="form.des"
        maxlength="300"
        placeholderStyle="color:#909193;font-size:16px;"
      ></uni-easyinput>
    </view>
    <view class="submit-button" @click="submit"> 保存个人信息 </view>
  </view>
  <!-- <Location :visible="locationVisible"></Location> -->
  <Location
    @popupClick="popupClick"
    :show="provinceShow"
    :chooseArea="chooseArea"
  ></Location>
</template>

<script setup>
import { ref, reactive } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { date, msg, imgToBase64 } from "@/common/js/util.js";
import {
  editUserData,
  uploadAvatar,
  getUserInfoByOpenId,
} from "@/common/api/common";
import cache from "@/common/js/cache.js";
import { uploadFile } from "@/common/js/request";
import Location from "@/components/location";
import chevronIMage from "@/static/image/chevron-right.jpg";

// 用户信息
onLoad(() => {
  getUserInfo();
});

//选中的省市区
const chooseArea = ref([]);
//省市区弹窗
const provinceShow = ref(false);

const popupClick = (e) => {
  console.log(e, "---------------------------popupClick");
  if (e.funName == "cancle") {
    provinceShow.value = false;
  } else if (e.funName == "submit") {
    chooseArea.value = e.value;
    provinceShow.value = false; //关闭地址弹窗
    console.log(chooseArea.value);
    form.address =
      chooseArea.value[0].countryName +
      "-" +
      chooseArea.value[1].regionName +
      "-" +
      chooseArea.value[2].cityName;
    // 设置对应code
    form.countryCode = chooseArea.value[0].countryCode; //国家id
    form.regionCode = chooseArea.value[1].regionCode; //区域id
    form.cityCode = chooseArea.value[2].cityCode; //城市id
    // submitArea(e.value)
  }
};

//提交选中的地区
const submitArea = (value) => {
  console.log(submitArea, value);
};

const form = reactive({
  date: "请选择生日",
  sex: "1",
  contactInfo: "",
  wechatId: "",
  des: "",
  avatarUrl: "",
  address: "请选择",
  countryCode: "", //国家id
  regionCode: "", //区域id
  cityCode: "", //城市id
});

const dateChange = (e) => {
  form.date = e;
};

// 截止日期
const dateEnd = date(new Date(), "Y-m-d");
const radioChange = (e) => {
  form.sex = e.detail.value;
};

const locationVisible = ref(false);

const userInfo = ref({});
const getUserInfo = async (type) => {
  userInfo.value =
    typeof cache.get("userInfo") == "string"
      ? JSON.parse(cache.get("userInfo"))
      : cache.get("userInfo");
  if (!userInfo.value?.openId) {
    uni.reLaunch({
      url: "/pages/login/login",
    });
    return;
  }
  uni.showToast({
    title: "加载中",
  });
  try {
    const res = await getUserInfoByOpenId({
      openId: userInfo.value.openId,
    });
    uni.hideToast();
    if (res.code == 200) {
      if (!res.data.openId) {
        uni.reLaunch({
          url: "/pages/login/login",
        });
      }
      const { bdYear, bdMonth, bdDay } = res.data;
      form.des = res.data.personalProfile;
      form.contactInfo = res.data.contactInfo;
      form.avatarUrl = res.data.avatarUrl;
      form.sex = res.data.genderDictCode;
      form.userName = res.data.userName;
      if (bdYear && bdMonth && bdDay) {
        form.date = `${bdYear}-${bdMonth}-${bdDay}`;
      }
      form.countryCode = res.data.countryCode;
      form.regionCode = res.data.regionCode;
      form.cityCode = res.data.cityCode;
      //地址回显
      var houseArea = [];
      if (res.data.cityCode) {
        houseArea = [
          {
            countryName: res.data.nationName,
            countryCode: res.data.countryCode,
          },
          {
            regionName: res.data.regionName,
            regionCode: res.data.regionCode,
          },
          {
            cityName: res.data.cityName,
            cityCode: res.data.cityCode,
          },
        ];
        console.log("地址~~~~", houseArea);
        chooseArea.value = houseArea;
        form.address =
          res.data.nationName +
          "-" +
          res.data.regionName +
          "-" +
          res.data.cityName;
      }
    }
  } catch (e) {
    msg(e.msg || "系统繁忙，请稍后重试");
    uni.hideToast();
  }
};

const validateFun = () => {
  if (!form.userName) {
    msg("请输入用户名");
    return false;
  } else if (!form.sex) {
    msg("请选择性别");
    return false;
  } else if (!form.date) {
    msg("请选择生日");
    return false;
  }
  // 联系方式不为必填
  // else if(!form.contactInfo) {
  // 	msg('请输入联系方式')
  // 	return false
  // }
  return true;
};

const editUserDataFun = (param) => {
  uni.showLoading({ title: "加载中" });
  editUserData(param)
    .then((res) => {
      uni.hideLoading();
      if (res.code == 200) {
        msg("编辑个人信息成功");
        setTimeout(() => {
          uni.navigateBack();
        }, 1000);
      }
    })
    .catch((e) => {
      uni.hideLoading();
      msg(e.msg);
    });
};

const submit = () => {
  let ifPass = validateFun();
  if (ifPass) {
    let dateArr = form.date.split("-");
    console.log("生日", dateArr);
    editUserDataFun({
      userName: form.userName,
      genderDictCode: form.sex,
      contactInfo: form.contactInfo,
      personalProfile: form.des,
      avatarUrl: form.avatarUrl,
      bdYear: Number(dateArr[0]),
      bdMonth: Number(dateArr[1]),
      bdDay: Number(dateArr[2]),
      userId: userInfo.value.userId,
      countryCode: form.countryCode, //国家id
      regionCode: form.regionCode, //区域id
      cityCode: form.cityCode, //城市id
      // wechatId: '1',
    });
  }
  console.log(ifPass, form);
};

const info = ref({
  avatar: "",
});

const uploadHead = async () => {
  uni.chooseImage({
    count: 1,
    sizeType: ["compressed"],
    success: async (e) => {
      //判断文件后缀名
      console.log("图片上传===", e);
      let imgName =
        e.tempFilePaths[0].split(".")[e.tempFilePaths[0].split(".").length - 1];
      if (imgName.includes("gif")) {
        msg("暂不支持上传gif图片，请重新选择后上传");
        return false;
      }
      let picSize = e.tempFiles[0].size / (1024 * 1024);
      if (picSize >= 1) {
        // 支持png上传
        const compreeArr = ["jpg", "JPG", "jpej", "JPEG", "png", "PNG"];
        if (compreeArr.includes(imgName)) {
          //压缩图片,值支持jpg
          uni.compressImage({
            src: e.tempFilePaths[0],
            quality: 30,
            success: (response) => {
              uploadFun([response.tempFilePath]);
            },
            fail(err) {
              console.log("图片压缩失败", err);
            },
          });
        } else {
          msg("暂不支持上传超过4M的图片，请重新选择后上传");
          return false;
        }
      } else {
        uploadFun(e.tempFilePaths);
      }
    },
    fail(e) {
      msg(e.msg || "图片上传失败，请稍后重试");
    },
  });
};

const uploadFun = (arr = []) => {
  uploadFile(arr)
    .then((res) => {
      console.log("图片上传返回", res);
      if (res?.length > 0) {
        form.avatarUrl = res[0];
      }
    })
    .catch((err) => {
      console.log("图片上传返回失败", err);
    });
};
</script>

<style lang="scss" scoped>
.update-info {
  padding: 22rpx 48rpx 200rpx 48rpx;
  .gray {
    color: #999;
    font-weight: normal;
  }
  .radio-box {
    flex: 1;
    radio {
      transform: scale(0.8);
    }
  }
  .user-icon {
    width: 232rpx;
    height: 232rpx;
    margin: 0 auto;
    margin-bottom: 30rpx;
    position: relative;
    .init-head {
      position: absolute;
      top: 50rpx;
      right: 50rpx;
    }
    .user-icon-image {
      width: 232rpx;
      height: 232rpx;
      border-radius: 232rpx;
      background-color: #eeeeee;
    }
    .user-update-icon {
      width: 58rpx;
      height: 58rpx;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background-color: #d8336d;
      border: 1rpx solid #ffffff;
      border-radius: 58rpx;
      position: absolute;
      right: 0;
      bottom: 0;
      .update-icon {
        width: 30rpx;
        height: 30rpx;
      }
    }
  }

  .user-cli {
    display: flex;
    align-items: center;
    padding: 24rpx 0;
    justify-content: space-between;
    border-bottom: 1rpx solid #eeeeee;
    font-size: 32rpx;
    .user-title {
      font-weight: 600;
      color: #000b3b;
      width: 200rpx;
      &.des-title {
        width: 100%;
      }
    }

    .user-info {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: space-around;
      .user-info-title {
        flex: 1;
        font-size: 32rpx;
        color: #000b3b;
        text-align: left;
        font-weight: 400;
      }
      .user-info-right-icon {
        width: 48rpx;
        height: 48rpx;
      }
    }

    ::v-deep .is-input-border {
      border-color: transparent !important;
    }

    ::v-deep input {
      padding-left: 0 !important;
    }
  }

  .textarea-body {
    display: block;
    border-bottom-color: transparent;
    .user-title {
      margin-bottom: 32rpx;
    }
    ::v-deep .is-input-border {
      border-color: #e5e5e5 !important;
    }
    ::v-deep textarea {
      margin: 0 !important;
      padding: 18rpx !important;
    }
  }

  .submit-button {
    width: 322rpx;
    height: 88rpx;
    color: #ffffff;
    font-size: 32rpx;
    font-weight: 600;
    text-align: center;
    line-height: 88rpx;
    border-radius: 88rpx;
    background-color: #d8336d;
    box-shadow: 8rpx 8rpx 16rpx rgba(212, 212, 212, 0.6);
    position: fixed;
    bottom: 88rpx;
    left: 0;
    right: 0;
    margin: 0 auto;
  }
}

::v-deep .uni-calendar-item__weeks-box .uni-calendar-item--checked {
  background-color: #d8336d;
}
::v-deep .uni-datetime-picker--btn {
  background-color: #d8336d;
  color: #ffffff;
}
</style>
