<?php

namespace App\Exceptions;

use Exception;

/**
 * Class CredentialsException
 *
 * This class extends the base Exception class and is used to handle exceptions
 * related to incorrect credentials. It is thrown when a user tries to authenticate
 * with invalid credentials.
 *
 * @package App\Exceptions
 */
class CredentialsException extends Exception
{
    public function __construct($message = null)
    {
        parent::__construct($message ?? 'Credenciales incorrectas', 422);
    }
}