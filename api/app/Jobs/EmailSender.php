<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;


/**
 * Class EmailSender
 *
 * This class is responsible for sending emails. It implements Laravel's ShouldQueue interface
 * to allow for queueing of email sending tasks, improving the responsiveness of your application.
 *
 * @package App\Jobs
 */
class EmailSender implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * @var Mailable $email
     * The Mailable instance representing the email to be sent.
     */
    private Mailable $email;

    /**
     * @var string $to
     * The recipient's email address.
     */
    private string $to;

    /**
     * EmailSender constructor.
     *
     * @param Mailable $email The Mailable instance representing the email to be sent.
     * @param string $to The recipient's email address.
     */
    public function __construct(Mailable $email, string $to)
    {
        //

        $this->email = $email;
        $this->to = $to;

    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {

        Mail::to($this->to)->send($this->email);
    }
}
