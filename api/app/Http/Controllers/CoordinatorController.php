<?php

namespace App\Http\Controllers;

use App\Exceptions\RoleException;
use App\Models\Task;
use App\Services\CoordinatorService;
use Illuminate\Support\Facades\URL;
use Illuminate\Http\Request;
use PDOException;

class CoordinatorController extends Controller
{
    public function __construct(
        private readonly CoordinatorService $coordinatorService
    ){}

    public function listGuests()
    {
        $guests = $this->coordinatorService->listGuests();

        return response()->json([
            'message' => 'Usuarios obtenidos correctamente',
            'data' => $guests
            ]
        );
    }

    public function listTasks(Request $request)
    {
        $tasks = $this->coordinatorService->listTasks();

        $tasks = $tasks->map(fn($task) => $this->generateTaskDTO($task));

        return response()->json([
            'message' => 'Tareas obtenidas correctamente',
            'data' => $tasks]
        );
    }

    public function storeTask(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'body' => 'required|string',
            'guest_id' => 'required|integer'
        ],
            [
                'title.required' => 'El título es requerido',
                'body.required' => 'El cuerpo es requerido',
                'guest_id.required' => 'El invitado es requerido',
            ]
        );

        $title = $request->input('title');
        $body = $request->input('body');
        $guestID = $request->input('guest_id');

        try {
            $this->coordinatorService->createTask($title, $body, $guestID);

            return response()->json([
                'message' => 'Tarea creada correctamente'
            ], 201);

        } catch (PDOException $e ) {
            return response()->json([
                'message' => $e->getMessage()
            ], 500);

        } catch (RoleException $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 403);
        }

    }

    public function deleteTask(Request $request, int $taskID)
    {
        try {
            $this->coordinatorService->deleteTask($taskID);

            return response()->json([
                'message' => 'Tarea eliminada correctamente'
            ]);

        } catch (PDOException $e ) {
            return response()->json([
                'message' => $e->getMessage()
            ]);
        }

    }

    public function updateTask(Request $request, int $taskID)
    {
        $request->validate([
            'title' => 'string',
            'body' => 'string',
            'guest_id' => 'integer'
        ],
            [
                'title.string' => 'El titulo debe ser una cadena de texto',
                'body.string' => 'El cuerpo debe ser una cadena de texto',
                'integer' => 'El campo debe ser un número entero'
            ]
        );

        $title = $request->input('title');
        $body = $request->input('body');
        $guestID = $request->input('guest_id');

        try {
            $this->coordinatorService->updateTask($taskID, $title, $body, $guestID);

            return response()->json([
                'message' => 'Tarea actualizada correctamente'
            ]);

        } catch (PDOException $e ) {
            return response()->json([
                'message' => $e->getMessage()
            ], 500);

        } catch (RoleException $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 403);
        }
    }


    private function generateTaskDTO(Task $task): array
    {
        return [
            'id' => $task->id,
            'title' => $task->title,
            'body' => $task->body,
            'user' => $task->user,
            'doneAt' => $task->done_at,
            'deleteUrl' => $this->generateDeleteTaskURL($task->id),
            'updateUrl' => $this->generateUpdateTaskURL($task->id)
        ];
    }

    private function generateDeleteTaskURL(int $taskID): string
    {
        return URL::temporarySignedRoute(
            'delete-task',
            now()->addMinutes(30),
            ['taskID' => $taskID]
        );
    }

    private function generateUpdateTaskURL(int $taskID): string
    {
        return URL::temporarySignedRoute(
            'update-task',
            now()->addMinutes(30),
            ['taskID' => $taskID]
        );
    }

}
