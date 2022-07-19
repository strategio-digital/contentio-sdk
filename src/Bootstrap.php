<?php
/**
 * Copyright (c) 2022 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.digital, jz@strategio.digital)
 */
declare(strict_types=1);

namespace ContentioSdk;

use ContentioSdk\Component\StdTemplate;
use ContentioSdk\Debugger\ApiDebugger;
use ContentioSdk\Helper\Domain;
use ContentioSdk\Helper\Path;
use ContentioSdk\Manager\ProjectManager;
use Latte\Bridges\Tracy\LattePanel;
use Latte\Engine;
use Nette\Bridges\DITracy\ContainerPanel;
use Nette\DI\Container;
use Nette\DI\ContainerLoader;
use Symfony\Component\Dotenv\Dotenv;
use Symfony\Component\HttpFoundation\Response;
use Tracy\Debugger;

class Bootstrap
{
    public function projectRootPath(string $rootPath = __DIR__ . '/../../../../') : Bootstrap
    {
        /** @var string $realPath */
        $realPath = realpath($rootPath);
        Path::setProjectPath($realPath);
        return $this;
    }
    
    /**
     * @param array<string> $configPaths
     * @return Container
     */
    public function configure(array $configPaths): Container
    {
        // Load .env
        $_ENV = array_merge(getenv(), $_ENV);
        $envPath = Path::viewDir() . '/../.env';
        if (file_exists($envPath)) {
            $dotenv = new Dotenv();
            $dotenv->loadEnv($envPath);
        }
        
        // Load project envs
        $pm = new ProjectManager;
        $envs = $pm->loadDomainEnvs();
        
        if (!$envs) {
            require_once Path::wwwDir() . '/project-404.php';
        } else {
            $_ENV = array_merge($_ENV, $envs);
        }
        
        // Setup debugger
        Debugger::enable($_ENV['APP_ENV_MODE'] === 'develop' ? Debugger::DEVELOPMENT : Debugger::PRODUCTION, Path::logDir());
        Debugger::$strictMode = E_ALL;
        
        // Setup DI container
        $loader = new ContainerLoader(Path::tempDir() . '/di', $_ENV['APP_ENV_MODE'] === 'develop');
        $class = $loader->load(function ($compiler) use ($configPaths) {
            foreach ($configPaths as $configPath) {
                $compiler->loadConfig(realpath($configPath));
            }
        });
        
        /** @var Container $container */
        $container = new $class;
        
        $container->addService('projectManager', $pm);
    
        /** @var ApiDebugger $apiDebugger */
        $apiDebugger = $container->getByType(ApiDebugger::class);
        
        /** @var Engine $latte */
        $latte = $container->getByType(Engine::class);
        $latte->setTempDirectory(Path::tempDir() . '/latte');
        
        Debugger::getBar()->addPanel(new ContainerPanel($container));
        Debugger::getBar()->addPanel(new LattePanel($latte));
        Debugger::getBar()->addPanel($apiDebugger);
        
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
    
        /** @var StdTemplate $template */
        $template = $container->getByType(StdTemplate::class);
        $template->envs = (string)json_encode([
            'APP_ENV_MODE' => $_ENV['APP_ENV_MODE'],
            'APP_TIME_ZONE' => $_ENV['APP_TIME_ZONE'],
            'API_URL_JS' => $_ENV['API_URL_JS'],
            'GTM_ID' => $_ENV['GTM_ID'],
            'GTM_ENABLED' => $_ENV['GTM_ENABLED'],
            'CDN_ENDPOINT' => $_ENV['CDN_ENDPOINT'],
        ]);
        
        return $container;
    }
}