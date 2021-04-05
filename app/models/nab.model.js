const sql = require('./db.js');

const NAB = function(nab){
    this.nab = nab.nab;
    this.date = nab.date;
}

NAB.getAll = result => {
    sql.query("SELECT * FROM n_a_b_s", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        let datas = [];
        for (let data of res){
            let temp = {
                nab : data.nab,
                date : data.date
            }
            datas.push(temp);
        }
        console.log("List NAB: ", datas);
        result(null, datas);
    });
};

NAB.create = (newNAB, result) => {
    sql.query("INSERT INTO n_a_b_s SET ?", newNAB, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Successfull add nab with value ", newNAB.nab);
        result(null, {id: res.insertId, ...newNAB});
    })
};

module.exports = NAB;