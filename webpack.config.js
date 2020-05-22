const path = require('path');

module.exports = {
    mode: 'none',
    entry: './server.js',
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, 'app'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
        ],
    }
};