var path = require('path');

module.exports = {
    devtool: 'source-map',
    mode: 'development',
    entry: './src/js/larkplayer-ui.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'larkplayer-ui.js',
        library: 'larkplayer-ui',
        libraryTarget: 'umd'
    },
    externals: {
        larkplayer: {
            commonjs: 'larkplayer',
            commonjs2: 'larkplayer',
            amd: 'larkplayer',
            root: 'larkplayer'
        }
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-env'],
                        plugins: [
                            ["babel-plugin-transform-react-jsx", {
                                "pragma": "Component.createElement"
                            }]
                        ]
                    }
                }
            }
        ]
    }
};