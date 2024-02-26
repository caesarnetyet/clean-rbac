<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{

    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (auth()->attempt($validated)) {
            $token = auth()->user()->createToken('authToken')->accessToken;
            return response(['token' => $token], 200);
        }
        return response(['error' => 'Invalid Credentials'], 401);

    }

    public function register()
    {
        $data = request()->validate([
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required'
        ]);
        $user = User::create($data);

        ProcessVerificationEmail::dispatch($user);

        return response([
            'message' => 'User created successfully',
        ], 201);
    }

}
