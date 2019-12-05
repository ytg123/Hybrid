<template>
	<div class="home" @scroll='onScrollChange' ref="home">
		<my-nav-bar :isShowBack="false" :navBarStyle="navBarStyle">
			<!-- 左侧 -->
			<template v-slot:nav-left>
				<img :src="navBarCurrentSlotStyle.leftIcon" alt="" />
			</template>
			<!-- 中间 -->
			<template v-slot:nav-center>
				<my-search :bgColor="navBarCurrentSlotStyle.search.bgColor" :hintColor="navBarCurrentSlotStyle.search.hintColor" 
				:icon="navBarCurrentSlotStyle.search.icon"></my-search>
			</template>
			<!-- 右边 -->
			<template v-slot:nav-right>
				<img :src="navBarCurrentSlotStyle.rightIcon" alt="" />
			</template>
		</my-nav-bar>
		<div class="home-content">
			<!-- 轮播 -->
			<my-swiper :swiperImgs="swiperImgs.map((item) => item.icon)" :height="swiperHeight" :paginationType="'1'"></my-swiper> 
			<!-- 活动 -->
			<my-activity>
				<div class="activity-520">
					<img v-for="(item,index) in activityDatas" :src="item.icon" alt="" :key='index'/>
				</div>
			</my-activity>
			<!-- 功能组件 -->
			<my-modeoptions></my-modeoptions>
			<!-- 秒杀商品 -->
			<my-seconds :dataSource='secondsDatas'></my-seconds>
			<!-- 拼购节 -->
			<my-activity>
				<div class="activity-pgj">
					<img  src="@img/pinGouJie.gif" alt=""/>
				</div>
			</my-activity>
			<!-- 商品列表 -->
			<my-goods :layoutType="'3'" :isScroll='false'></my-goods>
		</div>
		
	</div>
	
</template>

<script>
	export default{
		data(){
			return {
				swiperImgs:[],
				swiperHeight:this.$store.state.isIphonex ? '228px' : '184px',
				activityDatas:[],
				secondsDatas:[],
				pName:'首页',
				navBarSlotStyle:{
					//默认
					normal:{
						//左侧
						leftIcon:require('@img/more-white.svg'),
						//中间
						search:{
							bgColor:'#fff',
							hintColor:'#999',
							icon:require('@img/search.svg')
						},
						//右侧
						rightIcon:require('@img/message-white.svg')
					},
					//高亮
					highLight:{
						//左侧
						leftIcon:require('@img/more.svg'),
						//中间
						search:{
							bgColor:'#d7d7d7',
							hintColor:'#fff',
							icon:require('@img/search-white.svg')
						},
						//右侧
						rightIcon:require('@img/message.svg')
					}
				},
				//正在使用
				navBarCurrentSlotStyle:{
					
				},
				//定制
				navBarStyle:{
					position:'fixed',
					backgroundColor:''
				},
				//滚动值
				scrollTopValue:-1,
				//锚点值
				ANCHOR_SCROLL_TOP:160
			}
		},
		components:{
			'my-swiper':() => import('@c/swiper/MySwiper.vue'),
			'my-activity':() => import('@c/currency/Activity.vue'),
			'my-modeoptions':() => import('@c/currency/ModeOptions.vue'),
			'my-seconds':() => import('@c/seconds/Seconds.vue'),
			'my-goods':() => import('@c/goods/Goods.vue'),
			'my-nav-bar':() => import('@c/currency/NavigationBar.vue'),
			'my-search':() => import('@c/currency/Search.vue')
		},
		created() {
			this.navBarCurrentSlotStyle = this.navBarSlotStyle.normal;
			this.initData();
		},
		/**
		 * keep-alive组件激活时调用
		 * 
		 */
		activated(){
			this.$refs.home.scrollTop = this.scrollTopValue;
		},
		methods:{
			//获取数据  同时发送多个请求 this.$http.all([url,url2]).then(this.$http.spread(swiperImgs,activityDatas))
			async initData(){
				//轮播
				const { list } = await this.$http.get('/swiper');
				//530活动
				const { list:acList } = await this.$http.get('/activitys')
				//秒杀商品
				const { list:secondList } = await this.$http.get('/seconds')
				this.swiperImgs = list
				this.activityDatas = acList
				this.secondsDatas = secondList
			},
			/* 
			 监听页面滚动
				1、获取滚动距离
				2、计算navbar背景颜色
					滚动距离 / 锚点值 = navbar透明度
				3、opacity >= 1 说明当前距离超过锚点值  样式改变
					否则  不变
			 */
			onScrollChange($event){
				//获取距离
				this.scrollTopValue = $event.target.scrollTop;
				//计算navbar背景颜色
				let opacity = this.scrollTopValue / this.ANCHOR_SCROLL_TOP;
				//指定navbar插槽样式
				opacity >= 1 ? this.navBarCurrentSlotStyle = this.navBarSlotStyle.highLight : this.navBarCurrentSlotStyle = this.navBarSlotStyle.normal;
				//根据透明度设置navbar的背景色
				this.navBarStyle.backgroundColor = `rgba(255,255,255,${opacity})`;	
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	@import  '@css/style.scss';
	
	.home{
		width: 100%;
		height: 100%;
		font-size: px2rem(32);
		background-color: $bgColor;
		overflow: hidden;
		overflow-y: auto;
		&-content{
			height: 100%;
			
			.activity-520{
				margin-top: px2rem(-8);
				border-top-left-radius:px2rem(8);
				border-top-right-radius:px2rem(8);
				
				img{
					display: inline-block;
					width: 33.33%;
				}
			}
			
			.activity-pgj{
				background-color: #fff;
				margin-top: $marginSize;
				
				img{
					width:100%;
				}
			}
		}
	}
</style>
