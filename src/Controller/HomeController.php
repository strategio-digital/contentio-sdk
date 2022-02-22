<?php
/**
 * Copyright (c) 2021 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.digital, jz@strategio.digital)
 */
declare(strict_types=1);

namespace ContentioSdk\Controller;

use ContentioSdk\Attribute\Template;
use ContentioSdk\Controller\Base\BaseController;

class HomeController extends BaseController
{
    #[Template(path: __DIR__ . '/../../view/controller/home.latte')]
    public function index(): void
    {
    }
}
