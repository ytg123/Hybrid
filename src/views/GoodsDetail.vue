<template>
	<div class="goods-detail">
		<my-nav-bar :isShowBack='false' :navBarStyle="navBarStyle">
			<template v-slot:nav-left>
				<div class="goods-detail-nav-left" @click='onBackClick'>
					<!-- 默认状态下的黑色按钮 -->
					<img src="@img/back-2.svg" alt="" :style="{opacity:letImgOpacity}"/>
					<!-- 完全展示之后的白色按钮 -->
					<img src="@img/back-white.svg" alt="" :style="{opacity:navBarSlotOpacity}"/>
				</div>
			</template>
			<template v-slot:nav-center>
				<p class="goods-detail-nav-title" :style="{opacity:navBarSlotOpacity}">商品详情</p>
			</template>
		</my-nav-bar>
		
		<!-- 内容 -->
		<div class="goods-detail-content">
			<my-parallax @onScrollChange="onScrollChange">
				<!-- 缓慢 -->
				<template v-slot:slow>
					<my-swiper :height="SWIPER_IMGER_HEIGHT + 'px'" :swiperImgs="goodsData.swiperImgs" :paginationType="'2'"></my-swiper>
				</template>
				<!-- 正常 -->
				<template>
					<div class="goods-detail-content-desc">
						<div class="goods-detail-content-desc-item">
							<p class="goods-detail-content-desc-item-price">
								￥{{goodsData.price | priceValid}}
							</p>
							<p class="goods-detail-content-desc-item-name">
								<!-- 是否直营 -->
								<my-direct v-if="goodsData.isDirect"></my-direct>
								{{goodsData.name}}
							</p>
						</div>
						
						<div class="goods-detail-content-desc-item">
							<p class="goods-detail-content-desc-item-select">
								已选<span class="single-row-text">{{goodsData.name}}</span>
							</p>
							<div class="goods-detail-content-desc-item-support">
								<ul class="goods-detail-content-desc-item-support-list">
									<li class="goods-detail-content-desc-item-support-list-item" v-for="(item,index) in supportArr" :key='index'>
										{{item}}
									</li>
								</ul>
							</div>
						</div>
						<!-- 商品描述 -->
						<div class="goods-detail-content-desc-detail">
							<img v-for="(item,index) in goodsData.detailImgs" :src="item" alt="" :key='index'/>
						</div>
						
					</div>
				</template>
			</my-parallax>	
		</div>
		<!-- 加入购物从  立即购买 -->
		<div class="goods-detail-buy" :class="{'inphonex-bottom':$store.state.isIphonex}">
			<div class="goods-detail-buy-add" @click="joinShopping">
				加入购物车
			</div>
			<div class="goods-detail-buy-now" @click="goBuy">
				立即购买
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'goodsDetail',
		components:{
			'my-nav-bar':() => import('@c/currency/NavigationBar.vue'),
			'my-swiper':() => import('@c/swiper/MySwiper.vue'),
			'my-direct': () => import('@c/goods/Direct.vue'),
			'my-parallax':() => import('@c/parallax/Parallax.vue')
		},
		data(){
			return {
				SWIPER_IMGER_HEIGHT:364,
				//锚点值
				ANCHOR_SCROLL_TOP:310,
				goodsData:[],
				supportArr:[
					'可配送海外',
					'京东发货&售后',
					'京准达',
					'211限时达',
					'可自提',
					'不可使用优惠券'
				],
				//滑动值
				scrollValue:0
			}
		},
		created() {
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
			 * 返回
			 */
			onBackClick(){
				this.$router.go(-1)
			},
			/**
			 * 监听页面的滑动
			 * 
			 */
			onScrollChange(scrollValue){
				this.scrollValue = scrollValue;
			},
			/**
			 * 立即购买
			 */
			goBuy(){
				this.$router.push({
					name:'buy',
					params:{
						routerType:'push'
					},
					query:{
						goodsId:this.goodsData.id
					}
				});
			},
			/**
			 * 加入购物车
			 */
			joinShopping(){
				alert('添加成功');
				//添加商品到购物车数据中
				this.$store.commit('addShoppingData',this.goodsData);
				this.$router.push({
					name:'jd',
					params:{
						routerType:'push',
						//在toolBar中定义的下标
						componentIndex:1,
						//初始化虚拟任务栈
						clearTast:true
					}
				})
			}
		},
		computed:{
			/**
			 * 默认状态下左侧后退按钮的透明度
			 * 
			 */
			letImgOpacity(){
				//1 - 算出来透明度
				return 1 - this.scrollValue / this.ANCHOR_SCROLL_TOP;
			},
			/**
			 * navBar的样式
			 * 
			 */
			navBarStyle(){
				return {
					backgroundColor:'rgba(216,30,6,'+this.navBarSlotOpacity+')',
					position:'fiexd',
					top:0
				}
			},
			/**
			 * navBar 插槽透明度
			 * 
			 */
			navBarSlotOpacity(){
				return 1- this.letImgOpacity;
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	@import '@css/style.scss';
	
	.goods-detail{
		position:absolute;
		width: 100%;
		height: 100%;
		display: flex;
		display: -webkit-flex;
		flex-flow: column;
		
		&-nav-left{
			width: 100%;
			display: flex;
			position: relative;
			img{
				position: absolute;
				align-self: center;
			}
		}
		
		&-nav-title{
			width: 100%;
			height: 100%;
			font-size: $titleSize;
			font-weight: bold;
			text-align: center;
			color: #fff;
		}
		
		&-content{
			overflow: hidden;
			height: 100%;
			
			&-desc {
				width: 100%;
				background-color: $bgColor;
				box-shadow: 0 0 px2rem(16) 0 rgba(0, 0, 0, 0.2);

				&-item {
					background-color: white;
					padding: $marginSize;
					margin-bottom: $marginSize;
					// 价格
					&-price {
						font-size: px2rem(20);
						color: $mainColor;
						font-weight: 500;
					}
					// 名称
					&-name {
						margin-top: $marginSize;
						font-size: $titleSize;
						font-weight: 500;
						line-height: px2rem(20)
					}
					// 已选商品
					&-select {
						font-size: $infoSize;
						color: $hintColor;
						height: px2rem(44);
						display: flex;
						align-items: center;
						border-bottom: px2rem(1) solid $lineColor;

						span {
							color: $textColor;
							font-size: $titleSize;
							font-weight: bold;
							margin-left: px2rem(4);
						}
					}
					// 附加服务
					&-support {
						margin-top: $marginSize;

						&-list {
							display: flex;
							flex-wrap: wrap;

							&-item {
								display: flex;
								align-items: center;
								padding: px2rem(6) 0;
								margin-right: $marginSize;

								img {
									width: px2rem(12);
									margin-right: px2rem(4);
								}

								span {
									font-size: $mainInfoSize;
									color: $hintColor;
								}
							}
						}
					}
				}
				// 描述
				&-detail {
					img {
						width: 100%;
					}
				}
			}
		}
		
		&-buy {
			background-color: white;
			border-top: px2rem(1) solid $lineColor;
			height: px2rem(46);
			line-height: px2rem(46);
			text-align: right;

			div {
				display: inline-block;
				width: px2rem(100);
				text-align: center;
				font-size: $infoSize;
				color: white;
			}

			&-add {
				background-color: $mainColor;
			}

			&-now {
				background-color: darkgoldenrod;
			}
		}
	}
</style>
