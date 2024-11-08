// export const baseUrl = "" //正式
// const env = process.env.NODE_ENV === 'development' ? 'test' : 'prod'
const env = 'prod'
let baseUrl = 'https://shestays.life/'
let shreUrl = 'https://shestays.life/'
let shareType
let envVersion


/**======================特别注意，发版提审注意事项===================================*/
/**======================特别注意，发版提审注意事项===================================*/
/**======================特别注意，发版提审注意事项===================================*/
/** 特别注意：发版提审时，主要修改 myWechatNextVersion  值 ， 一定要比当前使用版本号大   */

let myWechatNowVersion = '1.0.0'	//当前版本号
let myWechatNextVersion = '1.0.0'	//将要提审发布的版本号

/**======================特别注意，发版提审注意事项===================================*/
/**======================特别注意，发版提审注意事项===================================*/
/**======================特别注意，发版提审注意事项===================================*/



console.log(env);
if (env === 'test') {  // （运行）   
 //  baseUrl = 'http://122.51.248.243:9090/'   //开发
	// shreUrl = 'http://122.51.248.243:9090/' //上传接口
	shreUrl = '/api/'
	baseUrl = '/api/'
	shareType = 2
	envVersion = 'develop'

} else if (env === 'prod') {  // 正式（发行）

	/** 测试环境 */
	shareType = 2
	envVersion = 'trial'
	shreUrl = 'https://shestays.life/'
	baseUrl = 'https://shestays.life/'
} else {
	/** 正式环境 */
	shareType = 0
	envVersion = 'release'
	shreUrl = 'https://shestays.life/'
	baseUrl = 'https://shestays.life/'
}


export default {
	env,
	baseUrl,
	shreUrl,
	shareType,
	envVersion,
	myWechatNextVersion,
}

