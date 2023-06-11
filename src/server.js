const express = require("express");
const initalRouter = require("./Router/initalRouter");
const connectDB = require("./ConnectApp/ConnectDB");
const app = express();
require('dotenv').config()
const port = process.env.PORT;
const path = require("path")
const bodyParser = require('body-parser');

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static(path.join(__dirname, "public")));

initalRouter(app)

connectDB()

//dotenv: process.env
//require (ES5) commonjs = import(ES6) js module

// app.get('/home', (req, res) => {
//     res.send("home")
// })

// app.get("/", (req, res) => {
//     res.send("Hello World!");
// });


//GET /api/v1/users
//req: 
/* app.use('/api/v1/list', (req, res, next) => {
    res.status(200).json({
        errCode: 0,
        msg: 'ok',
        data: [
            {
                id: '1'
            },
            {
                id: '1'
            },
        ]
    })
    
}) */

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
