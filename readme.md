# contentio-sdk

_(If you read this readme on **npmjs.com**, switch to https://github.com/strategio-digital/contentio-sdk)_

## About
- Contentio-SDK is a fully extendable PHP & JS package for creating custom websites that's communicating with the
[Contentio REST API](https://github.com/strategio-digital/contentio.app).

- You can use it as "server-side-rendering (php)" AND "client-side-rendering (vue.js)" engine for your e-shop or website.

- If you don't make any changes, the SDK will render a complete e-shop that will look exactly like https://contentio.store

## Installation guide

### 1. For classic usage
**You have to clone another repository rokuc-cz**

1. `git clone git@github.com:strategio-digital/rokuc-cz.git <my-project>`
2. `rm -rf <my-project>/.git`
3. Go to second step in "For contributors" and continue.

### 2. For contributors
1. `git clone git@github.com:strategio-digital/contentio-sdk.git`
2. `./project.sh serve`
3. `./project.sh app`
4. `composer i`
5. `composer analyse`
6. `yarn && yarn dev`

### 3. After installation
- Classic project: [http://localhost:8080](http://localhost:8080)
- For contributors: [http://localhost:1337](http://localhost:1337)

## IMPORTANT NOTES FOR OUR CONTRIBUTORS

### ⚠️💥 Don't forget to `yarn publish` when you make changes in these 2 files:
```
    1. package.json
    2. yarn.lock
```

## Examples for classic usage

### 1. Adding custom config file
In `www/index.php`
```php
$container = (new Bootstrap())
    ->projectRootPath(__DIR__ . '/../')
    ->configure([
        __DIR__ . '/../vendor/strategio/contentio-sdk/config/app.neon',
        //__DIR__ . '/../config/app.neon' // <--- uncomment this
    ]);

$container->getByType(App::class)->run($container);
```

### 2. Overriding routes:

In `app/config/app.neon`
```neon
services:
    #routerFactory: Strategio\Router\RouterFactory # <--- uncomment this
```

In `app/Router/RouterFactory.php`
```php
class RouterFactory extends \ContentioSdk\Router\RouterFactory
{
    public function createRoutes(): UrlMatcher
    {
        $routes = parent::createRoutes();
       
        // uncomment this --->
        /*$this->add('article_detail', '/clanky/{slug}', [
            \Strategio\Controller\ArticleController::class, 
            'index'
        ]);*/ 
        
        return $routes;
    }
}
```

### 3. Overriding template of any action
In `app/Controller/ArticleController.php`
```php
class ArticleController extends \ContentioSdk\Controller\ArticleController
{
    #[Template(path: __DIR__ . '/../../view/controller/article.latte')]
    public function index(string $slug): void
    {
        parent::index($slug);
    }
}
```

### 4. Making async request to API
```php
public function index(string $slug): void
{
    $this->addRequest('first', 'GET', "article/show-one", [
        'json' => [
            'slug' => $slug,
        ]
    ]);
    
    $this->addRequest('second', 'GET', "article/show-one", [
        'json' => [
            'slug' => $slug,
        ]
    ]);
    
    $responses = $this->dispatchRequests('Article Detail');
    
    // first article as array -->
    $a1 = json_decode($responses['first']->getBody()->getContents(), true);
    
    // second article as array -->
    $a2 = json_decode($responses['second']->getBody()->getContents(), true);
    
    $this->template->articles = [$a1, $a2];
}
```

### 5. Creating image thumbnail
```latte
{varType ContentioSdk\Component\Thumbnail\ThumbGen $thumbGen}
{var $thumb = $thumbGen->create('<slug>/article/56/test.png', 500, null, 'SHRINK_ONLY', 80)}
<img loading="lazy" src="{$thumb->getSrc()}" width="{$thumb->getWidth()}" height="{$thumb->getHeight()}" alt="...">
```
