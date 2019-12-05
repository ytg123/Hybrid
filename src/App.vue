<template>
	<div id="app">
		<!-- 路由入口 -->
		<transition :name="routerTypeName">
			<!-- 缓存加载的组件 -->
			<keep-alive :include="virtualTaskStack">		
				<router-view></router-view>
			</keep-alive>
		</transition>		
	</div>
</template>

<script>
	export default {
		name: 'app',
		components: {
			
		},
		data(){
			return {
				routerTypeName:'',
				//虚拟任务栈
				virtualTaskStack:[
					'imooc'
				]
			}
		},
		/**
		 * 监听路由对象，决定采用哪种过度效果
		 */
		watch:{
			'$route' (to) {
				//获取携带的标记
				const routerType = to.params.routerType;
				if(routerType === 'push'){
					//当进入新页面时保存新页面名称的虚拟任务栈
					this.virtualTaskStack.push(to.name)
					this.routerTypeName = 'fold-left';
				}else{
					//执行后退操作时，把最后一个页面弹出
					this.virtualTaskStack.pop();
					this.routerTypeName = 'fold-right';
				}
				
				//初始化任务栈
				if(to.params.clearTast) this.virtualTaskStack = ['imooc'];
			}
		},
		created() {
			this.$store.commit('setIsIphonex',window.isIphoneX);
			//指定Native主动调用的方法
			window.nativeFunctionUserLogin = this.nativeFunctionUserLogin;
		},
		methods:{
			/**
			 * @param {Object} username   当前登录的用户名
			 * 提供给native调用的方法  
			 */
			nativeFunctionUserLogin(username){
				//保存自动登录的用户名到vuex
				this.$store.commit('serUserName',username);
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import  '@css/style.scss';
	#app {
		width: 100%;
		height: 100%;
		
		//push  页面时，新页面的进入动画
		.fold-left-enter-active{
			animation-name:fold-left-in;
			animation-duration:.4s;
		}
		@keyframes fold-left-in{
			0%{
				transform:translate(100%,0);
			}
			100%{
				transform:translate(0,0)
			}
		}
		.fold-left-leave-active{
			animation-name:fold-left-out;
			animation-duration:.4s;
		}
		//push  页面时，原页面的退出动画
		@keyframes fold-left-out{
			0%{
				transform:translate(0,0);
			}
			100%{
				transform:translate(-100%,0)
			}
		}
		
		//后退 页面时，即将展示页面的动画
		.fold-right-enter-active{
			animation-name:fold-right-in;
			animation-duration:.4s;
		}
		@keyframes fold-right-in{
			0%{
				transform:translate(-100%,0);
			}
			100%{
				transform:translate(0,0)
			}
		}
		//后退 页面时，后退页面的动画
		.fold-right-leave-active{
			animation-name:fold-right-out;
			animation-duration:.4s;
		}
		@keyframes fold-right-out{
			0%{
				transform:translate(0,0);
			}
			100%{
				transform:translate(100%,0)
			}
		}
	}
</style>
