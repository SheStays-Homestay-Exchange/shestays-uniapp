<template>
	<view>
		<view @click="openPopup()">{{selectorDate}} </view>

		<view v-if="showPopup" class="hl-popup" ref="popup" @tap="closedPopup()">
			<view class="shade-bg-view"></view>
			<view class="calendar" @tap.stop="">
				<scroll-view class="list-view" scroll-y :scroll-into-view="'item' + preMonthCount">
					<view class="month-item" v-for="(item,index) in dataArray" :key="index" :id="'item' + index">
						<view class="topHandleView">
							<text>{{item.time}}</text>
						</view>
						<view class="weekdays-view">
							<view class="weekday" v-for="(weak,index) in weekDays" :key="index">
								<view class="block-item">
									{{weak}}
								</view>
							</view>
						</view>
						<view class="monthdays-view">
							<view class="monthday" v-for="(dayItem,index) in item.days" :key="index">
								<view class="block-item" :class="{'active': activeClass(dayItem.timesTamp),'range': rangeClass(dayItem.timesTamp)}" @click="didSelectorDate" :data-model="dayItem">
									<text class="sign" v-if="dayItem.status == 'today' && startDate == null">今日</text>
									<text class="sign" style="color: #ffffff" v-if="startDate!= null && dayItem.timesTamp == startDate.timesTamp">开始</text>
									<text class="sign" style="color: #ffffff" v-else-if="endDate!= null && dayItem.timesTamp == endDate.timesTamp">结束</text>
									{{dayItem.day}}
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
				<view class="certain-btn" @click="certainBtnAction">选择时间</view>
				<view class="safe-view"></view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		props:{
			preMonthCount : {
				type : Number,
				default : 12
			},
			affterMonthCount : {
				type : Number,
				default : 12
			},
			startTime: {
				type: String,
				default: ''
			},
			endTime: {
				type: String,
				default: ''
			}
		},

		data() {
			return {
				word: 'word',
				showPopup: false,
				currentMonthItem: null,
				startDate : null,
				endDate : null,
				todayTimestamp : null,
				weekDays: [
					"日", "一", "二", "三", "四", "五", "六",
				],
				
				dataArray : [],
			}
		},

		computed: {
			selectorDate() {
				if(this.startDate != null && this.endDate != null){
					return this.startDate.date + '至' + this.endDate.date
				}else{
					return '选择日期范围'
				}
				
			},
		},

		mounted() {
			this.setBaseDateData()
			
			// 设置日期回显
			if (this.startTime && this.endTime) {
				console.log(this.startTime, '////')
				console.log(this.endTime, '///')
				let sTime = this.startTime.split("/");
				let eTime = this.endTime.split("/");
				
				// 开始时间
				let sObject = this.getCurrentMonthDayArray(sTime[0], sTime[1], new Date(sTime[0], sTime[1] - 1, sTime[2]).valueOf());
				sObject.days.forEach(item => {
					if (item.date === sTime.join("-")) {
						this.startDate = item;
					}
				});
				let eObject = this.getCurrentMonthDayArray(eTime[0], eTime[1], new Date(eTime[0], eTime[1] - 1, eTime[2]).valueOf());
				eObject.days.forEach(item => {
					if (item.date === eTime.join("-")) {
						this.endDate = item;
					}
				});
			}
		},

		methods: {
			activeClass : function(timesTamp){
				if(this.startDate != null && this.startDate.timesTamp == timesTamp){
					return true
				}
				if(this.endDate != null && this.endDate.timesTamp == timesTamp){
					return true
				}
				return false
			},
			
			rangeClass : function(timesTamp){
				if(this.startDate != null && this.endDate != null ){
					return this.startDate.timesTamp < timesTamp && this.endDate.timesTamp > timesTamp
				} 
				return false
			},
			
			setBaseDateData: function() {
				let todayDt = new Date()
				let today_y = todayDt.getFullYear()
				let today_m = todayDt.getMonth() + 1
				let today_d = todayDt.getDate()
				this.todayTimestamp = new Date(today_y, today_m - 1, today_d).valueOf()
				this.currentMonthItem = this.getCurrentMonthDayArray(today_y, today_m, this.todayTimestamp)
				
				this.dataArray.push(this.currentMonthItem)
				let affterYear = today_y
				for(let index = 1; index <= this.affterMonthCount; index ++){
					let afferMonth = (today_m + index) % 12 == 0 ? 12 : (today_m + index) % 12 
					if(afferMonth == 1){
						affterYear += 1
					}
					//console.log('year:' + affterYear + '========='+ 'month:' + afferMonth)
					let monthItem = this.getCurrentMonthDayArray(affterYear, afferMonth, this.todayTimestamp)
					this.dataArray.push(monthItem)
				}
				
				let preYear = today_y
				let preMonth = today_m
				for(let index = 1; index <= this.preMonthCount; index ++){
				    preMonth = preMonth - 1
					if(preMonth == 0){
						preMonth = 12
						preYear -= 1
					}
					let monthItem = this.getCurrentMonthDayArray(preYear, preMonth, this.todayTimestamp)
					this.dataArray.splice(0,0,monthItem)
				}
			},

			getCurrentMonthDayArray : function(y, m, todayTimestamp, ) {
				let days = new Date(y, m, 0).getDate()
				var dataArray = []
				for (let day = 1; day <= days; day++) {
					let dt = new Date(y, m - 1, day);
					let timesTamp = dt.valueOf()
					let wk = dt.getDay()
					var status = ""
					var enabled = true
					if (todayTimestamp > timesTamp) {
						status = 'past'
					} else if (todayTimestamp == timesTamp) {
						status = 'today'
					} else {
						status = 'future'
					}

					dataArray.push({
						day: day,
						month: m,
						year: y,
						enabled: enabled,
						weak: wk,
						status: status,
						timesTamp: timesTamp,
						date: y + '-' + m + '-' + day
					})
				}

				let model = dataArray[0]
				for (let begin = model.weak - 1; begin >= 0; begin--) {
					let newModel = {
						day: "",
						enabled: false,
						month: model.month,
						year: model.year,
						weak: begin,
						timesTamp: -1
					}
					dataArray.splice(0, 0, newModel)
				}
				return {
					days: dataArray,
					month: m,
					year : y,
					time: y + "-" + m
				}
			},
				
				
			openPopup : function(){
				this.showPopup = true
			},

			closedPopup: function() {
				this.showPopup = false
			},
			
			didSelectorDate: function(e) {
				let model = e.currentTarget.dataset.model
				if(model.enabled == true){
					if(this.startDate == null){
						this.startDate = model
					}else{
						if(this.endDate == null){
							if(model.timesTamp < this.startDate.timesTamp){
								this.endDate = this.startDate
								this.startDate = model
							}else{
								this.endDate = model
							}
						}else{
							if(model.timesTamp < this.startDate.timesTamp){
								this.startDate = model
							}else if(model.timesTamp == this.startDate.timesTamp){
								this.endDate = model
							}else if(model.timesTamp > this.startDate.timesTamp && model.timesTamp < this.endDate.timesTamp){
								this.startDate = model
							}else if(model.timesTamp > this.endDate.timesTamp){
								this.endDate = model
							}else if(model.timesTamp == this.endDate.timesTamp){
								this.startDate = model
							}
						}
					}
				}
			},
			
			certainBtnAction : function(){
				if(this.startDate == null){
					uni.showToast({
						icon: 'none',
						title: '请选择开始时间'
					})
					return
				}
				
				if(this.endDate == null){
					uni.showToast({
						icon: 'none',
						title: '请选择结束时间',
					})
					return
				}
				this.$emit("selectorDate",{start : this.startDate, end : this.endDate})
				this.closedPopup()
			}
		}
	} 
</script>
<style lang="scss">

	$hl-calendar-primary: #D8336D;
	$sign-color : #FF0000;
	$range-bg: #FFEEF4;
	
	button::after{ border: none;} 
	.hl-popup {
		position: fixed;
		z-index: 999;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: transparent;
	}
	
	.safe-view{
		height: env(safe-area-inset-bottom);
	}

	.shade-bg-view {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: #000;
		opacity: 0.25;
	}

	.calendar {
		display: flex;
		flex-direction: column;
		position: fixed;
		width: 100%;
		right: 0;
		bottom: 0;
		left: 0;
		max-height: 75%;
		background-color: #FFF;
		padding-bottom: 50rpx;
		.list-view{	
			height: 500px;
			width: 100%;
		}
		.certain-btn{
			width: 320rpx;
			height: 88rpx;
			background-color: $hl-calendar-primary;
			color: #FFF;
			border-radius: 0;
			font-size: 32rpx;
			border-radius: 86rpx;
			font-weight: 600;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			margin: 0 auto;
		}
	}
	
	.topHandleView{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 100%;
		padding: 16px 0;
		font-size: 16px;
	}
	
	.weekdays-view,.monthdays-view{
		display: grid;
		width: 100%;
		grid-template-columns: repeat(7,1fr);
		.weekday,.monthday{
			display: flex;
			position: relative;
			padding-bottom: 100%;
			height: 0;
			overflow: hidden;
			.block-item{
				display: flex;
				position: absolute;
				width: 100%;
				height: 100%;
				justify-content: center;
				align-items: center;
				font-size: 16px;
				.sign{
					position: absolute;
					color: $sign-color;
					top: 0;
					font-size: 10px;
				}
				&.active{
					background-color: $hl-calendar-primary;
					color: #FFF;
					border-radius: 8rpx;
				}
				&.range{
					background-color: $range-bg;
					// color: #FFF;
					// border-radius: 4px;
				}
			}
		}
	}
	

</style>
