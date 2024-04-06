<?php

namespace App\Http\Controllers\Mobile;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MobileAuthController extends Controller
{
    //

    public function generateToken(Request $request)
    {
        $user = $request->user();


        if (!$user->tokenCan('mobile')) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }


        $phoneToken = $request['phoneToken'];

        if ($phoneToken !== $user["phone_token"]) {
            return response()->json(['error' => 'Token Invalido'], 401);
        }

        $randomToken = bin2hex(random_bytes(4));

        $user->token = $randomToken;
        $user->save();

        return response()->json(['message' => 'Codigo generado exitosamente','token' => $randomToken]);
    }
}
