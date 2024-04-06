<?php

namespace App\Exceptions;

use Exception;

class RoleException extends Exception
{
    public function __construct($message = null)
    {
        parent::__construct($message ?? 'Rol no permitido', 403);
    }
}
