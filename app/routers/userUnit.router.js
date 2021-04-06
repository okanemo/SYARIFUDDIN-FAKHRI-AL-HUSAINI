module.exports = app => {
    const userUnit = require("../controllers/userUnit.controller.js");
    
    app.post("/api/v1/ib/topup", userUnit.topup);

    app.post("/api/v1/ib/withdraw", userUnit.withdraw);
}