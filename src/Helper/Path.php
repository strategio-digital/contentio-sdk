<?php
/**
 * Copyright (c) 2022 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.digital, jz@strategio.digital)
 */
declare(strict_types=1);

namespace ContentioSdk\Helper;

class Path
{
    private static string $projectPath;
    
    public static function setProjectPath(string $projectPath) : void
    {
        self::$projectPath = $projectPath;
    }
    
    public static function appDir(): string
    {
        return self::$projectPath . '/app';
    }
    
    public static function assetsDir(): string
    {
        return self::$projectPath . '/assets';
    }
    
    public static function logDir(): string
    {
        return self::$projectPath . '/log';
    }
    
    public static function tempDir(): string
    {
        return self::$projectPath . '/temp';
    }
    
    public static function viewDir(): string
    {
        return self::$projectPath . '/view';
    }
    
    public static function wwwDir(): string
    {
        return self::$projectPath . '/www';
    }
    
    public static function configDir(): string
    {
        return self::$projectPath . '/config';
    }
}