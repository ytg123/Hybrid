import Vue from 'vue';
import Router from 'vue-router';
import Main from './views/Main.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'jd',
      component: Main,
    },
    {
      path: '/goodsList',
      name: 'goodsList',
      component: () => import(/* webpackChunkName: "goodsList" */ '@v/GoodsList.vue')
    },
	{
		path:'/goodsDetail',
		name:'goodsDetail',
		component: () => import(/* webpackChunkName: "goodsList" */ '@v/GoodsDetail.vue'),
	},
	{
		path:'/buy',
		name:'buy',
		component: () => import(/* webpackChunkName: "goodsList" */ '@v/Buy.vue'),
	},
	{
		path:'/login',
		name:'login',
		component: () => import(/* webpackChunkName: "goodsList" */ '@v/Login.vue'),
	},
	{
		path:'/register',
		name:'register',
		component: () => import(/* webpackChunkName: "goodsList" */ '@v/Register.vue'),
	}
  ]
});

export default router;
