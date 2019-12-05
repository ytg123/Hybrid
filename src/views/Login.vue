<template>
	<div class="login">
		<my-nav-bar :pageName="'登录'" @onLeftClick="backFn"></my-nav-bar>
		<!-- 内容 -->
		<div class="login-content">
			<div class="input-container">
				<input  type="text" placeholder="用户名" v-model="userInfo.username"/>
			</div>
			<div class="input-container">
				<input  type="password" placeholder="密码" v-model="userInfo.password"/>
			</div>
			
			<!-- 登录按钮 -->
			<div class="login-content-login payment" @click="onLoginClick">
				登录
			</div>
			
			<a class="login-content-register" @click="onTonewUser">注册新用户</a>
		</div>
	</div>
</template>

<script>
	// import md5 from '@js/md5.min.js';
	export default{
		name:'login',
		components:{
			'my-nav-bar':() => import('@c/currency/NavigationBar.vue')
		},
		data(){
			return {
				userInfo:{
					username:'',
					password:''
				},
				gValid:''
			}
		},
		created() {
			this.validTools()
		},
		methods:{
			/**
			 * 返回
			 */
			backFn(){
				this.$router.go(-1)
			},
			/**
			 * 登录
			 * 
			 */
			onLoginClick(){
				//与原生进行交互
				if(window.androidJSBridge){//安卓
					this.onLoginToAndroid();
				}else if(window.webkit){//ios
					this.onLoginToIos();
				}
			},
			/**
			 * 安卓登录
			 * 
			 */
			onLoginToAndroid(){
				// let md5pwd = md5(this.gValid.password);
				let userInfo = JSON.stringify({
					'username':this.gValid.username,
					'password':this.gValid.password
				});
				let result = window.androidJSBridge.login(userInfo);
				this.onLoginCallback(result);
			},
			/**
			 * ios 登录
			 * 
			 */
			onLoginToIos(){
				let userInfo= {
					'username':this.gValid.username,
					'password':this.gValid.passowrd
				}
				//回调方法一定要在调用接口之前调用
				window.loginCallback = this.onLoginCallback;
				window.webkit.messageHandlers.login.postMessage(userInfo)
			},
			/**
			 * 用来处理注册接口返回值处理
			 * 
			 */
			onLoginCallback(result){
				switch (result){
					case -1:
						alert('系统内部错误');
						break;
					case 0:
						this.$store.commit('serUserName',this.gValid.username);
						this.backFn()
						break;
					case 1:
						alert('登录用户不存在');
						break;
					case 2:
						alert('用户密码错误');
						break;
				}
			},
			/**
			 * 立即注册
			 * 
			 */
			onTonewUser(){
				this.$router.push({
					name:'register',
					params:{
						routerType:'push'
					}
				});
			},
			/**
			 * 验证工具
			 * 
			 */
			validTools(){
				this.gValid = new Proxy(this.userInfo,{
					get(target,key){
						if(target[key] === ''){
							alert('用户名或密码不能为空！');
						}else{
							return target[key];
						}
					},
					set(target,key,value){
						if(Reflect.has(target,key)){
							if(value === ''){
								throw new TypeError('no required')
							}else{
								target[key] = value;
							}
						}else{
							return false;
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import  '@css/style.scss';
	
	.login{
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: #fff;
		
		&-content{
			width: 100%;
			height: 100%;
			
			&-login{
				margin-top: 40%;
			}
			
			&-register{
				font-size: $infoSize;
				color: $hintColor;
				margin-top: $marginSize;
				padding: $marginSize;
				float: right;
			}
		}
	}
</style>
