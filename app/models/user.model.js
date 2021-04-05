const sql = require('./db.js');

const User = function(user){
    this.user_id = user.user_id
    this.username = user.username;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
};

User.create = (newUser, result) => {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Successfull add user with id ", res.insertId);
        result(null, {id: res.insertId, ...newUser});
    });
};

User.getAll = result => {
    sql.query("SELECT * FROM users", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        let datas = [];
        for (let data of res){
            let temp = {
                user_id : data.user_id
            }
            datas.push(temp);
        }
        console.log("users: ", datas);
        result(null, datas);
    });
};

module.exports = User;