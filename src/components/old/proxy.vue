<template>
	<div class="price">
		<ul>
			<li v-for="item in price" :key="item">{{item}}</li>
		</ul>
		<span @click="up">升序</span>
		<span @click="down">降序</span>
		<span @click="reset">重置</span>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		data () {
			return {
				price:[],
				proxy:''
			}
		},
		methods:{
			up () {
				this.price = this.proxy.up
			},
			down(){
				this.price = this.proxy.down
			},
			reset(){
				this.price = this.proxy.default
			}
		},
		async  mounted () {
			const { data:{ price } } = await axios.get('/proxy')
			//冷冻以防改变
			Reflect.preventExtensions(price)
			this.proxy = new Proxy({},{
				get (target,key){
					if(key === 'up'){
						return [].concat(price).sort((a,b) => a - b)
					}else if(key === 'down'){
						return [].concat(price).sort((a,b) => b - a)
					}else {
						return price
					}
				},
				set () {
					return false
				}
				
			})
			this.price = this.proxy.default
		}
	}
</script>

<style>
</style>
