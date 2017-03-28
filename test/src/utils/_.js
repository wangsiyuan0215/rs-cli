// + -------------------------------------
// | _.js constance lib
// + -------------------------------------
// | 这里存放着非常危险的不可更改的静态变量
// + -------------------------------------
// | author: Wangsiyuan @ 2016-09-27
// + -------------------------------------

const _ = {
	isDebug: process.env.NODE_ENV === 'production' ? false : true,

	// api 请求头
	urlHeader: "http://api.jianong.com/backend/index.php/api",

	// token 字符串
	tokenString: "jn-api-token",
	
	// 路由 
	routerPath : {
		root:  	"/",
		home: 	"home",
		pro : 	"pro" 
	}
};

module.exports =  _;