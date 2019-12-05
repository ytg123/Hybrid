<template>
	<div class="parallax" @scroll="onScrollChangeFn">
		<!-- 缓慢移动区 -->
		<div class="parallax-slow" :style="{top:slowTop}">
			<slot name='slow'></slot>
		</div>
		
		<!-- 正常 -->
		<div class="parallax-content z-index-2">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				parallaxScroll:0,
				SPEED_DIFF:2,//速度差
			}
		},
		methods:{
			/**
			 * 监听组件滑动
			 * 
			 */
			onScrollChangeFn($event){
				this.parallaxScroll = $event.target.scrollTop;
				this.$emit('onScrollChange',this.parallaxScroll);
			}
		},
		computed:{
			//返回slow距离顶部的距离
			slowTop(){
				return (this.parallaxScroll - (this.parallaxScroll / this.SPEED_DIFF)) + 'px';
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import  '@css/style.scss';
	
	.parallax{
		width: 100%;
		height: 100%;
		overflow: hidden;
		overflow-y: auto;
		
		&-slow{
			width: 100%;
			position: relative;
		}
		
		&-content{
			width: 100%;
			position: relative;
		}
	}
</style>
