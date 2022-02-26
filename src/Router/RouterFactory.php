<?php
/**
 * Copyright (c) 2022 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.digital, jz@strategio.digital)
 */
declare(strict_types=1);

namespace ContentioSdk\Router;

use ContentioSdk\Controller\ArticleController;
use ContentioSdk\Controller\CartController;
use ContentioSdk\Controller\CategoryController;
use ContentioSdk\Controller\ContactController;
use ContentioSdk\Controller\CustomerController;
use ContentioSdk\Controller\HomeController;
use ContentioSdk\Controller\ProductController;
use Symfony\Component\Routing\Matcher\UrlMatcher;

class RouterFactory extends BaseRouter
{
    public function createRoutes(): UrlMatcher
    {
        $this->add('home', '/', [HomeController::class, 'index']);
        $this->add('contact', '/kontakty', [ContactController::class, 'index']);
        $this->add('cart', '/kosik', [CartController::class, 'index']);

        $this->add('category', '/kategorie/{slug}', [CategoryController::class, 'index']);
        $this->add('product_detail', '/produkty/{slug}', [ProductController::class, 'index']);
        $this->add('article_detail', '/clanky/{slug}', [ArticleController::class, 'index']);
        
        $this->add('customer_logout', '/zakaznik/odhlaseni', [CustomerController::class, 'logout']);
        $this->add('customer_login', '/zakaznik/prihlaseni', [CustomerController::class, 'login']);
        $this->add('customer_register', '/zakaznik/registrace', [CustomerController::class, 'register']);
        $this->add('customer_recovery', '/zakaznik/zapomenute-heslo', [CustomerController::class, 'passwordRecovery']);
        $this->add('customer_orders', '/zakaznik/objednavky', [CustomerController::class, 'orders']);
        
        return parent::createRoutes();
    }
}
