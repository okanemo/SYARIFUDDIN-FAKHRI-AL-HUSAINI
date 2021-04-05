const { validationResult } = require("express-validator/check")
const InvestHistory = require("../models/investHistory.model.js");

exports.create = (req, res) => {
    if (!req.body) {
        console.log({message: "Content can not be empty"});
        res.status(400).send({
            message: "Content create investHistory can not be empty"
        });
    }
    else {
        const investHistory = new InvestHistory({
            
        })
    }
};