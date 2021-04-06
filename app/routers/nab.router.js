module.exports = app => {
    const nabs = require("../controllers/nab.controller.js");
    
    app.get("/api/v1/ib/listNAB", nabs.list);

    app.post("/api/v1/ib/updateTotalBalance", nabs.create);
}