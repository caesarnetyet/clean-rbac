<?php

namespace App\Http\Controllers\Mobile;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    //

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!auth()->attempt($credentials)) {
            return response()->json(['message' => 'Credenciales incorrectas'], 401);
        }
        $user = auth()->user();

        return response()->json([
            'message' => 'Autentificación exitosa',
            "token"=>$user->createToken("phoneLoginToken", ['mobile'])->plainTextToken]);
    }

}

