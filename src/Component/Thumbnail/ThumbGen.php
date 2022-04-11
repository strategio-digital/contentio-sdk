<?php
/**
 * Copyright (c) 2022 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.digital, jz@strategio.digital)
 */
declare(strict_types=1);

namespace ContentioSdk\Component\Thumbnail;

class ThumbGen
{
    public function create(string $path,?int $width = null, ?int $height = null, string $method = 'EXACT', int $quality = 80) : Thumbnail
    {
        return new Thumbnail($path, $width, $height, $method, $quality);
    }
}