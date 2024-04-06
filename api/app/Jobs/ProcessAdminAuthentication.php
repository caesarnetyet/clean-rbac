<?php

namespace App\Jobs;

use App\Mail\Admin\PhoneTokenVerification;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class ProcessAdminAuthentication implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(
        private User $user
    ){}

    public function handle(): void
    {
        $randomToken = bin2hex(random_bytes(4));
        $this->user['phone_token'] = $randomToken;
        $this->user->save();

        // email the user with the token
        Mail::to($this->user->email)->send(new PhoneTokenVerification($randomToken));
    }
}
