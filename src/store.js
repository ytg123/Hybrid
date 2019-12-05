import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
	
	state:{
		//购物车数据源
		shoppingDatas:[],
		//当前设备是否是iphonex
		isIphoneX:false,
		//登录用户的用户名
		username:undefined
	},
	mutations:{
		//添加商品到购物车数据眼
		addShoppingData(state,goods){
			//判断购物车是否包含该商品,如包含 number +1  否则才添加
			const isExist =  state.shoppingDatas.some(item => {
				if(item.id === goods.id){
					item.number += 1;
					return true
				}
			})
			
			//不包含
			if(!isExist){
				//为商品新增属性
				//isCheck 是否选中
				//number 数量
				Vue.set(goods,'isCheck',false);
				Vue.set(goods,'number',1);
				state.shoppingDatas.push(goods)
			}
		},
		/**
		 * 更改指定商品数量
		 * data:{
			 index:指定商品
			 number:指定商品数量
		 }
		 * 
		 */
		chageShoppingDataNumber(state,data){
			state.shoppingDatas[data.index].number = data.number;
		},
		/**
		 * 
		 * 修改iphonex
		 * 
		 */
		setIsIphonex(state,isIphonex){
			state.isIphoneX = isIphonex;
		},
		/**
		 * 指定用户名
		 * 
		 */
		serUserName(state,username){
			state.username = username;
		},
		/**
		 * 退出登录处理username
		 * 
		 */
		clearUsername(state){
			state.username = undefined;
		}
	},
	actions:{
		
	}
	
	
})