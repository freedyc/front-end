const { resolve } = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: {
        jszip: resolve(__dirname, 'src/index.vue'),
    },
    output: {
        path: resolve(__dirname, '../src'),
        filename: '[name].js',
        libraryTarget: 'system',
    },
    module: {
        rules: [
            { 
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
    ]
}
