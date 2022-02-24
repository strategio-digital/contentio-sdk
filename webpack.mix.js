/**
 * Copyright (c) 2022 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.digital, jz@strategio.digital)
 */

const laravelMix = require('laravel-mix');
const contentioMix = require('./mix.config.js');
contentioMix(laravelMix, false);