<?php

namespace App\Core;

class User

{
    public function __construct(
        private readonly string $id,
        private readonly string $name,
        private readonly string $email,
        private readonly Role $role){}

    public function getRole(): Role
    {
        return $this->role;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getID(): string
    {
        return $this->id;
    }

}

