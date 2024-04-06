<?php

namespace App\Services;

use App\Core\Role;
use App\Models\User;
use App\Exceptions\RoleException;
use App\Models\Task;
use DB;
use Illuminate\Database\Eloquent\Collection;
use Log;
use PDOException;

class CoordinatorService
{
    /**
     * @throws RoleException | PDOException
     */
    public function createTask($title, $body, $guestID): void
    {
        $this->validateGuest($guestID);
        try {
            Task::create(
                [
                    'title' => $title,
                    'body' => $body,
                    'user_id' => $guestID
                ]
            );
        } catch (PDOException $e) {
            Log::error("Error creating task: ". $e->getMessage());
            throw new PDOException("Problemas al intentar crear la tarea");
        }
    }

    /**
     * @throws RoleException | PDOException
     */
    public function updateTask($taskID, $title = null, $body = null, $guestID= null): void
    {
        if ($guestID) {
            $this->validateGuest($guestID);
        }

        try {
            DB::beginTransaction();
            $task = Task::findOrFail($taskID);
            $filteredFields = array_filter([
                'title' => $title,
                'body' => $body,
                'guest_id' => $guestID
            ]);

            $task->update($filteredFields);
            DB::commit();
        } catch (PDOException $e) {
            DB::rollBack();
            Log::error("Error updating task: ". $e->getMessage());
            // log the error
            throw new PDOException("Problemas al intentar actualizar la tarea");
        }
    }

    public function listTasks() : Collection
    {
        return Task::all();
    }


    /**
     * Deletes a task from the database.
     *
     * This method begins a database transaction, finds the task by its ID, deletes it, and then commits the transaction.
     * If an error occurs during this process, it rolls back the transaction, logs the error, and throws a PDOException.
     *
     * @param int $taskID The ID of the task to delete.
     * @throws PDOException If there is an error during the database operation.
     */
    public function deleteTask(int $taskID) : void
    {
        try {
            DB::beginTransaction();
            $task = Task::findOrFail($taskID);
            $task->delete();
            DB::commit();
        } catch (PDOException $e) {
            DB::rollBack();
            Log::error("Error deleting task: ". $e->getMessage());
            // log the error
            throw new PDOException("Problemas al intentar eliminar la tarea");
        }
    }

    public function listGuests(): Collection
    {
        return User::whereHas('roles', fn($query) =>
        $query->where('id', Role::Guest)
        )->get('id', 'name', 'email');
    }

    /**
     * @throws RoleException | PDOException
     */
    private function validateGuest($guestID): void
    {
        try {
            $guest = User::findOrFail($guestID);
            if ($guest->roles()->where('role_id', Role::Guest)->count() === 0){
                throw new RoleException("Rol no permitido");
            }

        } catch (PDOException $e) {
            Log::error("Error validating guest: ". $e->getMessage());
            throw new PDOException("Problemas en el sistema");
        }
    }

}
