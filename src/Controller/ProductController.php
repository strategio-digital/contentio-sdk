<?php
/**
 * Copyright (c) 2021 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.digital, jz@strategio.digital)
 */
declare(strict_types=1);

namespace ContentioSdk\Controller;

use ContentioSdk\Attribute\Template;
use ContentioSdk\Controller\Base\BaseController;

class ProductController extends BaseController
{
    // Todo: get from API or 404
    #[Template(path: __DIR__ . '/../../view/controller/product.latte')]
    public function index(string $slug): void
    {
    }
}