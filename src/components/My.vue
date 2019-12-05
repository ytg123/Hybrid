<template>
	<div class="my">
		<my-nav-bar :pageName="pName" :isShowBack="false"></my-nav-bar>
		<div class="my-content">
			<!-- 头像 -->
			<div class="my-content-header" @click="onToLogin">
				<img src="@img/avater.png" alt="" class="my-content-header-avator"/>
				<p class="my-content-header-login">{{$store.state.username ? $store.state.username : '登录/注册'}}</p>
			</div>
			<!-- 工具栏 -->
			<div class="my-content-tools">
				<div class="my-content-tools-item" v-for="(item,index) in toolsData" :key='index'>
					<p class="my-content-tools-item-name">{{item}}</p>
					<img src="@img/right-arrow.svg" alt="" class="my-content-tools-item-arrow">
				</div>
			</div>
			
			<!-- 存在登录用户，展示退出按钮 -->
			<div class="my-content-logout payment" v-if="$store.state.username" @click="logOut">
				退出
			</div>
		</div>
	</div>
</template>

<script>
	import NavigationBar from '@c/currency/NavigationBar.vue';
	export default{
		components:{
			'my-nav-bar':NavigationBar
		},
		data(){
			return {
				pName:'个人中心',
				toolsData:[
					'全部订单',
					'我的预约',
					'应用推荐',
					'用户福利'
				]
			}
		},
		methods:{
			/**
			 * 登录
			 * 
			 */
			onToLogin(){
				this.$router.push({
					name:'login',
					params:{
						routerType:'push'
					}
				})
			},
			/**
			 * 退出登录
			 * 
			 */
			logOut(){
				if(window.androidJSBridge){//安卓
					this.logoutToAndroid();
				}else if(window.webkit){//ios
					this.logoutToIOS();
				}
			},
			/**
			 * 安卓
			 * 
			 */
			logoutToAndroid(){
				let result = window.androidJSBridge.logout();
				this.onLogOutCallback(result);
			},
			/**
			 * IOS
			 * 
			 */
			logoutToIOS(){
				window.logoutCallback = this.onLogOutCallback;
				window.webkit.messageHandlers.logout.postMessage({});
			},
			/**
			 * 用来处理退出接口返回值处理
			 * 
			 */
			onLogOutCallback(result){
				if(result){
					alert('退出登录成功！');
					this.$store.commit('clearUsername');
				}else{
					alert('操作失败，请重试！');
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import  '@css/style.scss';
	
	.my{
		width: 100%;
		height: 100%;
		display: flex;
		flex-flow: column;
		background-color: $bgColor;
		
		&-content{
			height: 100%;
			width: 100%;
			
			&-header{
				margin-top: $marginSize;
				background-color: #fff;
				height: px2rem(68);
				display: flex;
				align-items: center;
				border-top: px2rem(1) solid $lineColor;
				border-bottom: px2rem(1) solid $lineColor;
				padding: $marginSize;
				
				&-avator{
					width: px2rem(52);
					height: px2rem(52);
				}
				
				&-login{
					margin-left: $marginSize;
					font-size: $titleSize;
				}
			}
			
			&-tools{
				&-item{
					display: flex;
					height: px2rem(46);
					box-sizing: border-box;
					align-items: center;
					padding: $marginSize;
					background-color: #fff;
					border-bottom: px2rem(1) solid $lineColor;
					
					&-name{
						font-size: $infoSize;
						flex-grow: 1;
					}
					&-arrow{
						width: px2rem(16);
					}
				}
			}
			
			&-logout{
				margin-top: 20%;
			}
		}
	}
</style>
