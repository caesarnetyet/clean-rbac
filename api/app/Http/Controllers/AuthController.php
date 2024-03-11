<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\URL;

class AuthController extends Controller
{

    public function login(LoginRequest $request): \Illuminate\Http\JsonResponse
    {
        Log::info("Login attempt", ["ip" => $request->ip()]);

        // validar los datos de entrada
        $validated = $request->validated();

        try {
            // intentar iniciar sesión
            if (!auth()->attempt($validated)) {
                Log::alert("Failed login attempt", ["ip" => $request->ip(), "email" => $request->email]);
                return response()->json([
                    'message' => 'Credenciales incorrectas',
                ], 401); // 401 Unauthorized
            }

        } catch (\PDOException $e) {
            Log::error("Database error", ["ip" => $request->ip(), "email" => $request->email, "error" => $e->getMessage()]);
            return response()->json([
                'message' => 'Error en el sistema',
            ], 500); // 500 Internal Server Error
        }

        // verificar si el usuario está activo
        if (!auth()->user()->email_verified_at) {
            Log::alert("Inactive user login attempt", ["ip" => $request->ip(), "email" => $request->email]);
            // enviar correo de verificación nuevamente
            auth()->user()->sendEmailVerification();

            return response()->json([
                'message' => 'Usuario inactivo o no verificado, se ha enviado un correo de verificación nuevamente',
            ], 403); // 403 Forbidden
        }
        $user = auth()->user();
        if ($user->hasRole("admin")) {
            $signature = urlencode(URL::temporarySignedRoute(
                'verify-two-factor', now()->addMinutes(30), ['id' => $user->id],
            ));
            $user->sendTwoFactorVerification($signature);

            return response()->json([
                'message' => 'Verificación de doble factor requerida, revisa tu correo electrónico',
                'signature' => $signature,
            ],302);

        } else {
            $token = $user->createToken('authToken')->plainTextToken;
            return response()->json([
                'message' => 'Inicio de sesión exitoso',
                'token' => $token
            ]);
        }
    }


    public function register(RegisterRequest $request)
    {
        // validar los datos de entrada
        $validated = $request->validated();

        try {
            // crear usuario
            $user = User::create($validated);
            $user->sendEmailVerification();
            Log::info("User registered", ["ip" => $request->ip(), "email" => $request->email]);
        } catch (\PDOException $e) {
            Log::error("Database error", ["ip" => $request->ip(), "email" => $request->email, "error" => $e->getMessage()]);
            return response()->json([
                'message' => 'Error en el sistema',
            ], 500); // 500 Internal Server Error
        }

        return response()->json([
            'message' => 'Usuario creado exitosamente, verifica tu correo electrónico',
            'user' => $user
        ]);
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        $user->tokens()->delete();
        return response()->json([
            'message' => 'Sesión cerrada exitosamente'
        ]);
    }

    public function verifyEmail($user) {
        $user = User::find($user);

        if ($user->email_verified_at) {
            return response()->json([
                'message' => 'Usuario ya verificado'
            ]);
        }

        $user->email_verified_at = now();
        $user->save();
        return response()->json([
            'message' => 'Usuario verificado exitosamente'
        ]);
    }

    public function verifyTwoFactor($user, Request $request) {
        $validated = $request->validate([
            'token' => 'required|string'
        ], [
                'token.required' => 'El token es requerido',
                'token.string' => 'El token debe ser una cadena de texto'
            ]);

        $user = User::find($user);

        if ($user->token == $validated['token']) {
            $authToken = $user->createToken('authToken')->plainTextToken;
            return response()->json([
                'message' => 'Usuario verificado exitosamente',
                'token' => $authToken
            ]);
        }

        Log::alert("Failed two factor verification attempt", ["ip" => $request->ip(), "email" => $user->email]);
        return response()->json([
            'message' => 'Token incorrecto'
        ], 403);
    }

}
