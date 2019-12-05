<template>
	
	<div class="tool-bar" :class="{'inphonex-top':$store.state.isIphonex}">
		<div class="tool-bar-item" @click="onChangeFragment(item,index)"
			v-for="(item,index) in toolBarData" :key='index'>
			<img :src="[index === selectItemIndex ? item.hIcon : item.nIcon]" alt="" class="tool-bar-item-img"/>
			<p class="tool-bar-item-name" :class="{'tool-bar-item-name-h':index === selectItemIndex}">{{item.name}}</p>
		</div>
	</div>
	
	
</template>

<script>
	export default{
		data(){
			return {
				//tab 按钮数据源
				toolBarData:[
					{
						nIcon:require('@img/home-n.svg'),
						hIcon:require('@img/home-h.svg'),
						name:'首页',
						componentName:'home'
					},
					{
						nIcon:require('@img/shopping-n.svg'),
						hIcon:require('@img/shopping-h.svg'),
						name:'购物车',
						componentName:'shopping'
					},
					{
						nIcon:require('@img/my-n.svg'),
						hIcon:require('@img/my-h.svg'),
						name:'我的',
						componentName:'my'
					}
				],
				//选中标识
				selectItemIndex:0
			}
		},
		methods:{
			//动态切换
			onChangeFragment(item,index){
				this.selectItemIndex = index;
				//向父组件传值
				this.$emit('onChangeFragment',item.componentName)
			},
				
			/**
			 * 指定切换的tab页
			 * 
			 */
			pushFragmentss(index){
				this.onChangeFragment(this.toolBarData[index],index);
			}
		}
	}
	
</script>

<style lang="scss" scoped>
	@import  '@css/style.scss';
	
	.tool-bar{
		width: 100%;
		height: px2rem(46);
		display: flex;
		display: -webkit-flex;
		justify-content: space-around;
		background-color: #fff;
		box-shadow: 0 0 px2rem(16) 0 rgba(0,0,0,.2);
		border-top: px2rem(1) solid #e5e5e5;
		
		&-item{
			text-align: center;
			padding: px2rem(4) px2rem(12) px2rem(6) px2rem(12);
			display: flex;
			display: -webkit-flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			box-sizing: border-box;
			&-img{
				width: px2rem(22);
				height: px2rem(22);
			}
			&-name{
				font-size: $infoSize;
				
				&-h{
					color:$mainColor;
				}
			}
		}
	}
</style>
