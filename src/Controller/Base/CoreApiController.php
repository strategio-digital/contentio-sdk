<?php
/**
 * Copyright (c) 2022 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.digital, jz@strategio.digital)
 */
declare(strict_types=1);

namespace ContentioSdk\Controller\Base;

use ContentioSdk\Component\AssetLoader;
use ContentioSdk\Component\StdTemplate;
use ContentioSdk\Component\Thumbnail\ThumbGen;
use ContentioSdk\Debugger\ApiDebugger;
use ContentioSdk\Manager\ProjectManager;
use Latte\Engine;
use Nette\Schema\Expect;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGenerator;

class CoreApiController extends BaseController
{
    public function __construct(
        protected Engine       $latte,
        protected ApiDebugger  $apiDebugger,
        protected Response     $response,
        protected AssetLoader  $assetLoader,
        protected ThumbGen     $thumbGen,
        protected UrlGenerator $urlGenerator,
        protected StdTemplate  $template,
        public Request         $request,

        protected ProjectManager  $projectManager,
    )
    {
    }
    
    public function startup(): void
    {
        $apiKey = $this->request->headers->get('Contentio-SDK-Core-Api-Key');
        if ($apiKey !== $_ENV['CORE_API_KEY']) {
            exit((new JsonResponse(['message' => 'Permissions denied (API Key is not valid).'], 401))->send());
        }
    }
    
    public function projectUpdate(): void
    {
        /** @var array{domain:string, envs: array<string, string>} $data */
        $data = $this->validate($this->getRequestJsonData(), [
            'domain' => Expect::string()->max(128)->pattern('[a-z0-9\.]+')->required(),
            'envs' => Expect::arrayOf('string', 'string')->required()
        ]);
        
        $this->projectManager->saveToFile($data['domain'], $data['envs']);
        
        $this->sendJsonResponse(['success' => "Envs successfully updated for project '{$data['domain']}'."]);
    }
}
