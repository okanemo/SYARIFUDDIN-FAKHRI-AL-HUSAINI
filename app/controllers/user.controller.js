const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator/check");
const User = require("../models/user.model.js");
const UserUnit = require("../models/userUnit.model.js");

exports.member = (req, res) => {
    User.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving User."
            });
        else res.send(data);
    });
};

exports.create = (req, res) => {
    if (!req.body) {
        console.log({message: "Content create user can not be empty"});
        res.status(400).send({
            message: "Content can not be empty"
        });
    }
    else {
        if (!validationResult(req).isEmpty()){
            console.log({message: "Input not valid."});
            res.status(406).send({
                message: "Input not valid."
            })
        }
        else {
            const user = new User({
                user_id: uuidv4(),
                username: req.body.username,
                name: req.body.name,
                email: req.body.email,
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
    }
};