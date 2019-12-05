<template>
	<div class="shopping">
		<my-nav-bar :pageName="pName" :isShowBack="false"></my-nav-bar>
		
		<div class="shopping-content">
			<!-- 商品 -->
			<div class="shopping-content-list">
				<div class="shopping-content-list-item" v-for="(item,index) in shoppingDatas" :key="index">
					<!-- check -->
					<img :src="checkImg(item.isCheck)" alt="" @click="onGoodsCheck(item)" class="shopping-content-list-item-check"/>
					<!-- 商品图片 -->
					<img :src="item.img" alt="" class="shopping-content-list-item-img"/>
					
					<!-- 描述 -->
					<div class="shopping-content-list-item-desc">
						<!-- 名称 -->
						<div class="shopping-content-list-item-desc-name text-line-2">
							<!-- 直营 -->
							<my-direct v-if='item.isDirect'></my-direct>
							{{item.name}}
						</div>
						<div class="shopping-content-list-item-desc-data">
							<!-- 价格 -->
							<div class="shopping-content-list-item-desc-data-price">
								￥{{item.price | priceValid}}
							</div>
							<!-- 数量控制组件 -->
							<my-num-manage :defaultNumber="item.number" @onChangeNum="numChange(arguments,item,index)"></my-num-manage>
						</div>
					</div>
				</div>
			</div>
		
			<!-- 统计 -->
			<div class="shopping-content-total">
				<!-- 全选 -->
				<div class="shopping-content-total-check">
					<img :src="checkImg(totalData.isAll)" alt="" @click="onAllCheck"/>
					<p>全选</p>
				</div>
				
				<!-- 总价格 -->
				<div class="shopping-content-total-price">
					<p class="shopping-content-total-price-total">
						合计：<span>￥{{totalData.totalPrice | priceValid}}</span>
					</p>
					<p class="shopping-content-total-price-all">
						总额：<span>￥{{totalData.totalPrice | priceValid}}</span>
						&nbsp;&nbsp;
						立减<span>￥0.00</span>
					</p>
				</div>
				
				<!-- 结算 -->
				<div class="shopping-content-total-commit">
					去结算({{totalData.goodsNumber}})
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		components:{
			'my-nav-bar':() => import('@c/currency/NavigationBar.vue'),
			'my-direct': () => import('@c/goods/Direct.vue'),
			'my-num-manage':() => import('@c/goods/NumberManager.vue')
		},
		data(){
			return {
				pName:'购物车',
				//商品
				shoppingDatas:this.$store.state.shoppingDatas,
				//总计
				totalData:{
					isAll:false,//是否全选
					totalPrice:0,//总价格
					goodsNumber:0//总数量
				}
			}
		},
		methods:{
			/**
			 * 
			 * 数量变化
			 * 
			 */
			numChange(arr,item,num){
				let number = arr[0];
				
				//修改对应的商品数量
				this.$store.commit('chageShoppingDataNumber',{
					index:num,
					number:number
				});
				
				//商品数量发生变化时，且处于选中状态
				if(item.isCheck){
					this.computedGoodsTotal()
				}
			},
			/**
			 * 商品check按钮点击事件
			 * 
			 */
			onGoodsCheck(item){
				item.isCheck = !item.isCheck;
				if(item.isCheck){
					this.computedGoodsTotal()
				}else{
					this.totalData = {
						isAll:item.isCheck,//是否全选
						totalPrice:this.totalData.totalPrice - (parseFloat(item.price) * parseInt(item.number)),//总价格
						goodsNumber:parseInt(this.totalData.goodsNumber - item.number)//总数量
					}
				}
			},
			/**
			 * 全选
			 */
			onAllCheck(){
				this.totalData.isAll = !this.totalData.isAll;
				
				//为每个商品设置选中标记 当前是否全选标记
				this.shoppingDatas.forEach(item => {
					item.isCheck = this.totalData.isAll;
					if(item.isCheck){
						this.computedGoodsTotal()
					}else{
						this.totalData = {
							isAll:item.isCheck,//是否全选
							totalPrice:0,//总价格
							goodsNumber:0//总数量
						}
					}
				});
			},
			/**
			 * check  按钮图标
			 */
			checkImg(flag){
				return flag ? require('@img/check.svg') : require('@img/no-check.svg');
			},
			/**
			 * 计算总计数据
			 * 
			 */
			computedGoodsTotal(){
				//先初始化数据
				this.totalData = {
					isAll:true,//是否全选
					totalPrice:0,//总价格
					goodsNumber:0//总数量
				}
				
				//计算总计数据
				this.shoppingDatas.forEach(item => {
					if(item.isCheck){
						this.totalData.totalPrice += parseFloat(item.price) * parseInt(item.number); 
						this.totalData.goodsNumber += parseInt(item.number)
					}else{
						this.totalData.isAll = false;
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import  '@css/style.scss';
	
	.shopping{
		width: 100%;
		height: 100%;
		overflow: hidden;
		display: flex;
		flex-flow: column;
		
		&-content{
			background-color: $bgColor;
			border-top: px2rem(1) solid $lineColor;
			height: 100%;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			//列表
			&-list{
				height: 100%;
				overflow: hidden;
				overflow-y: auto;
				
				&-item{
					background-color: #fff;
					padding: $marginSize;
					display: flex;
					border-bottom:px2rem(1) solid $lineColor;
					
					&-check{
						width: $checkSize;
						align-self: center;
						padding: px2rem(6);
					}
					
					&-img{
						width: $listGoodsImgSize;
						height: $listGoodsImgSize;
					}
					
					&-desc{
						width: 100%;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						padding: 0 $marginSize;
						
						&-name{
							font-size: $infoSize;
							line-height: px2rem(18);
						}
						
						&-data{
							width: 100%;
							display: flex;
							align-items: center;
							justify-content: space-between;
							margin-top: $marginSize;
							
							&-price{
								font-size: $titleSize;
								color: $mainColor;
								font-weight: bold;
							}
						}
					}
				}
			}
		
			//总计
			&-total{
				height: px2rem(56);
				box-sizing: border-box;
				display: flex;
				background-color: #fff;
				border-top: px2rem(1) solid $lineColor;
				
				&-check{
					display: flex;
					align-items: center;
					margin:0 $marginSize;
					
					img{
						width: $checkSize;
						height: $checkSize;
						padding: px2rem(6);
					}
					
					p{
						font-size: $infoSize;
					}
				}
			
				&-price{
					flex-grow: 2;
					display: flex;
					flex-direction: column;
					
					&-total{
						font-size: $titleSize;
						margin-bottom: px2rem(6);
						
						span{
							font-weight: bold;
						}
					}
					
					&-all{
						font-size: $mainInfoSize;
						span{
							font-weight: bold;
						}
					}
				}
			
				&-commit{
					width: px2rem(120);
					height: 100%;
					font-size: $titleSize;
					background-color: $mainColor;
					color: #fff;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}
	}
</style>
