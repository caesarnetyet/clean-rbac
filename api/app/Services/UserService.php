<?php

namespace App\Services;

use App\Core\Role;
use App\Exceptions\CredentialsException;
use App\Exceptions\Http\UserNotFoundException;
use App\Jobs\ProcessAdminAuthentication;
use App\Jobs\ProcessModeratorAuthentication;
use App\Mail\auth\EmailVerification;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\URL;
use Log;
use Mail;

class UserService
{
    public function __construct(){}

    /**
     * This method is used to authenticate a user based on their email and password.
     * If the user is found and the password is verified, the method will dispatch a job to process the authentication
     * in the background if the user is an admin or a moderator. The method will return an array containing the user's id and role.
     *
     * @param string $email The email of the user trying to log in.
     * @returns string The user's id.
     * @throws CredentialsException Thrown when the user is not found or the password is not verified.
     */
    public function login(string $email, string $password): int
    {
        $user = User::where('email', $email)->first();

        if (!$user || !password_verify($password, $user->password)) throw new CredentialsException();

        if (!$user->email_verified_at) {
            $this->sendEmailVerification($user->id);
            throw new CredentialsException('El usuario no ha sido verificado, 
            por favor revise su correo electrónico.');
        }

        return $user->id;
    }

    /**
     * @throws UserNotFoundException
     */
    public function generateUserToken(int $userID): string
    {
        return$this->getUserByID($userID)
            ->createToken('UserServiceToken')
            ->plainTextToken;
    }


    /**
     * @throws UserNotFoundException
     */
    public function getUserRole(int $userID): Role
    {
        return $this->getUserByID($userID)->getRole();
    }

    public function sendEmailVerification(int $userID): void
    {
        try {
            $user = $this->getUserByID($userID);
            $signedURL = URL::temporarySignedRoute(
                'verify-email', now()->addMinutes(30), ['id' => $user->id]
            );
            Mail::to($user->email)->queue(new EmailVerification($signedURL));
        } catch (UserNotFoundException $e) {
            Log::error("Send Email Verification failed:", [
                "error" => $e->getMessage(),
                "id" => $userID
            ]);
        }

    }



    /**
     * @throws UserNotFoundException
     */
    public function getUserByID(int $userID): User
    {
        $user = User::find($userID);

        if (!$user) throw new UserNotFoundException();

        return $user;
    }

}