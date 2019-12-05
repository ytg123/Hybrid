/**
 * 
 * 判断当前设备是否是phonex
 * 
 */
export  const isIphoneX = () => {
	if(typeof window !== 'undefined' && window){
		//window.navigator.userAgent  iphonex 及以上  屏幕垂直像素大于812
		return /iphone/gi.test(window.navigator.userAgent) && window.screen.height >= 812;
	}
	return false;
}

//赋值window下一个属性
window.inIphoneX = isIphoneX;