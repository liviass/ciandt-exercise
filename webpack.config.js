const path = require('path');
const htmlPlugin = require('html-webpack-plugin')
const copyPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: 'development',

    entry: './src/main.js',

    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'distdev'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/, exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            ['@babel/plugin-transform-react-jsx', {useBuiltIns: true}],
                            //['@babel/plugin-proposal-class-properties', {useBuiltIns: true}],
                            //['@babel/plugin-proposal-object-rest-spread', {useBuiltIns: true}]
                        ]
                    }
                }]
            }
        ]
    },

    plugins: [
        // Copy files to the root of the output directory.
        new copyPlugin([
            'favicon-16x16.png',
            'favicon-32x32.png',
            'favicon.ico',
            'icon-android-chrome-192x192.png',
            'icon-android-chrome-512x512.png',
            'icon-apple-touch.png',
            'icon-mstile-150x150.png',
            'icon-safari-pinned-tab.svg',
            'manifest.json',
            'msapp-config.xml'
        ], {context: 'will_package'}),

        new htmlPlugin({
            templateContent: `
                <!DOCTYPE html>
                <html xmlns="http://www.w3.org/1999/xhtml" lang="pt-BR">
                    <head>
                        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                        <meta http-equiv="Content-Language" content="pt-BR" />
                        <meta name="charset" content="UTF-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1" />

                        <link rel="apple-touch-icon" sizes="180x180" href="/icon-apple-touch.png">
                        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
                        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
                        <link rel="manifest" href="/manifest.json">
                        <link rel="mask-icon" href="/icon-safari-pinned-tab.svg" color="#ef6c00">
                        <meta name="apple-mobile-web-app-title" content="Top5 Radio">
                        <meta name="application-name" content="Top5 Radio">
                        <meta name="msapplication-TileColor" content="#da532c">
                        <meta name="theme-color" content="#ffffff">

                        <meta name="author" content="Lívia Simões" />
                        <title>Top5 Radio</title>
                    </head>
                    <body>
                        <div id="react-app"></div>
                    </body>
                </html>
            `
        })
    ]
};
