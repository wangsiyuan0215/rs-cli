// + -------------------------------------
// | _config.js 项目基本配置参数
// + -------------------------------------
// | author: Wangsiyuan @ 2016-09-27
// + -------------------------------------
'use strict';

var path = require("path"),
	config = {
		// 版本号
  		version: "0.0.2", 

  		// 动画开关
  		transition_switch: true,

  		// 应用入口
  		app_entry: path.resolve(__dirname, "../src/index.js"), 

  		// 根路径
  		root_path: path.resolve(__dirname, "../"), 

  		// js文件路径
  		js_path: path.resolve(__dirname, "../src"), 

      // test文件路径
      test_path: path.resolve(__dirname, "../test"), 

  		// 样式表路径
  		css_path: path.resolve(__dirname, "../src/assets/css"), 

  		// 图片路径
  		img_path: path.resolve(__dirname, "../src/assets/images"),

  		// 开发服务器配置，host & port
  		dev: {
			host: "http://localhost", 
			port: 3005, 
			html_path: path.resolve(__dirname, "../src/index.html")
		}, 
		
		// 打包到生产环境路径
		public: {
			output_path: path.resolve(__dirname, "../public"), 
			css_path: path.resolve(__dirname, "../public/css")
		}
	};

module.exports = config;