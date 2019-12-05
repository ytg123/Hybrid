<template>
	<div class="count-down">
		<span class="count-down-end-item">{{endHours}}点场</span>
		<span class="count-down-surplus">{{surplus}}</span>
	</div>
</template>

<script>
	export default{
		props:{
			//活动开始时间
			endHours:{
				type:Number,
				required:true,
				default:0
			}
		},
		data(){
			return {
				//互动状态
				surplus:'',
				//距离活动开始的描述
				diffSeconds:0,
				interval:null
			}
		},
		created() {
			this.computedSurplusTime()
		},
		methods:{
			/* 
				计算展示内容
			 
			 */
			computedSurplusTime(){
				this.interval && clearInterval(this.interval)
				//当前时间
				const date = new Date();
				if(date.getHours() > this.endHours){
					this.surplus = '活动已结束';
					return;
				}
				
				if(date.getHours() === this.endHours){
					this.surplus = '活动进行中';
					return;
				}
				
				const diffHours = this.endHours - date.getHours() -1;
				const diffMinutes = 60 - date.getMinutes() - 1;
				const diffSeconds = 60 - date.getSeconds();
				this.diffSeconds = diffHours * 3600 + diffMinutes * 60 + diffSeconds;
				this.interval = setInterval(() => {
					this.diffSeconds -= 1
				},1000)
			}
		},
		watch:{
			diffSeconds(newV){
				const hours = Math.floor(newV / 3600).toString().padStart(2,'0');
				const minutes = (Math.floor(newV / 60) % 60).toString().padStart(2,'0');
				const seconds = (newV % 60).toString().padStart(2,'0');
				this.surplus = `${hours} : ${minutes} : ${seconds}`;
				
				newV === 0 && this.computedSurplusTime();
			},
			endHours(){
				this.computedSurplusTime();
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import  '@css/style.scss';
	.count-down{
		display: inline-block;
		font-size: $infoSize;
		margin-left: $marginSize;
		
		span{
			display: inline-block;
			padding: px2rem(2) px2rem(4);
		}
		
		&-end-item{
			background-color: $mainColor;
			border-top-left-radius:px2rem(4);
			border-bottom-left-radius:px2rem(4);
			border:px2rem(1) solid $mainColor;
			color: #fff;
		}
		
		&-surplus{
			background-color: #fff;
			border-top-right-radius:px2rem(4);
			border-bottom-right-radius:px2rem(4);
			border:px2rem(1) solid $mainColor;
			color: $mainColor;
		}
	}
</style>
