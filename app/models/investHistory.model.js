const sql = require('./db.js');

const InvestHistory = function(investHistory){
    this.user_id = investHistory.user_id;
    this.type = investHistory.type;
    this.amount_unit = investHistory.amount_unit;
    this.current_unit = investHistory.current_unit;
    this.date = investHistory.date;
}

module.exports = InvestHistory;