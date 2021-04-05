const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Testing port is done.');
})

// PORT
const port = process.env.PORT || 3000;

require("./app/routers/user.router.js")(app);
require("./app/routers/nab.router.js")(app);
require("./app/routers/userUnit.router.js")(app);

app.listen(port, () => {
    console.log(`Listening on port ${port}... `)
})