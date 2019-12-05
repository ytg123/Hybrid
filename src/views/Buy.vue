<template>
	<div class="buy">
		<my-nav-bar :pageName="'立即购买'" @onLeftClick="onbackClick()"></my-nav-bar>
		<!-- 内容 -->
		<div class="buy-content">
			<!-- 购买的商品 -->
			<div class="buy-content-goods">
				<!-- 商品图片 -->
				<img :src="goodsData.img" alt="" class="buy-content-goods-img" />
				<!-- 商品描述 -->
				<div class="buy-content-goods-desc">
					<p class="buy-content-goods-desc-name">{{goodsData.name}}</p>
					<p class="buy-content-goods-desc-price">￥{{goodsData.price | priceValid}}</p>
				</div>
			</div>
			<!-- 支付方式 -->
			<ul class="buy-content-list">
				<li class="buy-content-list-item" v-for="(item,index) in pagementDatas" :key="index" @click="onPayment(item)">
					<img :src="item.icon" alt="" class="buy-content-list-item-icon"/>
					<div class="buy-content-list-item-desc">
						<p class="buy-content-list-item-desc-name">{{item.name}}</p>
						<p class="buy-content-list-item-desc-desc">{{item.desc}}</p>
					</div>
					<!-- 选中标记 -->
					<img :src="getCheckIcon(selectPayment.id === item.id)" alt="" class="buy-content-list-item-check"/>
				</li>
			</ul>
		</div>
		
		<!-- 立即购买 -->
		<div class="pay payment" @click="onBuyClick">
			立即支付
		</div>
	</div>
</template>

<script>
	export default{
		name:'buy',
		components:{
			'my-nav-bar':() => import('@c/currency/NavigationBar.vue')
		},
		data(){
			return{
				//商品数据
				goodsData:{},
				//支付方式
				pagementDatas:[
					{
						id:'1',
						name:'支付宝支付',
						icon:require('@img/alipay.svg'),
						desc:'数亿用户都在用，安全可信托'
					},
					{
						id:'2',
						name:'微信支付',
						desc:'亿万用户选择，更快，更安全',
						icon:require('@img/weichat.png')
					}
				],
				//用户选中的支付方式
				selectPayment:{}
			}
		},
		created() {
			const [ a ] = this.pagementDatas;
			this.selectPayment = a;
			this.getGoodsInfoById()
		},
		methods:{
			/**
			 * 根据商品id获取数据
			 */
			async getGoodsInfoById(){
				const { goodsData } = await this.$http.get('/goodsDetail',{
					params:{
						goodsId:this.$route.query.goodsId
					}
				});
				this.goodsData = goodsData;
			},
			/**
			 * 回退
			 */
			onbackClick(){
				this.$router.go(-1)
			},
			/**
			 * 支付方式切换
			 * 
			 */
			onPayment(val){
				this.selectPayment = val;
			},
			/**
			 * 返回支付方式的图片
			 * 
			 */
			getCheckIcon(isCheck){
				return isCheck ? require('@img/check.svg') : '@img/no-check.svg'
			},
			/**
			 * 支付事件
			 * 
			 */
			onBuyClick(){
				//判断支付方式
				if(this.selectPayment.id === '1'){//alipay
					this.alipay();
				}else if(this.selectPayment.id === '2'){//weichatpay
					this.weichatpay();
				}
			},
			/**
			 * 支付宝支付
			 * 
			 */
			alipay(){
				if(window.androidJSBridge){//安卓
					window.androidJSBridge.aliPay(JSON.stringify(this.goodsData));
				}else if(window.webkit){//ios
				}
			},
			/**
			 * 微信支付
			 */
			weichatpay(){
				if(window.androidJSBridge){//安卓
					window.androidJSBridge.wxPay(JSON.stringify(this.goodsData));
				}else if(window.webkit){//ios
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@css/style.scss';
	
	.buy{
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: $bgColor;
		
		&-content{
			overflow: hidden;
			height: 100%;
			
			&-goods{
				background-color: #fff;
				padding: $marginSize;
				display: flex;
				display: -webkit-flex;
				border-bottom: px2rem(1) solid $lineColor;
				border-top: px2rem(1) solid $lineColor;
				margin-top: $marginSize;
				
				&-img{
					width: px2rem(100);
					height: px2rem(100);
				}
				
				&-desc{
					width: 100%;
					display: flex;
					display: -webkit-flex;
					flex-direction: column;
					justify-content: space-between;
					padding: 0 $marginSize;
					
					&-name{
						font-size: $infoSize;
						line-height: px2rem(18);
					}
					
					&-price{
						font-size: $titleSize;
						color: $mainColor;
						font-weight: 500;
					}
				}
			}
		
			&-list{
				margin-top: $marginSize;
				
				&-item{
					display: flex;
					display: -webkit-flex;
					background-color: #fff;
					border-bottom:px2rem(1) solid $lineColor;
					padding: $marginSize;
					align-items: center;
					&-icon{
						height: px2rem(30);
					}
					
					&-desc{
						margin-left: px2rem(12);
						flex-grow: 1;
						
						&-name{
							font-size: $infoSize;
						}
						
						&-desc{
							font-size: $mainInfoSize;
							margin-top: px2rem(6);
							color: $hintColor;
						}
					}
					&-check{
						width: px2rem(16);
						height: px2rem(16);
					}
				}
			}
		}
		.pay{
			position: absolute;
			bottom: px2rem(52);
		}	
	}	
</style>
