<?php

namespace App\Transformers;

use App\Models\User;
use League\Fractal\TransformerAbstract;

class UserTransformer extends TransformerAbstract{
    public function transform(User $user){
        return [
            'user_id'  => $user -> user_id,
            'username' => $user -> username, 
            'name'     => $user -> name,
            'email'    => $user -> email,
        ];
    }
}