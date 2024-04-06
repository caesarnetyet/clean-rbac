<?php

namespace App\Services;

use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use PDOException;

class GuestService
{
    public function listAssignedTasks(User $user): Collection
    {
        return $user->tasks->only(['id', 'title', 'body', 'done_at']);
    }

    public function markAsDone($taskID): void
    {
        try {
            $task = Task::findOrFail($taskID);
            $task->done();
        } catch (PDOException $e) {
            throw new PDOException("Problemas al intentar marcar la tarea como completada");
        }
    }
}
