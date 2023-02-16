const dotenv = require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const app = express();
const port = process.env.PORT;
const calculator = require(`${__dirname}/calculator.js`);

// Use express functionality to parse urlencoded responses 
app.use(express.urlencoded({ extended: true }));
// Set view engine to ejs
app.set("view engine", "ejs");
// Specify the location of the static files: public
app.use(express.static("public"));

app.route("/")
    .get(function (req, res) {
        res.render("home");
    });
app.route("/convert")
.get(function(req, res){
    res.redirect("/");
});
app.post("/convert", function (req, res) {
    const fromNumber = req.body.fromNumber;
    const fromUnit = req.body.fromUnit;
    const toUnit = req.body.toUnit;
    const result = calculator.convert(fromNumber, fromUnit, toUnit);
    res.render("results", {
        fromNumber: result.fromNumber,
        fromUnit: result.fromUnit,
        toNumber: result.toNumber,
        toUnit: result.toUnit
    });
});

app.listen(port, function () {
    console.log(`Server listening on port ${port}`);
})