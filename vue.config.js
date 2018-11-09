const path = require('path');
function resolve(dir) {
	return path.join(__dirname, dir);
}

module.exports = {
	baseUrl: './',
	chainWebpack: (config) => {
		config.resolve.alias
			.set('@', resolve('src'))
			.set('assets', resolve('src/assets'))
			.set('base', resolve('src/base'))
			.set('components', resolve('src/components'))
			.set('conf', resolve('src/config'))
			.set('weChat', resolve('src/weChat'))
			.set('@api', resolve('src/api'))
			.set('common', resolve('src/common'));
	}
};
