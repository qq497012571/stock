<?php

declare(strict_types=1);

namespace App\Middleware;

use App\Constant\RedisKey;
use App\Model\User;
use Hyperf\HttpServer\Contract\RequestInterface;
use Hyperf\HttpServer\Contract\ResponseInterface as HttpResponse;
use Hyperf\Redis\RedisFactory;
use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;

class HttpAuthMiddleware implements MiddlewareInterface
{
    /**
     * @var ContainerInterface
     */
    protected $container;

    /**
     * @var RequestInterface
     */
    protected $request;

    /**
     * @var HttpResponse
     */
    protected $response;

    public function __construct(ContainerInterface $container, HttpResponse $response, RequestInterface $request)
    {
        $this->container = $container;
        $this->response = $response;
        $this->request = $request;
    }

    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $token = $this->request->header('x-auth-token');
        if (!$this->isAuth($token)) {
            return $this->response->redirect('/user/login');
        }

        return $handler->handle($request);
    }

    public function isAuth($token)
    {
        $redis = make(RedisFactory::class)->get('default');
        if (!$redis->get(RedisKey::ACCESS_TOKEN_KEY . $token)) {
            return false;
        }
        return true;
    }
}