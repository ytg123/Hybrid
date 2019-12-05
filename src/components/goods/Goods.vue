<template>

	<div class="goods" :class="[layoutClass,{'goods-scroll':isScroll}]" :style="{height:goodsViewHeight}" ref="goods" @scroll="onScrollChange">
		<div class="goods-item" :class="layoutItemClass" v-for="(item,index) in goodsList" :key='index' ref='goodsItem' :style="goodsItemStyles[index]" @click='onItemClick(item)'>
			<img :src="item.img" alt="" class="goods-item-img" :style='imgStyles[index]' />
			<div class="goods-item-desc">
				<p class="goods-item-desc-name text-line-2" :class="{'goods-item-desc-name-hint': !item.isHave}">
					<!-- 是否直营 -->
					<my-direct v-if="item.isDirect"></my-direct>
					<!-- 是否还有库存 -->
					<my-no-have v-if="!item.isHave"></my-no-have>
					{{item.name}}
				</p>
				<div class="goods-item-desc-data">
					<p class="goods-item-desc-data-price">
						￥{{item.price | priceValid}}
					</p>
					<p class="goods-item-desc-data-volume">
						销量：{{item.volume}}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	/* 
	 	瀑布流的布局：
	 		1、创建商品列表的基本html和css 让item相对于goods（div） 进行排列
	 		2、生成不同高度的图片，撑起不同高度的item
	 		3、计算item的位置，来达到从上到下 从左到右依次排列的目的
	  
	 */
	export default {
		components: {
			'my-direct': () => import('@c/goods/Direct.vue'),
			'my-no-have': () => import('@c/goods/NoHave.vue')
		},
		props: {
			//1 垂直  2 网格 3 瀑布流
			layoutType: {
				type: String,
				default: '1'
			},
			//是否可以单独滑动
			isScroll:{
				type:Boolean,
				default:true
			},
			//排序规则  1：默认 1-2：价格由高到低 1-3：销量由高到低 2：有货优先 3：直营优先
			sort:{
				type:String,
				default:'1'
			}
		},
		data() {
			return {
				goodsList: [],
				//最大高度
				MAX_IMG_HEIGHT: 230,
				//最小高度
				MIN_IMG_HEIGHT: 178,
				//图片样式集合
				imgStyles: [],
				//item的margin
				ITEM_MARGIN_SIZE: 8,
				//item 样式集合
				goodsItemStyles: [],
				//goods㢟的高度
				goodsViewHeight: 0,
				//不同展示形式下的类名
				layoutClass: 'goods-list',
				layoutItemClass: 'goods-list-item',
				//排序
				proxyData:'',
				//滚动距离
				scrollTopValue:-1
			}
		},
		created() {
			this.initData();
		},
		methods: {
			async initData() {
				const {
					list
				} = await this.$http.get('/goods');
				//先锁住
				Reflect.preventExtensions(list)
				this.proxyData = new Proxy({},{
					get(target,key){
						if(key === 'priceUptoDown'){//价格由高到低
							return [].concat(list).sort((a,b) => b.price - a.price)
						}else if(key === 'volumeUptoDown'){//销量由高到低
							return [].concat(list).sort((a,b) => b.volume - a.volume)
						}else if(key === 'isHave'){//有货优先
							return [].concat(list).sort((a,b) => {
								if(a.isHave){
									return -1;
								}
								if(b.isHave){
									return 1;
								}
							})
						}else if(key === 'isDirective'){//直营优先
							return [].concat(list).sort((a,b) => {
								if(a.isDirect){
									return -1;
								}
								if(b.isDirect){
									return 1;
								}
							})
						}else{
							return list;
						}
					},
					set(){
						return false;
					}
				})
				this.setSortGoodsData()
				this.initLayOut();
			},
			/**
			 * 
			 * 商品排序
			 * 
			 */
			setSortGoodsData(){
				switch (this.sort){
					//1：默认 
					case '1':
						this.goodsList = this.proxyData.default;
						break;
					//1-2：价格由高到低
					case '1-2':
						this.goodsList = this.proxyData.priceUptoDown;
						break;
					//1-3：销量由高到低
					case '1-3':
						this.goodsList = this.proxyData.volumeUptoDown;
						break;
					//2：有货优先
					case '2':
						this.goodsList = this.proxyData.isHave;
						break;
					//3：直营优先
					default:
						this.goodsList = this.proxyData.isDirective;
						break;
				}
			},
			/* 
				初始化：
					设置布局 影响布局的因素
						goodsViewHeight
						goodsItemStyles
						imgStyles
				展示不同的布局
			 */
			initLayOut(){
				this.goodsViewHeight = '100%';
				this.goodsItemStyles = [];
				this.imgStyles = [];
				//为不同的layoutType设置不同的展示类
				switch (this.layoutType){
					case '1':
						this.layoutClass = 'goods-list';
						this.layoutItemClass = 'goods-list-item';
						break;
					case '2':
						this.layoutClass = 'goods-grid';
						this.layoutItemClass = 'goods-grid-item';
						break;
					default:
						this.layoutClass = 'goods-waterfall';
						this.layoutItemClass = 'goods-waterfall-item';
						this.initImgStyles();
						this.$nextTick(() => {
							this.initWaterFallFn();
						});
						break;
				}
			},
			/* 
			 * 返回随机图片的高度
			 */
			imgHeightRandom() {
				return Math.floor(Math.random() * (this.MAX_IMG_HEIGHT - this.MIN_IMG_HEIGHT) + this.MIN_IMG_HEIGHT);
			},
			/* 
			 * 根据随机的图片高度，生成对应的图片数据
			 *
			 */
			initImgStyles() {
				this.goodsList.forEach(() => {
					let imgHeight = this.imgHeightRandom() + 'px';
					this.imgStyles.push({
						height: imgHeight
					})
				})
			},
			/* 
			 * 瀑布流布局：
			 * 	1、获取所有的item元素
			 * 2、遍历item元素 得到每个item的高度 加上一个马婷的高度
			 * 3、创建两个变量leftHeightTotal  rightHeightTotal 分辨表示两侧目前距离顶部的高度
			 * 	   通过对于左右两侧距离顶部的奥都类确定item的放置位置
			 * 		如果左侧小于等于右侧高度的话，那么item就应该放到左侧，此时item的距离左侧为0，距离顶部为当前的leftHeightTotal
			 * 		否则item放置右侧，此时item距离右侧为0 距离顶部为当前的rightHeightTotal
			 *	4、保存计算出的item的所有样式配置到item上
			 *  5、item配置完成后，对比左右两侧最大的高度，最大的高度为goods组件的高度
			 *
			 */
			initWaterFallFn() {
				//获取所有元素
				let $goodsItem = this.$refs.goodsItem;
				if (!$goodsItem) return;
				//左右两侧距离顶部的高度
				let leftHeightTotal = 0;
				let rightHeightTotal = 0;

				//遍历item元素 得到每个item的高度 加上一个马婷的高度
				$goodsItem.forEach(($el) => {
					//item样式
					let goodsItemStyle = {};
					let elHeight = $el.clientHeight + this.ITEM_MARGIN_SIZE;
					//对比左右两侧的高度
					if (leftHeightTotal <= rightHeightTotal) {
						//放左侧
						goodsItemStyle = {
							left: '0px',
							top: leftHeightTotal + 'px'
						}
						//更新左侧距离顶部的高度
						leftHeightTotal += elHeight;
					} else {
						//放右侧
						goodsItemStyle = {
							right: '0px',
							top: rightHeightTotal + 'px'
						}
						//更新右侧距离顶部的高度
						rightHeightTotal += elHeight;
					}
					//保存计算出的item的所有样式配置到item上
					this.goodsItemStyles.push(goodsItemStyle);
				})
				if(!this.isScroll){
					//item配置完成后，对比左右两侧最大的高度，最大的高度为goods组件的高度
					this.goodsViewHeight = leftHeightTotal > rightHeightTotal ? (leftHeightTotal + 'px') : (rightHeightTotal + 'px');	
				}
			},
			/**
			 * 商品点击事件
			 * 
			 * 
			 */
			onItemClick(item){
				if(!item.isHave){
					alert("该商品暂无库存！");
					return;
				}
				this.$router.push({
					name:'goodsDetail',
					params:{
						routerType:'push'
					},
					query:{
						goodsId:item.id
					}
				})
			},
			/**
			 * 滚动事件
			 * 
			 */
			onScrollChange($event){
				this.scrollTopValue = $event.target.scrollTop;
			}
		},
		/**
		 * keep-alive组件激活时调用
		 * 
		 */
		activated(){
			this.$refs.goods.scrollTop = this.scrollTopValue;
		},
		watch:{
			layoutType(){
				this.initLayOut()
			},
			sort(){
				this.setSortGoodsData();
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@css/style.scss';

	.goods {
		background-color: $bgColor;
		&-scroll{
			overflow: hidden;
			overflow-y: auto;	
		}
		&-item {
			background-color: #fff;
			padding: $marginSize;
			box-sizing: border-box;

			&-desc {
				width: 100%;

				&-name {
					font-size: $infoSize;
					line-height: px2rem(18);

					&-hint {
						color: $hintColor;
					}
				}

				&-data {
					width: 100%;
					display: flex;
					display: -webkit-flex;
					justify-content: space-between;
					margin-top: $marginSize;

					&-price {
						font-size: $titleSize;
						color: $mainColor;
						font-weight: 500;
					}

					&-volume {
						font-size: $infoSize;
						color: $hintColor;
					}
				}
			}
		}
	}
	
	/* 垂直 */
	.goods-list{
		&-item{
			display: flex;
			display: -webkit-flex;
			border-bottom: 1px solid $lineColor;
			
			.goods-item-img{
				width: px2rem(120);
				height: px2rem(120);
			}
			.goods-item-desc{
				display: flex;
				display: -webkit-flex;
				flex-direction: column;
				justify-content: space-between;
				padding: $marginSize;
			}
		}
	}

	/* 网格 */
	.goods-grid{
		padding: $marginSize;
		display: flex;
		display: -webkit-flex;
		flex-wrap: wrap;
		justify-content: space-between;
		&-item{
			width: 49%;
			border-radius: $rediusSize;
			margin-bottom: $marginSize;
			.goods-item-img {
				width: 100%;
			}
		}
	}

	/* 瀑布流 */
	.goods-waterfall {
		position: relative;
		margin: $marginSize;

		&-item {
			position: absolute;
			width: 49%;
			border-radius: $rediusSize;

			.goods-item-img {
				width: 100%;
			}
		}
	}
</style>
