const { v4: uuidv4 } = require("uuid");
const User = require("../models/user.model.js");
const { validationResult } = require("express-validator/check")

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
        res.status(400).send({
            message: "Content can not be empty"
        });
    }
    if (!validationResult(req).isEmpty()){
        res.status(400).send({
            message: "Input not valid."
        })
    }
    const user = new User({
        user_id: uuidv4(),
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    User.create(user, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving User."
            });
        else res.send({ user_id: data.user_id});
    })
};