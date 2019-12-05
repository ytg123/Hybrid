<template>
	<div>
		<swiper :options="swiperOption" ref="mySwiper">
			<swiper-slide v-for="(item,index) in swiperImgs" :key='index'>
				<img :src="item" alt="" class="swiper-slide-img" :style="{height:height}">
			</swiper-slide>
			<template v-slot:pagination>
				<div class="swiper-pagination"></div>
			</template>
		</swiper>
	</div>
</template>

<script>
	import 'swiper/dist/css/swiper.css';
	import {
		swiper,
		swiperSlide
	} from 'vue-awesome-swiper';
	export default {
		props: {
			height: {
				type: String,
				default: 'auto'
			},
			swiperImgs: {
				type: Array,
				required: true,
				default () {
					return []
				}
			},
			/**
			 * 1、圆点切换
			 * 2、数字
			 */
			paginationType: {
				type: String,
				default: '1'
			}
		},
		data() {
			return {
				swiperOption: {
					//auto
					autoplay: true,
					//heiht
					autoHeight: true,
					//分页
					pagination: {
						//html元素
						el: '.swiper-pagination',
						type: 'bullets',
						bulletClass: 'swiper-pagination-bullet'
					}
				}
			}
		},
		components: {
			swiper,
			swiperSlide
		},
		created() {
			this.initPaginationLayOut();
		},
		methods: {
			/**
			 * 根据分页器类型来配置对应的分液器
			 */
			initPaginationLayOut() {
				switch (this.paginationType) {
					case '1':
						this.swiperOption.pagination = {
							//html元素
							el: '.swiper-pagination',
							type: 'bullets',
							bulletClass: 'swiper-pagination-bullet'
						}
						break;
					default:
						this.swiperOption.pagination = {
							el: '.swiper-pagination',
							type: 'fraction'
						}
						break;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@css/style.scss';
	
	.swiper-slide-img{
		width: 100%;
	}
	.swiper-pagination {
		bottom: px2rem(12);
		height: px2rem(30);
		line-height: px2rem(30);

		/deep/.swiper-pagination-bullet {
			box-sizing: border-box;
			border-radius: 100%;
			height: px2rem(6);
			width: px2rem(6);
			border: px2rem(1) solid #fff;
			margin: px2rem(4) px2rem(4);
			display: inline-block;
			background: transparent;
			opacity: 1;
		}

		/deep/.swiper-pagination-bullet-active {
			background: #fff !important;
		}
	}
	/deep/.swiper-pagination-fraction{
		left: auto;
		right: 0;
		width: auto;
		font-size: $infoSize;
		background-color: rgba(0,0,0,.3);
		padding: px2rem(3) px2rem(22);
		border-top-left-radius:px2rem(16);
		border-bottom-left-radius:px2rem(16);
		bottom:px2rem(32);
		color: #fff;
		
		/deep/.swiper-pagination-current{
			font-size: $titleSize;
			font-weight: bold;
		}
	}
</style>
