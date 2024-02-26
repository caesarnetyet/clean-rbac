<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Log;
use Laravel\Sanctum\HasApiTokens;
use PDOException;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

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
        'password' => 'hashed',
        'token' => 'encrypted'
    ];


    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class);
    }


    public function assignRole($roleId): void
    {
        try {
            $this->roles()->attach($roleId);
        } catch (PDOException $e) {
            Log::error("Error asignando rol:" . $e->getMessage());
        }
    }

    protected static function boot(): void
    {
        parent::boot();

        static::creating(function ($user) {
            if (User::count() === 0) {
                $user->assignRole(1);
            } else {
                $user->assignRole(2);
            }

        });
    }

}
