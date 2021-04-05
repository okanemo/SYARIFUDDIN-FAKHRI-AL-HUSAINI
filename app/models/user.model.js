const sql = require('./db.js');
const UserUnit = require("./userUnit.model.js");

const User = function(user){
    this.user_id = user.user_id
    this.username = user.username;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
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
        console.log("Users: ", datas);
        result(null, datas);
    });
};

User.create = (newUser, newUserUnit, result) => {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        UserUnit.create(newUser, newUserUnit, (err_create, res_create) => {
            if (err_create) {
                User.remove(newUser.user_id, (err_del, res_del) =>{
                    if (err_del) {
                        console.log("error: ", err_del);
                        result(err_del, null);
                        return;
                    }
                })
                console.log("error: ", err_create);
                result(err_create, null);
                return;
            }
            result(null, res_create);
        });
    });
};

User.remove = (user_id, result) => {
    sql.query("DELETE FROM users WHERE user_id = ?", user_id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            result({kind: "not_found"}, null);
            return;
        }
        console.log("Delete user with user_id : ", user_id);
        result(null, res);
    });
};

module.exports = User;