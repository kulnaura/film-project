let path = require('path');
let LiveReloadPlugin = require('webpack-livereload-plugin');
const prod = process.argv.indexOf('-p') !== -1;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');

const config = {};
var env;

config.plugins = config.plugins||[];
if (prod) {
    env = "production";
} else {
    env = "dev";
}

module.exports = {
    // devtool: 'eval',
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    context: __dirname,
    resolve: {
        extensions: ['.js', '.jsx', '.json', '*']
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components|dist|public|build)/,
                loaders: 'babel-loader',
                options: {
                    presets: ['react', 'es2015', 'stage-0']
                },
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.css$/,
                // loader: ExtractTextPlugin.extract('css!sass'),
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ],
    },
    plugins: [
        new InterpolateHtmlPlugin({
            PUBLIC_URL: ''
        }),
        new webpack.DefinePlugin({
            'process.env.API_URL': env === 'dev' ? `"//localhost:8001/"` : `"//film-api-go.herokuapp.com/"`,
        }),
        new LiveReloadPlugin({appendScriptTag: true}),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            inject: 'body'
        })
    ]
};
