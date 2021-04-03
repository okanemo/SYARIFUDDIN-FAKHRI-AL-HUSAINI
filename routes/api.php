<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('v1/ib/member', 'App\Http\Controllers\UserController@users');
