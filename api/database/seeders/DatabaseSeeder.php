<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        User::factory()->create([
            'name' => 'Second User',
            'email' => 'second@example.com',
        ]);

        User::factory()->create([
            'name' => 'Player 1',
            'email' => 'player1@example.com',
        ]);

        User::factory()->create([
            'name' => 'Player 2',
            'email' => 'player2@example.com',
        ]);
    }
}
