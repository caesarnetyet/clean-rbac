<?php

use App\Http\Controllers\CoordinatorController;
use App\Http\Controllers\GuestController;
use App\Http\Controllers\Mobile\LoginController as LGController;
use App\Http\Controllers\Mobile\MobileAuthController;
use App\Http\Controllers\UserManagementController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user()->load('roles');
});


Route::patch('/verify-email/{id}', [AuthController::class, 'verifyEmail'])
    ->name('verify-email')
    ->middleware(['signed'])
    ->where('id', '[0-9]+');

Route::patch('/verify-two-factor/{id}', [AuthController::class, 'verifyTwoFactor'])
    ->name('verify-two-factor')
    ->middleware(['signed'])
    ->where('id', '[0-9]+');

Route::post('/login', [AuthController::class, 'login']);
Route::get('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::post('/register', [AuthController::class, 'register']);

Route::prefix('mobile')->group(function () {
    Route::post('/login', [LGController::class, 'login']);
    Route::post('/verify-token', [MobileAuthController::class, 'generateToken'])->middleware(['auth:sanctum']);
});

Route::controller(GuestController::class)->group(function () {
    Route::get('/assigned-tasks', 'listAssignedTasks');
    Route::post('/done/{taskID}', 'markAsDone')->name('done-task')->middleware('signed');
})->middleware(['auth:sanctum', 'roles:coordinator']);

Route::controller(CoordinatorController::class)->group(function () {
    Route::get('/tasks', 'listTasks');
    Route::post('/tasks', 'storeTask');
    Route::get('/guests', 'listGuests');
    Route::put('/tasks/{taskID}', 'updateTask')->middleware('signed')->name('update-task');
    Route::delete('/tasks/{taskID}', 'deleteTask')->middleware('signed')->name('delete-task');
})->middleware(['auth:sanctum', 'roles:coordinator']);

Route::controller(UserManagementController::class)->group(function () {
    Route::get('/users', 'listUsers');
    Route::delete('/users/{userID}', 'disableUser')
        ->middleware('signed')->name('disable-user');
    Route::put('/users/{userID}', 'enableUser')
        ->middleware('signed')->name('enable-user');
})->middleware(['auth:sanctum', 'roles:admin']);

Route::fallback(function () {
    return response()->json(['message' => 'Not Found'], 404);
});
