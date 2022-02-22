<?php
/**
 * Copyright (c) 2021 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.digital, jz@strategio.digital)
 */
declare(strict_types=1);

namespace ContentioSdk\Controller;

use ContentioSdk\Attribute\Template;
use ContentioSdk\Controller\Base\BaseController;
use Symfony\Component\HttpFoundation\Response;

class ArticleController extends BaseController
{
    /**
     * @param string $slug
     * @return void
     * @throws \Exception
     */
    #[Template(path: __DIR__ . '/../../view/controller/article.latte')]
    public function index(string $slug): void
    {
        $this->addRequest('article', 'GET', "article/show-one", [
            'json' => [
                'slug' => $slug,
                'suppressLabels' => true,
                'suppressFiles' => true,
                'suppressParagraphs' => true,
                'suppressParagraphFiles' => true,
                'suppressPrevNext' => true,
                'suppressPrevNextFiles' => true,
                'prevNextByLabel' => null
            ]
        ]);
        
        $responses = $this->dispatchRequests('Article Detail');
        $response = $responses['article'];
        $contents = $response->getBody()->getContents();
        
        if ($response->getStatusCode() !== Response::HTTP_OK) {
            $this->renderError($response, $contents);
        }
        
        $this->template->article = json_decode($contents, true)['item'];
    }
}
