const NAB = require("../models/nab.model.js");
const UserUnit = require("../models/userUnit.model");

const make2DigitFormat = function(num) { return ('00'+num).slice(-2) };

exports.list = (req, res) => {
    NAB.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving NAB."
            });
        else res.send(data);
    });
};

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content create NAB can not be empty"
        });
    }
    else {
        UserUnit.getTotalUnit((err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while get total unit."
                });
            else {
                let totalUnit = data;
                let newNaB = totalUnit == 0 ? 1 : (Math.floor(req.body.current_balance / totalUnit * 10000) / 10000);

                let date = new Date();
                let dateTime = date.getFullYear()           + '-' +
                    make2DigitFormat(date.getMonth() + 1)   + '-' +
                    make2DigitFormat(date.getDate())        + ' ' +
                    make2DigitFormat(date.getHours())       + ':' +
                    make2DigitFormat(date.getMinutes())     + ':' +
                    make2DigitFormat(date.getSeconds());
                
                const nab = new NAB({
                    nab : newNaB,
                    date : dateTime
                });
                NAB.create(nab, (err_nab, data) => {
                    if (err_nab)
                        res.status(500).send({
                            message:
                                err_nab.message || "Some error occurred while get total unit."
                        });
                    else res.status(201).send({nab: data.nab})
                });
            }
        });
    }
};