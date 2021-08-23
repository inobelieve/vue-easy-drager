const path = require('path')
module.exports = {
    // entry: process.env.NODE_ENV === 'development' ? './src/main.js' : './src/directive/drag.js',
    // output: {
    //     path: path.resolve(__dirname, './test'),
    //     publicPath: '/test/',
    //     filename: 'vue-easy-drager.js', //输出文件名
    //     library: 'vue-easy-drager', // 指定的就是你使用require时的模块名
    //     libraryTarget: 'umd', // 指定输出格式， UMD 同时支持两种执行环境：node环境、浏览器环境。
    //     umdNamedDefine: true // 会对 UMD 的构建过程中的 AMD 模块进行命名。否则就使用匿名的 define
    // },
    publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
    outputDir: process.env.NODE_ENV === 'production' ? 'vue-easy-drager' : 'example',
    lintOnSave: false,
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'sass',
            patterns: [
                path.resolve(__dirname, './src/assets/styles/*.scss')      //你的.scss文件所在目录
            ]
        }
    },
    css: {
        loaderOptions: {
            scss: {
                // AdditionalData: `@import "./src/style/main.scss";`
                prependData: `@import "./src/assets/style/main.scss";`
                /*ver8.x改为prependData: `@import "./src/style/main.scss";`,运行时请去掉本注释 */
            }
        }
    }
}