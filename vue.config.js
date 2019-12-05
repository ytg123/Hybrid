const path = require('path')
module.exports = {
	devServer:{
		proxy:{
			'/user':{
				target:'http://localhost:8081',
				pathRewrite:{
					'/user':'user.json'
				}
			},
			'/list':{
				target:'http://localhost:8081',
				pathRewrite:{
					'/list':'list.json'
				}
			},
			'/proxy':{
				target:'http://localhost:8081',
				pathRewrite:{
					'/proxy':'proxy.json'
				}
			},
			'/author':{
				target:'http://localhost:8081',
				pathRewrite:{
					'/author':'author.json'
				}
			}
		}
	},
	configureWebpack: config => {
	    if (process.env.NODE_ENV === 'production') {
	      // 为生产环境修改配置...
	    } else {
	      // 为开发环境修改配置...
		  // return {
			 //  resolve:{
				//   alias:{
				// 	  '@js':path.resolve(__dirname, './src/assets/js'),
				// 	  '@css':path.resolve(__dirname, './src/assets/css'),
				// 	  '@img':path.resolve(__dirname, './src/assets/images'),
				// 	  '@c':path.resolve(__dirname, './src/components'),
				// 	  '@v':path.resolve(__dirname, './src/views')
				//   }
			 //  }
		  // }
		  
	    }
		return {
			  resolve:{
				  alias:{
					  '@js':path.resolve(__dirname, './src/assets/js'),
					  '@css':path.resolve(__dirname, './src/assets/css'),
					  '@img':path.resolve(__dirname, './src/assets/images'),
					  '@c':path.resolve(__dirname, './src/components'),
					  '@v':path.resolve(__dirname, './src/views')
				  }
			  }
		}
	  }
}