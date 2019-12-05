<template>
	
	<div class="nav-bar z-index-max"
		:style="navBarStyle"
		:class="[{'bottom-line':pageName},{'inphonex-top':$store.state.isIphonex}]">
		<div class="left" @click="$emit('onLeftClick')">
			<img src="@img/back.svg" alt="" v-if="isShowBack"/>
			<slot name="nav-left"></slot>
		</div>
		<div class="center">
			<span class="page-title" v-if="pageName">{{pageName}}</span>
			<slot name="nav-center"></slot>
		</div>
		<div class="right">
			<slot name="nav-right"></slot>
		</div>
	</div>
</template>

<script>
	/* 能力:
			1、默认的展示效果， 左边后退按钮的图标 中间页面的名称  右边空白的内容
			2、可通过插槽来配置距离的展示样式，左 中 右三个插槽 父组件可以通过这三个插槽来指定对应的内容
			3、可以接受重外部指定的一个样式（可以在父组件中指定navigationBar的style） */
	export default{
		props:{
			pageName:{
				type:String,
				default:''
			},
			/* 
			 * 是否展示后退按钮
			 */
			isShowBack:{
				type:Boolean,
				default:true
			},
			/* 
			 navBar 样式
			 */
			navBarStyle:{
				type:Object,
				default(){
					return {
						backgroundColor:'#fff'
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@css/style.scss';
	
	.nav-bar{
		width: 100%;
		height: px2rem(44);
		line-height: px2rem(44);
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		//适配手机沉浸式
		padding-top: $statusBar;
		.left,.right{
			display: flex;
			display: -webkit-flex;
			height: 100%;
			width: px2rem(26);
			padding: 0 $marginSize;
			
			img{
				width: 100%;
				align-self: center;
			}
		}
		.center{
			display: flex;
			display: -webkit-flex;
			flex-grow: 1;
			height: 100%;
			.page-title{
				font-size: $titleSize;
				align-self: center;
				margin: 0 auto;
			}
		}
	}
	.bottom-line{
		border-bottom: 1px solid $lineColor;
	}
</style>
