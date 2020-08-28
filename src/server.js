"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config")
const app = express();
const controller = require("./controller")
app.use(bodyParser.urlencoded({ extended: false }))
.use(bodyParser.json())
.use(controller)
.use((req, res)=>res.status(404).send("Route not found"))

app.listen(config.get("PORT"), ()=>{
    console.log(`server started on port ${config.get("PORT")}`)
})
