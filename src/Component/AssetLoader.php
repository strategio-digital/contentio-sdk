<?php
/**
 * Copyright (c) 2021 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.digital, jz@strategio.digital)
 */
declare(strict_types=1);

namespace ContentioSdk\Component;

use ContentioSdk\Helper\Path;

class AssetLoader
{
    const PUBLIC_PATH = '/temp/static';
    
    /**
     * @var array<string, string>
     */
    protected array $content = [];
    
    public function __construct()
    {
        $content = file_get_contents(Path::wwwDir() . '/temp/static/mix-manifest.json') ?: '';
        $this->content = json_decode($content, TRUE);
    }
    
    public function get(string $fileName): string
    {
        if (!file_exists(Path::wwwDir() . '/temp/static' . $fileName)) {
            throw new \Exception("Asset file '" . self::PUBLIC_PATH . $fileName . "' not found.");
        }
        
        return self::PUBLIC_PATH . $this->content[$fileName];
    }
}
