<template>
	<!-- :class="loadClass"> -->
	<view :class="containClassName" v-show="lottieShow">
       <canvas
			:style="{'width':aniWidth+'px','height': aniHeight+'px'}"
	        id="lottieCanvas"
			type="2d"
			class="player"></canvas>
	</view>
</template>

<script setup>
	import lottie from 'lottie-miniprogram';
	import animationData from '@/static/image/loading.json'
	import { nextTick, onMounted ,ref, onBeforeUnmount,watch, getCurrentInstance } from 'vue';
	let instance = getCurrentInstance();
	let animation = ref(null)
	let containClassName= ref('')
	let lottieShow = ref(true)
	
	const props = defineProps({
		status:{
			type: String,
			default: ''
		},
		aniWidth:{
			type: Number,
			default: 160
		},
		aniHeight:{
			type: Number,
			default: 160
		}
	})
	
	onMounted(()=>{
		nextTick(()=>{
			uni.createSelectorQuery().in(instance.proxy)
				.select('#lottieCanvas')
				.node((res)=>{
					let {node} = res;
					let context = node.getContext('2d')
					node.width=props.aniWidth;
					node.height=props.aniHeight;
					lottie.setup(node)
					animation.value = lottie.loadAnimation({
						loop:true,
						autoplay:true,
						animationData: animationData,
						rendererSettings:{
							context
						}
					})
					
				}).exec()
		})
		
	})
	
	let stopWatch = watch(()=>props.status,(newValue,oldValue)=>{
		// console.log("newValue---------", newValue)
		if(newValue=='loading'){
			lottieShow.value=true;
			animation.value&&animation.value.play();
			nextTick(()=>{
				containClassName.value = 'loading-cover'
			})
		}else{
			animation.value&&animation.value.pause();
			containClassName.value = 'loading-cover cover-show'
			setTimeout(()=>{
				lottieShow.value=false;
			},1200)
		}
	},{immediate:true})
	
	onBeforeUnmount(()=>{
		animation.value&&animation.value.destroy();
		stopWatch();
	})
</script>

<style lang="scss">
	.loading-cover{
		width: 160px;
		height: 160px;
		position: fixed;
		left: 50%;
		top: 65%;
		transform: translate(-50%,-50%);
		user-select: none;
		.player{
			transform-origin: center center;
			transition: all 0.5s;
		}
	}
	.cover-show{
		.player{
			opacity: 0;
			// transform: scale(0.5,0.5);
			user-select: none;
		}
	}
</style>