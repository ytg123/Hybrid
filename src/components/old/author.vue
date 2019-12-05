<template>
	<div class="list">
		<ul>
			<li v-for="item in authors" key='item.name'>
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
		name:'list',
		data () {
			return {
				authors:{}
			}
		},
		async mounted () {
			let { data:{ allAuthors } } = await axios.get('/author')
			const author = new Proxy(allAuthors,{
				
				has(target , key){
					let keys = Reflect.ownKeys(target).slice(0,-2)
					for(const item of keys){
						if(target[item].includes(key)){
							return true
						}
					}
					return false
				}
				
			})
			author[Symbol.iterator] = function * () {
				
				const all = this;
				const keys = Reflect.ownKeys(this).slice(0,-2)
				let values = []
				while(true){
					if(values.length){
						if(keys.length){
							values = [].concat(all[keys[0]])
							keys.shift()
							yield values.shift()
						}else{
							return false
						}
					}else{
						yield values.shift()
					}
				}
			}
			this.authors = author
		}
	}
</script>

<style>
</style>
