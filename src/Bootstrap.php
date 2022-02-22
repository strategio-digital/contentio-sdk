<?php
/**
 * Copyright (c) 2022 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.digital, jz@strategio.digital)
 */
declare(strict_types=1);

namespace ContentioSdk;

use ContentioSdk\Debugger\ApiDebugger;
use ContentioSdk\Helper\Path;
use Latte\Engine;
use Nette\DI\Container;
use Nette\DI\ContainerLoader;
use Symfony\Component\Dotenv\Dotenv;
use Symfony\Component\HttpFoundation\Response;
use Tracy\Debugger;

class Bootstrap
{
    public function configure(array $configPaths): Container
    {
        // Load env
        $dotenv = new Dotenv();
        $dotenv->load(Path::viewDir() . '/../.env');
        
        // Setup debugger
        Debugger::enable($_ENV['APP_ENV_MODE'] === 'develop' ? Debugger::DEVELOPMENT : Debugger::PRODUCTION, Path::logDir());
        
        // Setup DI container
        $loader = new ContainerLoader(Path::tempDir() . '/di', $_ENV['APP_ENV_MODE'] === 'develop');
        $class = $loader->load(function ($compiler) use ($configPaths) {
            foreach ($configPaths as $configPath) {
                $compiler->loadConfig($configPath);
            }
        });
        
        /** @var Container $container */
        $container = new $class;
        
        // Append DebugBar
        /** @var ApiDebugger $apiDebugger */
        $apiDebugger = $container->getByType(ApiDebugger::class);
        Debugger::getBar()->addPanel($apiDebugger);
        
        // Setup Latte
        /** @var Engine $latte */
        $latte = $container->getByType(Engine::class);
        $latte->setTempDirectory(Path::tempDir() . '/latte');
    
        // Secure HttpResponse
        /** @var Response $response */
        $response = $container->getByType(Response::class);
        $response->headers->add([
            //'Content-Security-Policy' => "default-src 'nonce-'",
            'Referrer-Policy' => 'strict-origin-when-cross-origin',
            'Permissions-Policy' => 'geolocation=(), microphone=()',
            'X-Frame-Options' => 'SAMEORIGIN',
            'X-Xss-Protection' => '1; mode=block',
            'X-Content-Type-Options' => 'nosniff',
        ]);
        
        return $container;
    }
}