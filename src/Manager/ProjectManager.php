<?php

namespace ContentioSdk\Manager;

use ContentioSdk\Helper\Path;
use Symfony\Component\HttpFoundation\Request;

final class ProjectManager
{
    /**
     * @param string $domain
     * @param array<string, string> $envs
     * @return void
     */
    public function saveToFile(string $domain, array $envs): void
    {
        $filePath = __DIR__ . "/../../config/envs/{$domain}.env.php";
        $envs = file_exists($filePath) ? array_merge(require_once $filePath, $envs) : $envs;
        
        $envs = implode(PHP_EOL, array_map(fn($key, $value) => "    '{$key}' => '{$value}',", array_keys($envs), $envs));
        $string = '<?php return [' . PHP_EOL . $envs . PHP_EOL . '];';
        file_put_contents($filePath, $string);
    }
    
    /**
     * @return array<string,string>|null
     */
    public function loadDomainEnvs(): array|null
    {
        $request = Request::createFromGlobals();
        $filePath = Path::configDir() . '/envs/' . $request->getHost() . '.env.php';
        return file_exists($filePath) ? require $filePath : null;
    }
}