<?php
/**
 * Copyright (c) 2022 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.digital, jz@strategio.digital)
 */
declare(strict_types=1);

namespace ContentioSdk;

use ContentioSdk\Attribute\Template;
use ContentioSdk\Controller\Base\IController;
use ContentioSdk\Router\RouterFactory;
use Nette\DI\Container;

class App
{
    public function run(Container $container): never
    {
        /** @var RouterFactory $router */
        $router = $container->getByName('routerFactory');
        $controllerData = $router->matchAsController($router->createRoutes());
        
        // Get controller data
        $action = $controllerData['_action'] ?? 'index';
        $params = array_filter($controllerData, fn($key) => $key[0] !== '_', ARRAY_FILTER_USE_KEY);
        
        // Create controller instance
        /** @var IController $controller */
        $controller = $container->createInstance($controllerData['_controller']);
        
        // Execute startup method
        $controller->startup();
        
        // Execute action with router params
        $controller->$action(...$params);
        
        // Read action Attributes
        $reflection = new \ReflectionClass($controller);
        $attrs = $reflection->getMethod($action)->getAttributes(Template::class);
        $attrArgs = array_map(fn($attribute) => $attribute->getArguments(), $attrs);
        $attrArgs = reset($attrArgs);
        
        // Execute render if action Attribute #[Template] exists
        if ($attrArgs && array_key_exists('path', $attrArgs)) {
            $controller->render($attrArgs['path']);
        }
        
        // Send response to browser
        $controller->sendResponse();
    }
}