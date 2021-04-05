const { validationResult } = require("express-validator/check")
const NAB = require("../models/nab.model.js");

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
    if (!validationResult(req).isEmpty()){
        res.status(406).send({
            message: "Input not valid."
        })
    }

};