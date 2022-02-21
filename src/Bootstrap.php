<?php
/**
 * Copyright (c) 2021 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.digital, jz@strategio.digital)
 */
declare(strict_types=1);

namespace ContentioSdk;

use ContentioSdk\Controller\AbstractController;
use ContentioSdk\Debugger\ApiDebugger;
use ContentioSdk\Helper\Path;
use Latte\Engine;
use Strategio\Router\RouterFactory;
use Symfony\Component\Dotenv\Dotenv;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\RequestContext;
use Tracy\Debugger;

class Bootstrap
{
    public function run(): void
    {
        $dotenv = new Dotenv();
        $dotenv->load(Path::viewDir() . '/../.env');
        
        Debugger::enable($_ENV['APP_ENV_MODE'] === 'develop' ? Debugger::DEVELOPMENT : Debugger::PRODUCTION, Path::logDir());
        
        $apiDebugger = new ApiDebugger();
        Debugger::getBar()->addPanel($apiDebugger);
        
        $latte = new Engine();
        $latte->setTempDirectory(Path::tempDir() . '/latte');
        
        $request = Request::createFromGlobals();
        $response = new Response(null, Response::HTTP_OK, [
            //'Content-Security-Policy' => "default-src 'nonce-'",
            'Referrer-Policy' => 'strict-origin-when-cross-origin',
            'Permissions-Policy' => 'geolocation=(), microphone=()',
            'X-Frame-Options' => 'SAMEORIGIN',
            'X-Xss-Protection' => '1; mode=block',
            'X-Content-Type-Options' => 'nosniff',
        ]);
        
        $router = new RouterFactory($request, (new RequestContext)->fromRequest($request));
        $controllerData = $router->matchAsController($router->createRoutes());
        
        $action = $controllerData['_action'] ?? 'index';
        $attributes = array_filter($controllerData, fn($key) => $key[0] !== '_', ARRAY_FILTER_USE_KEY);
        
        /** @var AbstractController $controller */
        $controller = new $controllerData['_controller']($request, $response, $latte, $apiDebugger);
        $controller->startup();
        $controller->$action(...$attributes);
    }
}