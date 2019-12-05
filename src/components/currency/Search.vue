<template>
	<div class="search" :style="{backgroundColor:bgColor}">
		<img :src="icon" alt="" class="search-icon"/>
		<span class="search-hint" :style="{color:hintColor}">大前端开发、混合京东商城系统</span>
	</div>
</template>

<script>
	export default{
		props:{
			icon:{
				type:String,
				default:require('@img/search.svg')
			},
			hintColor:{
				type:String,
				default:'#999'
			},
			bgColor:{
				default:"#fff",
				type:String
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import  '@css/style.scss';
	
	.search{
		background-color: #fff;
		width: 100%;
		margin: px2rem(6);
		border-radius: px2rem(22);
		display: flex;
		display: -webkit-flex;
		align-items: center;
		
		&-icon{
			margin-left: $marginSize;
			width: px2rem(16);
		}
		&-hint{
			margin-left: $marginSize;
			font-size: $mainInfoSize;
			color:$hintColor;
		}
	}
</style>
