<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$role): Response
    {
        $userRole = $request->user()->roles()->first()->name;

        if (!in_array($userRole, $role)) {
            return response()->json(['message' => 'No tienes permisos para acceder a este recurso.'], 403);
        }

        return $next($request);
    }
}
