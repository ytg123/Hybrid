<template>
	
	<div class="activity">
		<slot></slot>
	</div>
	
</template>

<script>
</script>

<style lang="scss" scoped>
	@import  '@css/style.scss';
	
	.activity{
		max-height: px2rem(160);
		position: relative;
		z-index: 2;
	}
</style>
