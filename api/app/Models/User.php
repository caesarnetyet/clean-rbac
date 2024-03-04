<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Mail\auth\EmailVerification;
use App\Mail\TwoFactorVerificationMail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Http\JsonResponse;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * @var \Illuminate\Support\HigherOrderCollectionProxy|int|mixed|null
     */
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'token',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'token' => 'encrypted',
        'password' => 'hashed',
    ];

    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class);
    }


    public function hasRole($rol): bool
    {
        if ($this->roles()->where('name', $rol)->first()) {
            return true;
        }
        return false;
    }

    public function sendEmailVerification (): void
    {
        // generar URL firmada para verificación de correo
        $signedURL = URL::temporarySignedRoute(
            'verify-email', now()->addMinutes(30), ['id' => $this->id]
        );
        $finalURL = config('app.frontend_url') . "/verify-email/?url=" . $signedURL;

        $email = new EmailVerification($finalURL);

        // enviar correo de verificación
        Mail::to($this->email)->queue($email);
    }

    public function login(): JsonResponse {
        if ($this->hasRole("admin")) {
            $signedURL = URL::temporarySignedRoute(
                'verify-two-factor', now()->addMinutes(30), ['id' => $this->id]
            );
            $this->sendTwoFactorVerification($signedURL);

            return response()->json([
                'message' => 'Verificación de doble factor requerida, revisa tu correo electrónico',
            ],403);

        } else {
            $token = $this->createToken('authToken')->plainTextToken;
            return response()->json([
                'message' => 'Inicio de sesión exitoso',
                'token' => $token
            ]);
        }
    }


    public function sendTwoFactorVerification(string $signedURL): void
    {
        // generar URL firmada para verificación de doble factor
        $finalURL = config('app.frontend_url') . "/verify-two-factor/?url=" . urlencode($signedURL);

        $this->token =  rand(1000, 9999);
        $this->save();

        $email = new TwoFactorVerificationMail($this->token, $finalURL);
        // enviar correo de verificación
        Mail::to($this->email)->queue($email);
    }

    private function assignRole($rol_id)
    {
        $this->roles()->attach($rol_id);
    }

    protected static function boot()
    {
        parent::boot();
        static::created(function ($user) {
            if (User::count() == 1) {
                $user->assignRole(1);
            } else {
                $user->assignRole(2);
            }
        });
    }
}
