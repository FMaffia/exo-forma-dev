const path = require('path')
const workingDir = path.join(__dirname, '/src')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const config = require('./config.json')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UnminifiedWebpackPlugin = require('unminified-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

const context = `/${config.context}`

const alias = {
    Public: path.join(__dirname, '/src/public')
}
module.exports = (env, argv) => ({
    entry: {
        app: workingDir + '/App.js'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                // Custom common chunk
                bundle: {
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: 2
                },
                // Customer vendor
                vendors: {
                    chunks: 'all',
                    name: 'vendors',
                    test: /[\\/]node_modules[\\/]/
                }
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: path.join(__dirname, '/public/index.html'),
            template: path.join(__dirname, '/templates/index.template.html'),
            inject: 'body'
        }),

        new CleanWebpackPlugin({
            verbose: true,

            cleanOnceBeforeBuildPatterns: [path.join(process.cwd(), 'public/dist/*/'), path.join(process.cwd(), 'public/index.html')]
        }),
        new MiniCssExtractPlugin({
            filename: argv.mode === 'production' ? 'css/[name].bundle.[contenthash].min.css' : 'css/[name].bundle.[contenthash].css',
            chunkFilename: 'css/[id].[hash].css'
        }),
        new webpack.DefinePlugin({
            'process.env.CONTEXT_PATH': JSON.stringify(context)
        }),
        new UnminifiedWebpackPlugin(),
        new CompressionPlugin({ exclude: /\/*.html/ }),
        new ESLintPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(css|scss|sass)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(jpg|jpeg|gif|png|PNG|svg)$/,
                type: 'asset/resource',
                generator: {
                    outputPath: 'img/',
                    publicPath: context + '/dist/img/'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf)$/,
                type: 'asset/resource',
                generator: {
                    outputPath: 'fonts/',
                    publicPath: 'fonts/'
                }
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
        alias: alias
    },
    devtool: argv.mode === 'production' ? 'cheap-source-map' : 'eval-cheap-source-map',
    output: {
        path: path.join(__dirname, '/public/dist'),
        filename: argv.mode === 'production' ? 'js/[name].bundle.[hash].min.js' : 'js/[name].bundle.[hash].js',
        chunkFilename: 'js/[id].[hash].js',
        crossOriginLoading: 'anonymous',
        publicPath: context + '/dist/'
    }
})
