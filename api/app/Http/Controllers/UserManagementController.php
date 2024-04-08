<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;

class UserManagementController extends Controller
{
    //

    //fetch active and inactive users by verified email
    function listUsers()
    {
        $users = User::all();

        $usersDTO = $users->map(fn($user) => $this->generateUserDTO($user));

        return response()->json([
            'message' => 'Usuarios obtenidos correctamente',
            'data' => $usersDTO
        ]);

    }

    function generateUserDTO(User $user)
    {
        return array_merge([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'active' => $user->active,
            'role' => $user->roles()->first()->only(['id', 'name'])
        ], $this->generateUrls($user));
    }

    function generateUrls(User $user)
    {
        if ($user->hasRole('admin')) {
            return [
                'disableURL' => null,
                'enableURL' => null,
            ];
        }
        return [
            'disableURL' => $user->active ? $this->generateDisableUserURL($user->id) : null,
            'enableURL' => !$user->active ? $this->generateEnableUserURL($user->id) : null,
        ];
    }

    function generateDisableUserURL($userID)
    {
        return URL::temporarySignedRoute('disable-user',
            now()->addMinutes(30),
            ['userID' => $userID]);
    }

    function generateEnableUserURL($userID)
    {
        return URL::temporarySignedRoute('enable-user',
            now()->addMinutes(30),
            ['userID' => $userID]);
    }


    function disableUser(int $userID)
    {
        $user = User::find($userID);
        $user->active = false;
        $user->save();

        return response()->json([
            'message' => 'Usuario desactivado correctamente'
        ]);
    }

    function enableUser(int $userID)
    {
        $user = User::find($userID);
        $user->active = true;
        $user->save();

        return response()->json([
            'message' => 'Usuario activado correctamente'
        ]);
    }

}
