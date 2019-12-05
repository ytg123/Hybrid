<template>
	<div class="number-manager">
		<span class="number-manager-less" :class="{'number-manager-disabled' : number === 1}" @click="onLessClick">-</span>
		<span class="number-manager-number">{{number}}</span>
		<span class="number-manager-add" @click="onAddClick">+</span>
	</div>
</template>

<script>
	export default{
		props:{
			/**
			 * 父组件指定的默认数量
			 */
			defaultNumber:{
				type:Number,
				default:1
			}
		},
		data(){
			return {
				//数量数据源
				number:1
			}
		},
		watch:{
			defaultNumber(){
				this.number = this.defaultNumber;
			},
			number(newV){
				this.$emit("onChangeNum",newV);
			}
		},
		methods:{
			/**
			 * 减号
			 */
			onLessClick(){
				if(this.number === 1)  return ;
				this.number -= 1;
			},
			/**
			 * 加号
			 */
			onAddClick(){
				this.number += 1;
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@css/style.scss';
	
	.number-manager{
		display: flex;
		font-size: $infoSize;
		height: px2rem(20);
		line-height: px2rem(20);
		
		span{
			width: px2rem(30);
			text-align: center;
			display: inline-block;
			font-weight: 500;
		}
		
		&-number{
			background-color: $bgColor;
			padding: 0 px2rem(4);
		}
		
		&-disabled{
			color: $hintColor;
		}
	}
</style>
