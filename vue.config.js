const path = require('path')
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')

function resolve(dir) {
	return path.join(__dirname, dir)
}

module.exports = {
	publicPath: './',
	/**
	 * 骨架屏
	 */
	configureWebpack: {
		plugins: [
			new SkeletonWebpackPlugin({
				webpackConfig: {
					entry: {
						app: path.join(__dirname, './src/skeleton.js')
					}
				},
				minimize: true,
				quiet: true
			})
		]
	},
	/**
	 * 别名设置
	 */
	chainWebpack: (config) => {
		config.resolve.alias
			.set('@', resolve('src'))
			.set('assets', resolve('src/assets'))
			.set('base', resolve('src/base'))
			.set('components', resolve('src/components'))
			.set('conf', resolve('src/config'))
			.set('weChat', resolve('src/weChat'))
			.set('@api', resolve('src/api'))
			.set('common', resolve('src/common'))
			.set('views', resolve('src/views'))
	},
	/**
	 * 跨域设置
	 */
	devServer: {
		proxy: {
			'/api': {
				target: 'http://www.softzztiedu.top/',
				ws: true,
				changeOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		}
	}
}
