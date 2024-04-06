<?php

namespace App\Exceptions\Http;

use Exception;

class TwoFactorAuthRequiredException extends Exception
{
    //
    public function __construct()
    {
        parent::__construct('Se necesita autentificación de dos factores', 303);
    }
}
