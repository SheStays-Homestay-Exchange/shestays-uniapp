/**  
 * 缓存数据优化  
 * import cache from '@/common/js/cache.js'  
 * 使用方法 【  
 *     一、设置缓存  
 *         string    cache.put('k', 'string你好啊');  
 *         json      cache.put('k', { "b": "3" }, 2);  
 *         array     cache.put('k', [1, 2, 3]);  
 *         boolean   cache.put('k', true);  
 *     二、读取缓存  
 *         默认值    cache.get('k')  
 *         string    cache.get('k', '你好')  
 *         json      cache.get('k', { "a": "1" })  
 *     三、移除/清理    
 *         移除: cache.remove('k');  
 *         清理：cache.clear();   
 * 】  
 * @type {String}  
 */
const postfix = '_aszapp'; // 缓存前缀   
/**  
 * 设置缓存   
 * @param  {[type]} k [键名]  
 * @param  {[type]} v [键值]  
 * @param  {[type]} t [时间、单位秒]  
 */
function put(k, v) {
	uni.setStorageSync(k, v)
}

/**  
 * 获取缓存   
 * @param  {[type]} k   [键名]  
 * @param  {[type]} def [获取为空时默认]  
 */
function get(k, def = undefined) {
	let deadtime = parseInt(uni.getStorageSync(k + postfix))
	if (deadtime) {
		if (parseInt(deadtime) < Date.parse(new Date()) / 1000) {
			if (def) {
				return def;
			} else {
				return false;
			}
		}
	}
	let res = uni.getStorageSync(k);
	if (res) {
		return res;
	} else {
		if (def == undefined) {
			def = false;
		}
		return def;
	}
}

function remove(k) {
	uni.removeStorageSync(k);
	uni.removeStorageSync(k + postfix);
}

function clear() {
	// uni.$TUIKit.logout()
	uni.clearStorageSync();
}

//获取胶囊位置与大小
function getBoundingData() {
  // #ifndef H5
	return uni.getMenuButtonBoundingClientRect()
  // #endif
}


export default {
	put,
	get,
	remove,
	clear,
	getBoundingData
}
