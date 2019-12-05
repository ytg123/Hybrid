/* 定义最大的fontsize */
const MAX_FONT_SIZE = 42;

/* 监听 html 文档被解析完成的事件 */

document.addEventListener('DOMContentLoaded',() => {
	
	/* 获取html */
	const html = document.querySelector('html');
	/* 获取根元素 fontsize标椎  屏幕宽度 / 10 */
	let fontSize = window.innerWidth / 10;
	/* 获取到的fontSize不允许超过定义的最大值 */
	fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize;
	/* 定义根元素fontsize的大小 */
	html.style.fontSize = fontSize +'px';
	
})