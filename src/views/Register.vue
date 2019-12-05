<template>
	<div class="register">
		<my-nav-bar :pageName="'注册'" @onLeftClick="backFn"></my-nav-bar>
		
		<!-- 内容 -->
		<div class="register-content">
			<div class="input-container">
				<input  type="text" placeholder="用户名" v-model="userInfo.username"/>
			</div>
			<div class="input-container">
				<input  type="password" placeholder="密码" v-model="userInfo.password"/>
			</div>
			<div class="input-container">
				<input  type="password" placeholder="确认密码" v-model="userInfo.newpassword"/>
			</div>
			
			<div class="register-content-register payment" @click="onRegisterClick">
				注册
			</div>
		</div>
	</div>
</template>

<script>
	// import md5 from '@js/md5.min.js';
	export default{
		name:'register',
		components:{
			'my-nav-bar':() => import('@c/currency/NavigationBar.vue')
		},
		data(){
			return {
				userInfo:{
					username:'',
					password:'',
					newpassword:''
				},
			}
		},
		methods:{
			/**
			 * 返回
			 */
			backFn(){
				this.$router.go(-1)
			},
			/**
			 * 注册
			 * 
			 */
			onRegisterClick(){
				if(this.userInfo.username === '' || this.userInfo.password === ''){
					alert('请完善信息');
					return false;
				}
				if(this.userInfo.password !== this.userInfo.newpassword){
					alert('两次密码输入不一样');
				}
				//与原生进行交互 判断当前运行在安卓还是ios
				if(window.androidJSBridge){//安卓
					this.onRegisterToAndroid();
				}else if(window.webkit){//ios
					this.onRegisterToIos();
				}
				
			},
			/**
			 * 调用安卓
			 * 
			 */
			onRegisterToAndroid(){
				// let md5pwd = md5(this.userInfo.password);
				let userJon = JSON.stringify({
					'username':this.userInfo.username,
					'passwrod':this.userInfo.password
				});
				//调用安卓注册方法
				let result = window.androidJSBridge.register(userJon);
				this.onRegisterCallback(result);
			},
			/**
			 * 
			 * 调用ios
			 *  不能直接返回返回值
			 */
			onRegisterToIos(){
				let userObj = {
					'username':this.userInfo.username,
					'passwrod':this.userInfo.password
				}
				window.registerCallback = this.onRegisterCallback;
				window.webkit.messageHandlers.register.postMessage(userObj);
				
			},
			/**
			 * 用来处理注册接口返回值处理
			 * 
			 */
			onRegisterCallback(result){
				if(result){
					alert('注册成功！');
					this.backFn();
				}else{
					alert('注册失败，请重试！')
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import  '@css/style.scss';
	
	.register{
		position:absolute;
		width: 100%;
		height: 100%;
		background-color: #fff;
		
		&-content{
			width: 100%;
			height: 100%;
			
			&-register{
				margin-top: 40%;
			}
		}
	}	
</style>
