<?php
/**
 * Copyright (c) 2022 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.digital, jz@strategio.digital)
 */
declare(strict_types=1);

namespace ContentioSdk\Helper;

class Path
{
    public static function appDir(): string
    {
        return __DIR__ . '/../../../../../app';
    }
    
    public static function assetsDir(): string
    {
        return __DIR__ . '/../../../../../assets';
    }
    
    public static function logDir(): string
    {
        return __DIR__ . '/../../../../../log';
    }
    
    public static function tempDir(): string
    {
        return __DIR__ . '/../../../../../temp';
    }
    
    public static function viewDir(): string
    {
        return __DIR__ . '/../../../../../view';
    }
    
    public static function wwwDir(): string
    {
        return __DIR__ . '/../../../../../www';
    }
    
    public static function configDir(): string
    {
        return __DIR__ . '/../../../../../config';
    }
}