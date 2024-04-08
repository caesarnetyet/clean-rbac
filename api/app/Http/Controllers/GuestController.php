<?php

namespace App\Http\Controllers;

use App\Services\GuestService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use PDOException;

class GuestController extends Controller
{
    public function __construct(
        private readonly GuestService $guestService
    ){}

    public function listAssignedTasks(Request $request)
    {
        if(!$request->user()) {
            return response()->json([
                'message' => 'No tienes permisos para realizar esta acción'
            ], 403);
        }

        try {

            $tasks = $this->guestService->listAssignedTasks($request->user());
            $tasksDTO = $tasks->map(fn($task) => $this->generateTaskDTO($task));

            return response()->json([
                'message' => 'Tareas asignadas obtenidas correctamente',
                'data' => $tasksDTO
            ]);
        } catch (PDOException $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function markAsDone(int $taskID)
    {
        try {
            $this->guestService->markAsDone($taskID);

            return response()->json([
                'message' => 'Tarea completada correctamente'
            ]);

        } catch (PDOException $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
    }

    private function generateTaskDTO($task)
    {
        return [
            'id' => $task->id,
            'title' => $task->title,
            'body' => $task->body,
            'doneAt' => $task->done_at,
            'doneURL' => $task->done_at ? null : $this->generateDoneTaskURL($task->id)
        ];
    }

    private function generateDoneTaskURL($taskID)
    {
        return URL::temporarySignedRoute('done-task',
            now()->addMinutes(30),
            ['taskID' => $taskID]
        );
    }

}
