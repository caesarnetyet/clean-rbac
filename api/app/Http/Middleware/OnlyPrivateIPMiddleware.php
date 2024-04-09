<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\IpUtils; // Add this import


class OnlyPrivateIPMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $allowedIpRange = '10.8.0.1/24';
        if (!IpUtils::checkIp($request->ip(), $allowedIpRange)) {
            return response()->json(['message' => 'Acceso denegado'], 401);
        }

        return $next($request);
    }
}
