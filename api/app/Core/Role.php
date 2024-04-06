<?php

namespace App\Core;

enum Role: int
{
    case Admin = 1;
    case Coordinator = 2;
    case Guest = 3;
}