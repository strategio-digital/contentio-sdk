/**
 * Copyright (c) 2022 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.digital, jz@strategio.digital)
 */

const webpack = require("webpack");

module.exports = (mix, images = true) => {
    // Webpack config
    mix.webpackConfig({
        plugins: [
            new webpack.DefinePlugin({
                __VUE_OPTIONS_API__: true,
                __VUE_PROD_DEVTOOLS__: false
            }),
        ],
    });

    // Mix settings
    mix.options({publicPath: "www/temp/static"});
    //mix.browserSync({proxy: 'localhost:3000', port: 3001});
    mix.disableNotifications();

    if (mix.inProduction()) {
        mix.version();
    }

    // JS in <head>
    mix.ts("assets/typescript/Head.ts", "js").sourceMaps(false, "source-map");

    // App TS + Vue TS
    mix.ts("assets/typescript/App.ts", "js").sourceMaps(false, "source-map").vue();

    // Scss & Css
    mix
        .sass("assets/scss/App.scss", "www/temp/static/css")
        .postCss("assets/css/App.css", "css", [require("tailwindcss")]);

    // Images
    mix.copyDirectory("assets/img/**/*", "www/temp/static/img");

    // Directory hack
    if (images) {
        mix.copyDirectory(
            "vendor/strategio/contentio-sdk/assets/img/**/*",
            "www/temp/static/img"
        );
    }

    return mix;
};
