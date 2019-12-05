<template>
  <div class="hello">
    sdfsdf
  </div>
</template>

<script>
import axios from 'axios'	
	
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
   async mounted () {
	 const { data } = await axios.get('/user')
	 if(data && data.code === '0'){
	 	console.log(data.user)
	 }
	 // axios.get('/user').then(({data}) =>{
		//  if(data && data.code === '0'){
		// 	console.log(data.user)
		//  }
	 // })
	 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
	@import '@css/style.scss';
	.hello{
		font-size: px2rem(16);
	}
	
</style>
