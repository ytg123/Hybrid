<template>
	
	<div class="main">
		<!-- 动态组件 -->
		<keep-alive>
			<component :is="currentComponent"></component>
		</keep-alive>
		<tool-bar ref="tools" @onChangeFragment="onChangeFragment"></tool-bar>
	</div>
	
</template>

<script>
	import toolBar from '@c/currency/ToolBar.vue';
	import Home from '@c/Home.vue';
	import Shopping from '@c/Shopping.vue';
	import My from '@c/My.vue';
	export default{
		name:'imooc',
		data(){
			return{
				//动态组件名称
				currentComponent:'home'
			}
		},
		components:{
			'tool-bar':toolBar,
			//异步组件引入方式
			// 'home': () => import('@c/Home'),
			// 'shopping':() => import('@c/Shopping'),
			// 'my':() => import('@c/My'),
			'home':Home,
			'shopping':Shopping,
			'my':My
		},
		methods:{
			onChangeFragment(str){
				this.currentComponent = str;
			},
			/**
			 * 指定加载的页面组件
			 * 
			 */
			pushFragment(){
				let index = this.$route.params.componentIndex;
				if(index === undefined){
					return false;
				}else{//调用toolBar切换组件
					this.$refs.tools.pushFragmentss(index);
				}
			}
		},
		/**
		 * keep-alive 激活时调用
		 * 
		 */
		activated () {
			this.pushFragment();
		}
	}
</script>

<style lang="scss" scoped>
	@import  '@css/style.scss';
	
	.main{
		position:absolute;
		width: 100%;
		height: 100%;
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
	}
</style>
