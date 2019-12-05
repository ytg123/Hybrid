<template>
	<div class="mode-options">
		<div class="mode-options-item" v-for="(item,index) in dataSource" :key='index' @click="onItemClick(item)">
			<img :src="item.icon" alt="" srcset="" class="mode-options-item-icon" />
			<p class="mode-options-item-title">
				{{item.title}}
			</p>
		</div>
	</div>
</template>

<script>
	export default{
		
		data(){
			return {
				dataSource:[
					{
						id: '1',
						icon: require('@img/jingDongChaoShi.png'),
						title: '京东超市'
					},
					{
						id: '2',
						icon: require('@img/haiTunQuanQiu.png'),
						title: '海屯全球'
					},
					{
						id: '3',
						icon: require('@img/jingDongFuShi.png'),
						title: '京东服饰'
					},
					{
						id: '4',
						icon: require('@img/jingDongShengXian.png'),
						title: '京东生鲜'
					},
					{
						id: '5',
						icon: require('@img/jingDongDaoJia.png'),
						title: '京东到家'
					},
					{
						id: '6',
						icon: require('@img/chongZhiJiaoFei.png'),
						title: '充值缴费'
					},
					{
						id: '7',
						icon: require('@img/jingDongPinGou.png'),
						title: '9.9元拼'
					},
					{
						id: '8',
						icon: require('@img/lingJuan.png'),
						title: '领劵'
					},
					{
						id: '9',
						icon: require('@img/zhuanQian.png'),
						title: '赚钱'
					},
					{
						id: '10',
						icon: require('@img/quanBu.png'),
						title: '全部'
					}
				]
			}
		},
		methods:{
			//跳往商品列表
			onItemClick(){
				this.$router.push({
					name:'goodsList',
					params:{
						routerType:'push'
					}
				})
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	@import '@css/style.scss';
	
	.mode-options{
		display: flex;
		display: -webkit-flex;
		flex-wrap: wrap;
		background-color: #fff;
		padding:px2rem(14);
		
		&-item{
			width: 20%;
			text-align: center;
			margin-top: px2rem(10);
			
			&-icon{
				width: px2rem(40);
				height: px2rem(40);
			}
			&-title{
				font-size: $mainInfoSize;
				margin-top: px2rem(6);
			}
		}
	}
</style>
