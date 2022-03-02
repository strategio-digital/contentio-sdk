<?php
/**
 * Copyright (c) 2022 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.digital, jz@strategio.digital)
 */
declare(strict_types=1);

namespace ContentioSdk\Controller\Base;

use ContentioSdk\Component\AssetLoader;
use ContentioSdk\Debugger\ApiDebugger;
use ContentioSdk\Helper\Path;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Promise\PromiseInterface;
use GuzzleHttp\Promise\Utils;
use Latte\Engine;
use Psr\Http\Message\ResponseInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

abstract class BaseController implements IController
{
    private const UBT = 'user_bearer_token';
    
    /** @var array<string, PromiseInterface> */
    private array $requestPool = [];
    
    private string|null $userToken;
    
    private Client $client;
    
    protected \stdClass $template;
    
    public function __construct(
        protected Engine      $latte,
        protected ApiDebugger $apiDebugger,
        protected Response    $response,
        protected AssetLoader $assetLoader,
        public Request        $request,
    )
    {
        $this->userToken = (string)$this->request->cookies->get(self::UBT) ?: null;
        
        $apiHeaders = [
            'Content-Type' => 'application/json',
            'Accept' => 'application/json',
            'Api-Access-Token' => $_ENV['API_ACCESS_TOKEN'],
        ];
        
        if ($this->userToken()) {
            $apiHeaders = array_merge($apiHeaders, ['Authorization' => 'Bearer ' . $this->userToken()]);
            if (!$this->userLogged()) {
                $this->userLogout();
            }
        }
        
        $this->client = new Client(['base_uri' => $_ENV['API_URL_PHP'], 'headers' => $apiHeaders]);
        
        $this->template = new \stdClass;
        $this->template->assets = $assetLoader;
        $this->template->controller = $this;
    }
    
    public function startup(): void
    {
    
    }
    
    public function link(string $url): string
    {
        return $url;
    }
    
    public function userLogged(): bool
    {
        // TODO: check expiration
        return $this->userToken !== null;
    }
    
    protected function userToken(): string|null
    {
        return $this->userToken;
    }
    
    protected function userLogout(): never
    {
        $this->response->headers->clearCookie(self::UBT);
        $this->redirect('/?logout=true');
    }
    
    protected function redirect(string $url, int $status = Response::HTTP_FOUND): never
    {
        $this->response->headers->set('Location', $url);
        $this->response->setStatusCode($status);
        $this->response->send();
        exit;
    }
    
    /**
     * @param string $requestKey
     * @param string $method
     * @param string $uri
     * @param array<string,mixed> $options
     * @return void
     * @throws \Exception
     */
    protected function addRequest(string $requestKey, string $method, string $uri, array $options = []): void
    {
        if (array_key_exists($requestKey, $this->requestPool)) {
            throw new \Exception("Request key '{$requestKey}' already exists in RequestPool.");
        }
        
        $promise = $this->client->requestAsync($method, $uri, $options);
        $this->apiDebugger->addRequestKey($requestKey);
        $this->requestPool[$requestKey] = $promise;
    }
    
    /**
     * @return array<string, ResponseInterface>
     * @throws ClientException
     */
    protected function dispatchRequests(string $poolName): array
    {
        $this->apiDebugger->start($poolName);
        $responses = Utils::settle($this->requestPool)->wait();
        $this->apiDebugger->stop();
        
        $result = [];
        
        /** @var string $key */
        foreach ($responses as $key => $response) {
            if (array_key_exists('reason', $response)) {
                /** @var ClientException $errorResponse */
                $errorResponse = $response['reason'];
                $result[$key] = $errorResponse->getResponse();
                if (!in_array($errorResponse->getResponse()->getStatusCode(), [200, 404])) {
                    throw $errorResponse;
                }
            } else {
                /** @var ResponseInterface $value */
                $value = $response['value'];
                $result[$key] = $value;
            }
        }
        
        $this->requestPool = [];
        
        return $result;
    }
    
    public function renderError(ResponseInterface $response, string $message): void
    {
        $this->template->error = [
            'code' => $response->getStatusCode(),
            'message' => $response->getReasonPhrase() . ': ' . $message
        ];
        
        $html = $this->latte->renderToString(Path::viewDir() . '/controller/error.latte', $this->template);
        $this->response->setStatusCode($response->getStatusCode());
        $this->response->setContent($html);
    }
    
    /**
     * @param string $filePath
     * @return void
     * @internal
     */
    public function render(string $filePath): void
    {
        $html = $this->latte->renderToString($filePath, $this->template);
        $this->response->setStatusCode(Response::HTTP_OK);
        $this->response->setContent($html);
    }
}
