<?php

namespace App\Exceptions\Http;

use Exception;

class UserNotFoundException extends Exception
{
    //

    public function __construct()
    {
        parent::__construct('Usuario no encontrado', 404);
    }
}
