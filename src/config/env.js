/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * 
 */

let baseUrl = 'http://120.26.59.145:8080/micweb'; 
// let baseUrl = 'http://192.168.100.179:8080/lltrvl'; 
// let baseUrl = 'http://192.168.100.2:8089/lltrvl/'; 
const imageBaseUrl = 'http://120.26.59.145:8080/micweb'; 
// const imageBaseUrl = 'http://192.168.100.2:8089/lltrvl/'; 

const localUrl = 'http://192.168.100.24:12345/#/home'

const loginUrl = 'http://vwz.ctibet.cn:8080/micportal/login/page/login.html'


export {
	baseUrl,
	imageBaseUrl,
	localUrl,
	loginUrl,
}