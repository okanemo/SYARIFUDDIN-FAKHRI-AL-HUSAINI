const { check } = require("express-validator/check");

module.exports = app => {
    const nabs = require("../controllers/nab.controller.js");
    
    app.get("/api/v1/ib/listNAB", nabs.list);

    let validator = [
        check('nab').isFloat({ min: 0 })
    ];
    app.post("/api/v1/ib/updateTotalBalance", validator, nabs.create);
}