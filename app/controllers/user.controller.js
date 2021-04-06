const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator/check");
const User = require("../models/user.model.js");
const NAB = require("../models/nab.model.js");
const UserUnit = require("../models/userUnit.model.js");

const makeOutputMember = function(res, data, page, limit){
    NAB.getLastNAB((err, data_nab) => {
        if (err)
        res.status(500).send({
            message:
                err.message || "Some error occurred while get last NAB."
        });
        else{
            let nab = data_nab[0].nab;

            UserUnit.getTotalUnit((err_totalUnit, data_totalUnit) => {
                if (err_totalUnit)
                    res.status(500).send({
                        message:
                            err_totalUnit.message || "Some error occurred while get total unit."
                    });
                else {
                    let totalUnit = data_totalUnit;

                    User.getTotalUser((err_totalUser, data_totalUser) => {
                        if (err_totalUser)
                            res.status(500).send({
                                message:
                                    err_totalUser.message || "Some error occurred while get total unit."
                            });
                        else {
                            let totalUser = data_totalUser;
                            let users = []
                            for (user of data){
                                let temp = {
                                    user_id : user.user_id,
                                    unit : user.unit,
                                    rupiah : Math.floor(user.unit * nab * 100) / 100
                                };
                                users.push(temp);
                            }
                            let output = {
                                page : page,
                                limit_data : limit,
                                total_users : totalUser,
                                show_user_data : users.length,
                                current_nab : nab,
                                total_unit : totalUnit,
                                users : users
                            }
                            res.status(200).send(output);
                        }
                    });

                }
            });
        }
    });
}

exports.member = (req, res) => {
    let params_user_id = req.params.user_id == undefined ? "all" : req.params.user_id;
    let params_page = req.params.page == undefined ? 0 : req.params.page;
    let params_limit = req.params.limit == undefined ? 20 : req.params.limit;
    console.log(params_user_id, params_page, params_limit);

    if (params_user_id != "all"){
        User.getUserById( params_user_id, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving User."
                });
            else {
                makeOutputMember(res, data, params_page, params_limit);
            }
        });
    }
    else {
        User.getAllByPageLimit( params_page, params_limit, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving User."
                });
            else {
                makeOutputMember(res, data, params_page, params_limit);
            }
        });
    }
};

exports.create = (req, res) => {
    if (!req.body) {
        console.log({message: "Content create user can not be empty"});
        res.status(400).send({
            message: "Content can not be empty"
        });
    }
    else if (!validationResult(req).isEmpty() || req.body.username.toLowerCase() == "all"){
        console.log({message: "Input not valid."});
        res.status(406).send({
            message: "Input not valid."
        })
    }
    else {
        const user = new User({
            user_id: uuidv4(),
            username: req.body.username.toLowerCase(),
            name: req.body.name.toUpperCase(),
            email: req.body.email.toLowerCase(),
            password: req.body.password,
        });
        const userUnit = new UserUnit({
            user_id: user.user_id,
            unit: 0
        })
        User.create(user, userUnit, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while create User."
                });
            else res.status(201).send({ user_id: data.user_id});
        })
    }
};