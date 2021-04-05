const { check } = require("express-validator/check");

module.exports = app => {
    const userUnit = require("../controllers/userUnit.controller.js");
    
    app.post("/api/v1/ib/topup", userUnit.topup);

    let validator = [
        check('user_id').notEmpty,
        check('amount_rupiah').isFloat({ min: 0 }).notEmpty()
    ];
    app.post("/api/v1/ib/withdraw", userUnit.withdraw);
}