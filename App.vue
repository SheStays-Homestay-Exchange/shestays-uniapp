<script>
	import {
		mapMutations
	} from 'vuex'
	import {
		version
	} from './package.json'
	import checkUpdate from '@/uni_modules/uni-upgrade-center-app/utils/check-update';

	export default {
		onLaunch: function() {
			console.log(99)
			//获取设备
			uni.getSystemInfo({
				success(res){
					let name = res.osName+'-'+res.model
					uni.setStorageSync('device',name)
				},
				fail(){
					console.log('获取设备信息失败')
				}
			})
			// 线上示例使用
			// console.log('%c uni-app官方团队诚邀优秀前端工程师加盟，一起打造更卓越的uni-app & uniCloud，欢迎投递简历到 hr2013@dcloud.io', 'color: red');
			console.log('App Launch');
			// #ifdef APP-PLUS
			// App平台检测升级，服务端代码是通过uniCloud的云函数实现的，详情可参考：https://ext.dcloud.net.cn/plugin?id=4542
			if (plus.runtime.appid !== 'HBuilder') { // 真机运行不需要检查更新，真机运行时appid固定为'HBuilder'，这是调试基座的appid
				checkUpdate()
			}

			// 一键登录预登陆，可以显著提高登录速度
			uni.preLogin({
				provider: 'univerify',
				success: (res) => {
					// 成功
					this.setUniverifyErrorMsg();
					console.log("preLogin success: ", res);
				},
				fail: (res) => {
					this.setUniverifyLogin(false);
					this.setUniverifyErrorMsg(res.errMsg);
					// 失败
					console.log("preLogin fail res: ", res);
				}
			})
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData: {
			test: ''
		},
		methods: {
			...mapMutations(['setUniverifyErrorMsg', 'setUniverifyLogin'])
		}
	}
</script>

<style lang="scss">
	@import '@/uni_modules/uni-scss/index.scss';
	// 设置整个项目样式
	page {
		font-family: 'Noto Sans SC', 'Microsoft YaHei', sans-serif;
		font-size: 28rpx;
		overflow: auto;
	}




</style>
