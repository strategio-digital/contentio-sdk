<?php
/**
 * Copyright (c) 2022 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.digital, jz@strategio.digital)
 */
declare(strict_types=1);

namespace ContentioSdk\Controller\Base;

interface IController
{
    public function startup(): void;
    
    public function render(string $filePath): void;
}