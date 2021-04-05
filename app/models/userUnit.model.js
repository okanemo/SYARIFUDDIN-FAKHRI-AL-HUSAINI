const sql = require('./db.js');

const UserUnit = function(userUnit){
    this.user_id = userUnit.user_id;
    this.unit = userUnit.unit;
};

UserUnit.getByUserId = (user_id, result) => {
    sql.query("SELECT * FROM user_units WHERE user_id = ?", user_id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("UserUnit: ", res);
        result(null, res);
    });
};

UserUnit.getTotalUnit = result => {
    sql.query("SELECT * FROM user_units", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        let totalUnit = 0;
        for (let data of res) {
            totalUnit += data.unit;
        }
        console.log("TotalUnit: ", totalUnit);
        result(null, totalUnit);
    });
};

UserUnit.create = (newUser, newUserUnit, result) => {
    sql.query("INSERT INTO user_units SET ?", newUserUnit, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Successfull add user with user_id : ", newUser.user_id);
        result(null, {id: res.insertId, ...newUser});
    });
};

UserUnit.updateUnitByUserId = (user_id, unit, result) => {
    sql.query("UPDATE user_units SET unit = ? WHERE user_id = ?", [unit, user_id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Update unit successful.");
        result(null, {user_id: user_id, unit: unit})
    });
};

module.exports = UserUnit;