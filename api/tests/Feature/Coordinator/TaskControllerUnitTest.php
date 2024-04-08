<?php

namespace Tests\Feature\Coordinator;

use App\Core\Role;
use App\Models\User;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class TaskControllerUnitTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test example.
     */
    public function test_store_task()
    {
        $this->seed();

        $user = $this->getUserWithRole(3);

        $coordinator = $this->getUserWithRole(2);

        dump($user->id);


        $response = $this->actingAs($coordinator)->postJson('/api/tasks', [
            'title' => 'Tarea de prueba',
            'body' => 'Descripción de la tarea de prueba',
            'guest_id' => $user->id
        ]);

        dump($response->getContent());

        $response->assertStatus(201);

        $response = $this->actingAs($user)->get('/api/assigned-tasks');
        $response->assertStatus(200);


    }

    public function test_list_assigned_task()
    {
        $this->seed();

        $user = $this->getUserWithRole(3);

        $response = $this->actingAs($user)->get('/api/assigned-tasks');
        $response->assertStatus(200);
        dump($response->getContent());
    }

    public function getUserWithRole(int $role)
    {
        $user = User::factory()->create();
        $user->roles()->attach( $role);

        return $user;
    }


}
