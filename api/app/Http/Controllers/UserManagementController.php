<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserManagementController extends Controller
{
    //

    //fetch active and inactive users by verified email
    public function fetchUsers(Request $request)
    {
        $activeUsers = User::where('email_verified_at', '!=', null)->get();
        $inactiveUsers = User::where('email_verified_at', '=', null)->get();

        $users = [
            'active' => $activeUsers,
            'inactive' => $inactiveUsers
        ];

        return response()->json(['data' => $users]);
    }

}
