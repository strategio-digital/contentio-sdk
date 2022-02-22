<?php
/**
 * Copyright (c) 2021 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.digital, jz@strategio.digital)
 */
declare(strict_types=1);

namespace ContentioSdk\Router;

use ContentioSdk\Controller\ErrorController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Matcher\UrlMatcher;
use Symfony\Component\Routing\RequestContext;
use Symfony\Component\Routing\Route;
use Symfony\Component\Routing\RouteCollection;

abstract class BaseRouter
{
    private RouteCollection $routes;
    
    public function __construct(protected Request $request, protected RequestContext $requestContext)
    {
        $this->routes = new RouteCollection;
    }
    
    /**
     * @param string $name
     * @param string $path
     * @param array<int, string> $route
     * @param array<string, string> $params
     * @return void
     */
    public function add(string $name, string $path, array $route, array $params = []): void
    {
        $route = ['_controller' => $route[0], '_action' => $route[1]] + $params;
        $this->routes->add($name, new Route($path, $route));
    }
    
    /**
     * @return UrlMatcher
     */
    public function createRoutes(): UrlMatcher
    {
        return new UrlMatcher($this->routes, $this->requestContext);
    }
    
    /**
     * @param UrlMatcher $matcher
     * @return array<string, string>
     */
    public function matchAsController(UrlMatcher $matcher): array
    {
        try {
            $controllerData = $matcher->matchRequest($this->request);
        } catch (\Exception) {
            $controllerData = ['_controller' => ErrorController::class];
        }
        
        return $controllerData;
    }
}
