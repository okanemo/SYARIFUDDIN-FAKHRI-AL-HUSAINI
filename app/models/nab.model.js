const sql = require('./db.js');

const NAB = function(nab){
    this.nab = nab.nab;
    this.date = nab.date;
}

NAB.getAll = result => {
    sql.query("SELECT * FROM n_a_b_s", (err, res) => {
        if (err) {
            console.log("error get All NAB: ", err);
            result(null, err);
            return;
        }
        let datas = [];
        for (let data of res){
            let temp = {
                nab : data.nab,
                date : data.date.toISOString().slice(0, 19).replace('T', ' ')
            }
            datas.push(temp);
        }
        // console.log("List NAB: ", datas);
        result(null, datas);
    });
};

NAB.getLastNAB = result => {
    sql.query("SELECT * FROM n_a_b_s WHERE id = (SELECT max(id) FROM n_a_b_s)", (err, res) => {
        if (err) {
            console.log("error get last NAB: ", err);
            result(null, err);
            return;
        }
        // console.log("Last NAB: ", res[0].nab);
        result(null, res);
    });
};

NAB.create = (newNAB, result) => {
    sql.query("INSERT INTO n_a_b_s SET ?", newNAB, (err, res) => {
        if (err) {
            console.log("error create NAB: ", err);
            result(err, null);
            return;
        }
        // console.log("Successfull add nab with value ", newNAB.nab);
        result(null, {id: res.insertId, ...newNAB});
    })
};

module.exports = NAB;