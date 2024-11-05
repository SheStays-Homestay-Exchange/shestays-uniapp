<template>
	<!-- :class="loadClass"> -->
	<view ref="lottieContain" :class="containClassName">
		<lottie-player
		  class="player"
		  ref="lottieDom"
		  autoplay
		  loop
		  mode="normal"
		  :src="src"
		  style="width: 100%;height: 100%;"
		>
		</lottie-player>
	</view>
</template>

<script setup>
	import "@/common/plugin/lottie-player.js";
	import animationData from '@/static/image/loading.json'
	import { nextTick, onMounted, computed,ref, onBeforeUnmount,watch} from 'vue';
	
	let src = animationData
	let lottieDom = ref(null)
	let lottieContain = ref(null)
	let containClassName= ref('loading-cover cover-show')
	
	const props = defineProps({
		status:{
			type: String,
			default: ''
		}
	})
	
	onBeforeUnmount(()=>{
		if(lottieDom.value&&lottieDom.value.destroy){
			lottieDom.value.destroy();
		}
		stopWatch();
	})
	
	let stopWatch = watch(()=>props.status,(newValue,oldValue)=>{
		if(!lottieContain.value){
			containClassName.value = newValue=='loading'? 'loading-cover':containClassName.value
			return;
		} 
		if(newValue=='loading'){
			lottieContain.value.$el.style.display="block";
			lottieDom.value? lottieDom.value.play():'';
			nextTick(()=>{
				containClassName.value = 'loading-cover'
			})
		}else{
			lottieDom.value? lottieDom.value.stop():'';
			containClassName.value = 'loading-cover cover-show'
			setTimeout(()=>{
				lottieContain.value.$el.style.display="none"
			},1200)
		}
	},{immediate:true})
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
			transform: scale(0.5,0.5);
			user-select: none;
		}
	}
</style>