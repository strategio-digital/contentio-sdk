<?php
/**
 * Copyright (c) 2022 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.digital, jz@strategio.digital)
 */
declare(strict_types=1);

namespace ContentioSdk\Component\Thumbnail;

class Thumbnail
{
    protected \SplFileInfo $splFileInfo;
    
    protected string $suffix;
    
    protected string $thumbFilePath;
    
    public function __construct(protected string $path, protected ?int $width, protected ?int $height, protected string $method, protected int $quality)
    {
        $this->method = mb_strtoupper($this->method);
        
        $this->splFileInfo = new \SplFileInfo($path);
        $this->suffix = '--' . $this->method . '-' . $quality . '-' . $width . 'x' . $height;
        
        $this->thumbFilePath = $this->splFileInfo->getPath() . '/'
            . $this->splFileInfo->getBasename('.' . $this->splFileInfo->getExtension()) . $this->suffix . '.'
            . $this->splFileInfo->getExtension();
    }
    
    public function getWidth(): ?int
    {
        return $this->width;
    }
    
    public function getHeight(): ?int
    {
        return $this->height;
    }
    
    public function getSrc(): string
    {
        return $_ENV['CDN_ENDPOINT'] . $this->thumbFilePath;
    }
    
    public function getJson(): string
    {
        return (string) json_encode([
            'path' => $this->path,
            'method' => $this->method,
            'quality' => $this->quality,
            'width' => $this->width,
            'height' => $this->height,
        ]);
    }
}