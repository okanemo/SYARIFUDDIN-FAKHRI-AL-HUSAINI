# NOZOMU RESTful API
RESTful API oleh Syarifuddin Fakhri A menggunakan ExpressJS.
Testing URL endpoint yang akan digunakan dibawah menggunakan server lokal, XAMPP phpMyAdmin, dan POSTMAN.

## Requirement
- Terinstall NodeJS (dapat didownload pada <https://nodejs.org/en/download/>).
- Terinstall XAMPP (dapat didownload pada <https://www.apachefriends.org/download.html>).
- Terinstall POSTMAN (dapat menggunakan postman apapun).

## Project Setup
1. Buka XAMPP dan jalankan Apache dan MySQL.
2. Import database `./database/nozomu.sql` ke phpMyAdmin.
3. Setup configurasi database pada `./app/config/db.config.js` sesuai configurasi di phpMyAdmin Anda.
4. Buka directory folder ini pada shell favorit Anda.
5. Install modul node jalankan `npm install`.
6. Install nodemon globally jalankan `npm install -g nodemon`.

## Project Run
Untuk default port(3000) jalankan `nodemon server.js`.
Untuk custom port jalankan `PORT = {port} nodemon server.js` dengan `{port}` diisi dengan custom port Anda (tanpa kurung kurawal).

## Testing 
1. Buka POSTMAN
2. Gunakan selalu hostname `localhost` atau `127.0.0.1` dengan port yang digunakan saat di Projext Run.
3. Untuk POST request gunakan `Header: Content-Type Value: application/json`
4. Untuk URL endpoint berikutnya sebagai berikut:
    - Add User 
        Endpoint: `/api/v1/user/add`
        Input :
        ``` 
        {
            "username" : "contoh",
            "password" : "contoh123",
            "name" : "contoh",
            "email" : "contoh@email.com"
        }
        ```
        Output :
        `{"user_id": "c384cfec-69b5-4d53-84d5-5212345d274b"}`

    - Update Total Balance 
        Endpoint: `/api/v1/ib/updateTotalBalance`
        Input :
        `{"current_balance" : 100000}`
        Output :
        `{"nab": 1}`

    - Get List NAB 
        Endpoint: `/api/v1/ib/listNAB`
        Output :
        ```
        [{
            "nab": 1,
            "date": "2021-04-06 05:16:05"
        }]
        ```
        
    - Do topup 
        Endpoint: `/api/v1/ib/topup`
        Input :
        ```
        {
            "user_id" : "c384cfec-69b5-4d53-84d5-5212345d274b",
            "amount_rupiah" : 10000
        }
        ```
        Output :
        ```
        {
            "nilai_unit_hasil_topup": 10000,
            "nilai_unit_total": 10000,
            "saldo_rupiah_total": 10000
        }
        ```
    - Do withdraw 
        Endpoint: `/api/v1/ib/withdraw`
        Input :
        ```
        {
            "user_id" : "c384cfec-69b5-4d53-84d5-5212345d274b",
            "amount_rupiah" : 10000
        }
        ```
        Output :
        ```
        {
            "nilai_unit_setelah_withdraw": 5000,
            "nilai_unit_total": 5000,
            "saldo_rupiah_total": 5000
        }
        ```
        
    - Get Member 
        Endpoint dengan input kosong: `/api/v1/ib/member`
        Endpoint dengan input user_id:  `/api/v1/ib/member/{user_id}`
        Endpoint dengan input page: `/api/v1/ib/member/all/{num_page}`
        Endpoint dengan input page and limit: `/api/v1/ib/member/all/{num_page}/{num_limit}`
        Output :
        ```
        {
            "page": 0,
            "limit_data": 20,
            "total_users": 1,
            "show_user_data": 1,
            "current_nab": 1,
            "total_unit": 5000,
            "users": [
                {
                    "user_id": "c384cfec-69b5-4d53-84d5-5212345d274b",
                    "unit": 5000,
                    "rupiah": 5000
                }
            ]
        }
        ```