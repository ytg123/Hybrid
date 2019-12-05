import Vue from 'vue';

/* 
 金额数据处理
 @param value 调用过滤器时调用的文本
 */

Vue.filter('priceValid',(value) => {
	if(!value)  return '0.00';
	//文本转化 float数组
	let result =  parseFloat(value);
	//如果为integer则没有小数
	if(Number.isInteger(result))  return result;
	//有小数取2位
	return result.toFixed(2)	
})