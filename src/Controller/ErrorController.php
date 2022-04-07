<?php
/**
 * Copyright (c) 2022 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.digital, jz@strategio.digital)
 */
declare(strict_types=1);

namespace ContentioSdk\Controller;

use ContentioSdk\Attribute\Template;
use Symfony\Component\HttpFoundation\Response;
use ContentioSdk\Controller\Base\BaseController;

class ErrorController extends BaseController
{
    #[Template(path: __DIR__ . '/../../view/controller/error.latte')]
    public function index(): void
    {
        $this->response->setStatusCode(Response::HTTP_NOT_FOUND);
        $this->template->error = ['code' => Response::HTTP_NOT_FOUND];
    }
}
