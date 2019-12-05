<template>
	<div class="list">
		<ul>
			<li v-for="item in list" :key='item.name'>
				<!-- {{item.name.replace(/-/g,'')}} - {{item.addr}} -->
				{{item.name.trim()}} - {{item.addr}}
			</li>
			{{priceTxt}}
		</ul>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		name:'List',
		data () {
			return {
				list:[],
				priceTxt:''
			}
		},
		async mounted () {
			let { data:{ list , price , rate } } = await axios.get('/list')
			this.$data.list = list
			this.$data.priceTxt =  navigator.language === 'zh-CN' ? `￥${price * rate}` : `$${price * rate}`
		}
	}
</script>

<style>
</style>
