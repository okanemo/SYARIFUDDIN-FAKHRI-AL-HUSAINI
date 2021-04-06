const sql = require('./db.js');
const UserUnit = require("./userUnit.model.js");

const User = function(user){
    this.user_id = user.user_id
    this.username = user.username;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
};

User.getAllByPageLimit = (param_page, param_limit, result) => {
    let query = "SELECT users.user_id, user_units.unit FROM users LEFT JOIN user_units ON users.user_id = user_units.user_id LIMIT ? OFFSET ?";
    sql.query(query, [parseInt(param_limit), parseInt(param_page) * parseInt(param_limit)], (err, res) => {
        if (err) {
            console.log("error get All Users By PageLimit: ", err);
            result(null, err);
            return;
        }
        console.log("Users: ", res);
        result(null, res);
    });
};

User.getUserById = (id_user, result) => {
    let query = "SELECT users.user_id, user_units.unit FROM users LEFT JOIN user_units ON users.user_id = user_units.user_id WHERE users.user_id = ?";
    sql.query(query, id_user, (err, res) => {
        if (err) {
            console.log("error get User By Id: ", err);
            result(null, err);
            return;
        }
        console.log("User: ", res);
        result(null, res);
    });
};

User.getTotalUser = result => {
    sql.query("SELECT count(*) as total_user FROM users", (err, res) => {
        if (err) {
            console.log("error get TotalUser: ", err);
            result(null, err);
            return;
        }
        console.log("Total user: ", res[0].total_user);
        result(null, res[0].total_user);
    });
};

User.create = (newUser, newUserUnit, result) => {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error create User: ", err);
            result(err, null);
            return;
        }
        UserUnit.create(newUser, newUserUnit, (err_create, res_create) => {
            if (err_create) {
                User.remove(newUser.user_id, (err_del, res_del) =>{
                    if (err_del) {
                        console.log("error remove user when error in create User: ", err_del);
                        result(err_del, null);
                        return;
                    }
                })
                console.log("error create User Unit in create User: ", err_create);
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
            console.log("error remove User: ", err);
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