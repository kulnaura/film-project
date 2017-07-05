let path = require('path');
let LiveReloadPlugin = require('webpack-livereload-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
const prod = process.argv.indexOf('-prod') !== -1;
const webpack = require('webpack');

const config = {};

config.plugins = config.plugins||[];
if (prod) {
    config.plugins.push(new webpack.DefinePlugin({
        'process.env.NODE_ENV': `"production"`
    }));
} else {
    config.plugins.push(new webpack.DefinePlugin({
        'process.env.NODE_ENV': `"dev"`
    }));
}

module.exports = {
    // devtool: 'eval',
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/',
    },
    context: __dirname,
    resolve: {
        extensions: ['.js', '.jsx', '.json', '*']
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
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
        new webpack.DefinePlugin({
            // ENV: process.ENV === 'dev' ? require('./dev-config-path')) : require('./prod-config-path')
            'process.env.API_URL': process.env.NODE_ENV === 'dev' ? `"localhost:8001"` : `"https://film-api-go.herokuapp.com/"`,
            'process.env.COSMIC_BUCKET': JSON.stringify(process.env.COSMIC_BUCKET),
            'process.env.COSMIC_READ_KEY': JSON.stringify(process.env.COSMIC_READ_KEY),
            'process.env.COSMIC_WRITE_KEY': JSON.stringify(process.env.COSMIC_WRITE_KEY)
        }),
        new LiveReloadPlugin({appendScriptTag: true})
    ]
};
