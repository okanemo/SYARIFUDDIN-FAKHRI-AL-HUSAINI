const sql = require('./db.js');

const InvestHistory = function(investHistory){
    this.user_id = investHistory.user_id;
    this.type = investHistory.type;
    this.amount_unit = investHistory.amount_unit;
    this.current_unit = investHistory.current_unit;
    this.date = investHistory.date;
}

InvestHistory.create = (newInvestHistory, result) => {
    sql.query("INSERT INTO investment_history SET ?", newInvestHistory, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Successfull add investHistory with id : ", res.insertId);
        result(null, {id: res.insertId, ...newInvestHistory});
    })
};

InvestHistory.remove = (id, result) => {
    sql.query("DELETE FROM investment_history WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Delete investHistory with id", id);
        result(null, res);
    });
};

module.exports = InvestHistory;