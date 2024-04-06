<?php

namespace App\Http\Controllers;

use App\Core\Role;
use App\Exceptions\CredentialsException;
use App\Exceptions\Http\UserNotFoundException;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Jobs\ProcessAdminAuthentication;
use App\Jobs\ProcessModeratorAuthentication;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\URL;
use PDOException;

class AuthController extends Controller
{

    public function __construct(
        private readonly UserService $userService
    ){}

    public function login(LoginRequest $request):JsonResponse
    {
        Log::info("Login attempt", ["ip" => $request->ip()]);

        try {

            $userID = $this->userService->login($request['email'], $request['password']);

            return match ($this->userService->getUserRole($userID))
            {
                Role::Admin =>  $this->handleTwoFactorAuth($userID, "Revise instrucciones en correo electrónico"),
                Role::Coordinator => $this->handleTwoFactorAuth($userID, "Se ha enviado el token de autentificación al correo"),
                Role::Guest => $this->handleGuestAuth($userID),
            };

        } catch (CredentialsException | UserNotFoundException $e) {
            Log::alert("Failed login attempt", [
                "ip" => $request->ip(),
                "email" => $request->email,
                "error" => $e->getMessage()
                ]);
            return response()->json([
                'message' => $e->getMessage()
            ], $e->getCode()); // 403 Forbidden
        }
    }

    /**
     * @throws UserNotFoundException
     */
    private function handleGuestAuth(int $userID) {
        $token = $this->userService->generateUserToken($userID);
        return response()->json([
            'message' => 'Usuario autenticado exitosamente',
            'token' => $token
        ]);
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
        } catch (PDOException $e) {
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

    /**
     * @throws UserNotFoundException
     */
    private function handleTwoFactorAuth(int $userID, string $message)
    {
        $user = $this->userService->getUserByID($userID);

        match ($user->getRole())
        {
            // if the user is an admin or moderator, we will process the authentication in the background
            Role::Admin => ProcessAdminAuthentication::dispatch($user),
            Role::Coordinator => ProcessModeratorAuthentication::dispatch($user),
            default => null
        };

        $signature = urlencode(URL::temporarySignedRoute(
            'verify-two-factor', now()->addMinutes(30), ['id' => $userID],
        ));
        return response()->json([
            'message' => $message,
            'signature' => $signature
        ], 303);

    }

}
