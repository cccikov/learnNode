const express = require("express");
const app = express();
const data_router = express.Router();
const bodyParser = require('body-parser');

/**
 * Router
 */
data_router.get("/", function (req, res) {
    res.send(req.query);
});
data_router.use(bodyParser.json());
data_router.post("/", function (req, res) {
    res.send({
        "body": req.body,
        query: req.query
    });
});

/* app */
app.use("/data", data_router);
app.get("/:path", function (req, res) {
    res.send("base.js，请加上\"/data\"路径，现在路径为: \"/" + req.params.path+"\"");
})
app.get("/", function (req, res) {
    res.send("base.js , 请加上/data路径" );
})

app.listen(3000);