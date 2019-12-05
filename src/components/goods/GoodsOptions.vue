<template>
	
	<div class="goods-options z-index-2">
		<!-- 一级筛选项 -->
		<ul class="goods-options-list">
			<li class="goods-options-list-item" v-for="(item,index) in optionsDatas" :key='index'>
				<a class="goods-options-list-item-content" @click='onItemclick(item,index)'>
					<span class="goods-options-list-item-content-name" 
					:class="{'goods-options-list-item-content-name-active':selectOption.id === item.id}">{{item.name}}</span>
					<span class="goods-options-list-item-content-caret caret" v-if="item.subs.length > 0"
					:class="[isSubSHow && selectOption.id === item.id ? 'goods-options-list-item-content-caret-open' : 'goods-options-list-item-content-caret-close']"
					></span>
				</a>
			</li>
		</ul>
		<!-- 子选项 -->
		<transition name='fold-heihgt'>
			<div class="options-sub-content" v-show="isSubSHow">
				<ul class="options-sub-content-list">
					<li class="options-sub-content-list-item" v-for="(item,index) in selectOption.subs" :key='index'>
						<a  class="options-sub-content-list-item-content" @click="onSubItem(item,index)">
							<span class="options-sub-content-list-item-content-name"
							:class="{'options-sub-content-list-item-content-name-active':selectOption.id === item.id}"
							>{{item.name}}</span>
							<img class="options-sub-content-list-item-content-select" src="@img/options-select.svg" alt="" v-if="selectOption.id === item.id"/>
						</a>
					</li>
				</ul>
			</div>
		</transition>
		<!-- 遮盖层 -->
		<div class="cover" v-show="isSubSHow" @click="isSubSHow = false"></div>
	</div>
	
</template>

<script>
	export default{
		data(){
			return {
				//筛选项
				optionsDatas:[
					{
						id:'1',
						name:'默认',
						subs:[
							{
								id:'1',
								name:'默认'
							},
							{
								id:'1-2',
								name:'价格由高到低'
							},
							{
								id:'1-3',
								name:'销量由高到低'
							}	
						]
					},
					{
						id:'2',
						name:'有货优先',
						subs:[]
					},
					{
						id:'3',
						name:'直营优先',
						subs:[]
					}	
				],
				//选中筛选项
				selectOption:{},
				//子选项是否展开
				isSubSHow:false
			}
		},
		created() {
			this.selectOption = this.optionsDatas[0];
		},
		methods:{
			//一级点击  如果子处于展开则关闭  
			onItemclick(item){
				if(this.isSubSHow){
					this.isSubSHow = false;
					return;
				}
				
				//展示子视图
				if(item.subs.length > 0 && this.selectOption.id === item.id){
					this.isSubSHow = true;
				}
				this.selectOption = item;
			},
			//二级点击
			onSubItem(item){
				//设置选中项
				this.selectOption = item;
				//将选中项置顶为一级选项
				this.optionsDatas.forEach((item) => {
					item.subs.forEach((subItem) => {
						if(subItem.id === this.selectOption.id){
							item.id = subItem.id;
							item.name = subItem.name;
						}
					})
				})
				//关闭子级
				this.isSubSHow = false;
			}
		},
		watch:{
			selectOption(newV){
				this.$emit('optionsChange',newV.id);
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import  '@css/style.scss';
	
	.goods-options{
		width: 100%;
		border-bottom:1px solid $lineColor;
		//一级
		&-list{
			display: flex;
			display: -webkit-flex;
			width: 100%;
			height: px2rem(46);
			background-color: #fff;
			
			&-item{
				flex-grow: 1;
				
				&-content{
					height: 100%;
					display: flex;
					display: -webkit-flex;
					justify-content: center;
					align-items: center;
					
					&-name{
						font-size: $infoSize;
						margin-left: $marginSize;
						
						&-active{
							color: $mainColor;
						}
					}
					
					&-caret{
						&-open{
							transform: rotate(180deg);
							transition: all .3s;
						}
						&-close{
							transform: rotate(0deg);
							transition: all .3s;
						}
					}
				}
			}
		}
	
		.options-sub-content{
			position: absolute;
			width: 100%;
			max-height: px2rem(180);
			overflow: hidden;
			overflow-y: auto;
			background-color: #fff;
			z-index: 1;
			left: 0;
			&-list {
				&-item {
					&-content {
						display: flex;
						align-items: center;
						border-top: 1px solid $lineColor;
						padding: $marginSize;
						height: px2rem(44);
						box-sizing: border-box;

						&-name {
							font-size: $infoSize;
							display: inline-block;
							flex-grow: 1;

							&-active {
								color: $mainColor;
							}
						}

						&-select {
							width: px2rem(18);
							height: px2rem(18);
						}
					}
				}
			}
			
			//子级展开
			.fold-height-enter-active{
				animation-duration: .3s;
				animation-name: fold-height-open;
			}
			@keyframes fold-height-open{
				0%{
					max-height: 0;
				}
				100%{
					max-height: px2rem(180);
				}
			}
			//子级离开
			.fold-height-leave-active{
				animation-duration: .3s;
				animation-name: fold-height-close;
			}
			@keyframes fold-height-close{
				0%{
					max-height: px2rem(180);
				}
				100%{
					max-height: 0;
				}
			}
		}
	}
</style>
