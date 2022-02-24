/**
 * Copyright (c) 2022 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.digital, jz@strategio.digital)
 */

const webpack = require('webpack');

module.exports = (mix, images = true) => {
    // Webpack config
    mix.webpackConfig({
        plugins: [
            new webpack.DefinePlugin({
                __VUE_OPTIONS_API__: true,
                __VUE_PROD_DEVTOOLS__: false,
                'process.env': {
                    APP_ENV_MODE: JSON.stringify(process.env.APP_ENV_MODE),
                    APP_TIME_ZONE: JSON.stringify(process.env.APP_TIME_ZONE),
                    API_URL_JS: JSON.stringify(process.env.API_URL_JS),
                    API_ACCESS_TOKEN: JSON.stringify(process.env.API_ACCESS_TOKEN),
                    GTM_ID: JSON.stringify(process.env.GTM_ID),
                    GTM_ENABLED: JSON.stringify(process.env.GTM_ENABLED),
                }
            }),
        ]
    })

    // Mix settings
    mix.options({publicPath: 'www/temp/static'})
    mix.browserSync({proxy: 'localhost:3000', port: 3001});
    mix.disableNotifications();

    //
    if (mix.inProduction()) {
        mix.version();
    }

    // App TS + Vue TS
    mix.ts('assets/typescript/App.ts', 'js').sourceMaps(false, 'source-map')//.vue();

    // Css
    mix.postCss('assets/css/App.css', "css", [require("tailwindcss")]);

    // Images
    mix.copyDirectory('assets/img/**/*', 'www/temp/static/img');

    // Directory hack (if you in use)
    if (images) {
        mix.copyDirectory('vendor/strategio/contentio-sdk/assets/img/**/*', 'www/temp/static/img');
    }

    return mix;
}