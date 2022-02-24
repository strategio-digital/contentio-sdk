<?php
/**
 * Copyright (c) 2022 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.digital, jz@strategio.digital)
 */
declare(strict_types=1);

namespace ContentioSdk\Attribute;

use Attribute;

#[Attribute(Attribute::TARGET_METHOD)]
class Template
{
    public function __construct(public string $path)
    {
    }
}