<template>
	<div class="goods-list-page">
		<my-nav-bar @onLeftClick='onBackClick' :pageName="'商品列表'">
			<template v-slot:nav-right>
				<img :src="layoutType.icon" alt="" @click="onChangeLayOutType()"/>
			</template>
		</my-nav-bar>
		<div class="goods-list-page-content" :class="{'inphonex-bottom':$store.state.isIphonex}">
			<my-options @optionsChange="onGoodsChange"></my-options>
		</div>
		<my-goods-list :layoutType='layoutType.type' :isScroll='true' :sort="sortType"></my-goods-list>
	</div>
</template>

<script>
	export default{
		name:'goodsList',
		components:{
			'my-nav-bar':() => import('@c/currency/NavigationBar.vue'),
			'my-options':() => import('@c/goods/GoodsOptions.vue'),
			'my-goods-list':() => import('@c/goods/Goods.vue')
		},
		data(){
			return {
				layoutTypeDatas:[
					{
						//垂直
						type:'1',
						icon:require('@img/list-type.svg')
					},
					{
						//网格
						type:'2',
						icon:require('@img/grid-type.svg')
					},
					{
						//瀑布流
						type:'3',
						icon:require('@img/waterfall-type.svg')
					}
					
				],
				layoutType:{
					
				},
				//goods排序规则
				sortType:'1'
			}
		},
		created() {
			this.layoutType = this.layoutTypeDatas[0];
		},
		methods:{
			/* 
			 后退
			 */
			onBackClick(){
				this.$router.back(-1)
			},
			/* 
			 切换展示形式
			 */
			onChangeLayOutType(){
				const [ l,g,w] = this.layoutTypeDatas;
				if(this.layoutType.type == '1'){
					this.layoutType = g;
				}else if(this.layoutType.type == '2'){
					this.layoutType = w;
				}else{
					this.layoutType = l;
				}
			},
			/**
			 * 当筛选子项改变时触发
			 * 
			 */
			onGoodsChange(sortType){
				this.sortType = sortType;
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@css/style.scss';
	
	.goods-list-page{
		position:absolute;
		width: 100%;
		height: 100%;
		background-color: $bgColor;
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		
		&-content{
			display: flex;
			display: -webkit-flex;
			flex-direction: column;
		}
	}
</style>
