const { check } = require("express-validator/check");

module.exports = app => {
    const users = require("../controllers/user.controller.js");

    app.get("/api/v1/ib/member", users.member);

    let validator = [
        check('password').isLength({ min: 8 }),
        check('email').isEmail()
    ];
    app.post("/api/v1/user/add", validator, users.create);
}