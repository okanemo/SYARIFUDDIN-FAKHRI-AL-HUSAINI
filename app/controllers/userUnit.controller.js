const UserUnit = require("../models/userUnit.model.js");
const NAB = require("../models/nab.model.js");
const InvestHistory = require("../models/investHistory.model.js");

const make2DigitFormat = function(num) { return ('00'+num).slice(-2) };

const transaksi = function(req, res, type){
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty"
        });
    }
    else{
        UserUnit.getByUserId(req.body.user_id, (err, data) => {
            if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while get previous unit."
                });
            else{ 
                if (data.length != 0){
                    let previous_unit = data[0].unit;

                    NAB.getLastNAB((err, data) => {
                        if (err)
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while get last NAB."
                        });
                        else{
                            let nab = data[0].nab;
                            
                            let amount_unit = Math.floor(req.body.amount_rupiah / nab * 10000) / 10000;
                            let current_unit = type == "topup" ? (previous_unit + amount_unit) : (previous_unit - amount_unit);
                            let current_rupiah = Math.floor(current_unit * nab * 100) / 100;
                    
                            let date = new Date();
                            let dateTime = date.getFullYear()           + '-' +
                                make2DigitFormat(date.getMonth() + 1)   + '-' +
                                make2DigitFormat(date.getDate())        + ' ' +
                                make2DigitFormat(date.getHours())       + ':' +
                                make2DigitFormat(date.getMinutes())     + ':' +
                                make2DigitFormat(date.getSeconds());
                    
                            const investHistory = new InvestHistory({
                                user_id : req.body.user_id,
                                type : type,
                                amount_unit : amount_unit,
                                current_unit : current_unit,
                                date : dateTime
                            });
                            InvestHistory.create(investHistory, (err_history, data_history) => {
                                if (err_history)
                                    res.status(500).send({
                                        message:
                                            err_history.message || "Some error occurred while create InvestHistory."
                                    });
                                else{
                                    UserUnit.updateUnitByUserId(req.body.user_id, current_unit, (err_userUnit, data_userUnit) => {
                                        if (err_userUnit){
                                            InvestHistory.remove(data_history.id, (err_remove, data_remove) => {
                                                if (err_remove)
                                                    res.status(500).send({
                                                        message:
                                                            err_remove.message || "Some error occurred while remove InvestHistory."
                                                    });
                                                else {
                                                    res.status(500).send({
                                                        message:
                                                            err_userUnit.message || "Some error occurred while update UnitByUserId."
                                                    });
                                                }
                                            })
                                        }
                                        else {
                                            UserUnit.getTotalUnit((err_totalUnit, data_totalUnit) => {
                                                if (err_totalUnit)
                                                    res.status(500).send({
                                                        message:
                                                            err_totalUnit.message || "Some error occurred while get total unit."
                                                    });
                                                else {
                                                    let saldo_rp_total = Math.floor(data_totalUnit * nab * 100) / 100
                                                    if (type == "topup"){
                                                        let output = {
                                                            nilai_unit_hasil_topup : current_unit,
                                                            nilai_unit_total : data_totalUnit,
                                                            saldo_rupiah_total : saldo_rp_total
                                                        };
                                                        res.status(200).send(output);
                                                    }
                                                    else if (type == "withdraw"){
                                                        let output = {
                                                            nilai_unit_setelah_withdraw : current_unit,
                                                            nilai_unit_total : data_totalUnit,
                                                            saldo_rupiah_total : saldo_rp_total
                                                        };
                                                        console.log(output);
                                                        res.status(200).send(output);
                                                    }
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            }
        });
    }
};

exports.topup = (req, res) => {
    transaksi(req, res, "topup");
};

exports.withdraw = (req, res) => {
    transaksi(req, res, "withdraw");
};