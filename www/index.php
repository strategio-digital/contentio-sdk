<?php
/**
 * Copyright (c) 2022 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.digital, jz@strategio.digital)
 */
declare(strict_types=1);

require_once __DIR__ . '/../vendor/autoload.php';

use ContentioSdk\App;
use ContentioSdk\Bootstrap;

$container = (new Bootstrap())
    ->projectRootPath(__DIR__ . '/../')
    ->configure([__DIR__ . '/../config/app.neon']);

$container->getByType(App::class)->run($container);