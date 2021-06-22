<?php

use App\Http\Controllers\TeacherController;
use Illuminate\Support\Facades\Route;



Route::get('/', [TeacherController::class, 'index']);
Route::get('/teacher/all', [TeacherController::class, 'allData']);
Route::post('/teacher/store', [TeacherController::class, 'storeData']);
Route::get('/teacher/edit/{id}', [TeacherController::class, 'editData']);
Route::post('/teacher/update/{id}', [TeacherController::class, 'updateData']);
Route::post('/teacher/destroy/{id}', [TeacherController::class, 'destroyData']);
