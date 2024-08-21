function formatTime(time) {
	if (typeof time !== 'number' || time < 0) {
		return time
	}

	var hour = parseInt(time / 3600)
	time = time % 3600
	var minute = parseInt(time / 60)
	time = time % 60
	var second = time

	return ([hour, minute, second]).map(function(n) {
		n = n.toString()
		return n[1] ? n : '0' + n
	}).join(':')
}

function formatLocation(longitude, latitude) {
	if (typeof longitude === 'string' && typeof latitude === 'string') {
		longitude = parseFloat(longitude)
		latitude = parseFloat(latitude)
	}

	longitude = longitude.toFixed(2)
	latitude = latitude.toFixed(2)

	return {
		longitude: longitude.toString().split('.'),
		latitude: latitude.toString().split('.')
	}
}
var dateUtils = {
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'天': 86400000,
		'小时': 3600000,
		'分钟': 60000,
		'秒': 1000
	},
	humanize: function(milliseconds) {
		var humanize = '';
		for (var key in this.UNITS) {
			if (milliseconds >= this.UNITS[key]) {
				humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
				break;
			}
		}
		return humanize || '刚刚';
	},
	format: function(dateStr) {
		var date = this.parse(dateStr)
		var diff = Date.now() - date.getTime();
		if (diff < this.UNITS['天']) {
			return this.humanize(diff);
		}
		var _format = function(number) {
			return (number < 10 ? ('0' + number) : number);
		};
		return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDate()) + '-' +
			_format(date.getHours()) + ':' + _format(date.getMinutes());
	},
	parse: function(str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		var a = str.split(/[^0-9]/);
		return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
	}
};

/**
 * toast
 */
 const msg = (title = '', param = {}, cb) => {
	if (!title) return;
	uni.showToast({
		title,
		icon: param.icon || 'none',
		success: () => {
			if (cb) cb()
		}
	});
}
/**
 * toast
 */
 const confirm = (content = '', showCancel = true) => {
	if (!content) return;
	return new Promise((reslove, reject) => {
		uni.showModal({
			content,
			showCancel,
			success: function(res) {
				if (res.confirm) {
					return reslove()
				} else if (res.cancel) {
					msg('您已取消操作')
					return reject()
				}
			}
		});
	})

}

/**
 * 格式化时间戳 Y-m-d H:i:s
 * @param {String} format Y-m-d H:i:s
 * @param {Number} timestamp 时间戳   
 * @return {String}
 */
 function date (timeStamp, format = 'Y-m-d H:i:s'){

	if (!timeStamp) return
	// if ('' + timeStamp.length <= 10) {
	// 	timeStamp = +timeStamp * 1000;
	// } else {
	// 	timeStamp = +timeStamp;
	// }
	let _date = new Date(timeStamp),

		Y = _date.getFullYear(),
		m = _date.getMonth() + 1,
		d = _date.getDate(),
		H = _date.getHours(),
		i = _date.getMinutes(),
		s = _date.getSeconds();
	m = m < 10 ? '0' + m : m;
	d = d < 10 ? '0' + d : d;
	H = H < 10 ? '0' + H : H;
	i = i < 10 ? '0' + i : i;
	s = s < 10 ? '0' + s : s;

	return format.replace(/[YmdHis]/g, key => {
		return {
			Y,
			m,
			d,
			H,
			i,
			s
		} [key];
	});
}

//图片转base64
 function imgToBase64(filePath) {
	 console.log(filePath,'filePath====')
	    return new Promise((resolve, reject) => {
	      let baseFormat = 'data:image/png;base64,'
	      let base64 = uni.getFileSystemManager().readFileSync(filePath, 'base64')
	      resolve(baseFormat + base64)
	    },(err)=>{
			
		})
	  }

export {
	formatTime,
	formatLocation,
	dateUtils,
	msg,
	confirm,
	date,
	imgToBase64
}
