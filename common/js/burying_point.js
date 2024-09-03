import {saveBuriedPoint } from '@/common/api/common'
import cache from '@/common/js/cache.js'
//0 注册｜登录 USER_REGISTRATION
//1 房源浏览 PROPERTY_VIEW
//2 房源搜索 PROPERTY_SEARCH
//3 房源联系 CONTACT_OWNER
//4 页面加载时长 PAGE_LOAD_TIME
//5 API相应时间  API_RESPONSE_TIME
const buriedIdArr = [
	"USER_REGISTRATION",
	"PROPERTY_VIEW",
	"PROPERTY_SEARCH",
	"CONTACT_OWNER",
	"PAGE_LOAD_TIME",
	"API_RESPONSE_TIME",
]
export const buriedPoint = async(index,args = {})=>{
	console.log(index)
	const {userId} = cache.get("userInfo")
	const equipment = cache.get('device') || ''
	const buriedId = buriedIdArr[index]
	const params = {buriedId,equipment}
	switch (index){
		case 0:
			params.key = userId
			params.operation_type = "login"
			break;
		case 1:
			params.key = userId
			break;
		case 2:
			params.key = userId
			params.searchKeywords = args?.searchKeywords
			break;
		case 3:
			params.key = userId
		    params.houseId = args?.houseId
			break;
		case 4:
		    params.key = args?.title
			break;
		case 5:
		    params.key = args.key
			break;
		default:
			break
	}
	if(params.key && buriedId){
		await saveBuriedPoint(params)
	}
}

