const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const calculator = require(`${__dirname}/calculator.js`);

app.use(express.urlencoded({ extended: true }));


app.route("/")
    .get(function (req, res) {
        res.sendFile(`${__dirname}/index.html`);
    });

app.post("/convert", function (req, res) {
    const fromNumber = req.body.fromNumber;
    const fromUnit = req.body.fromUnit;
    const toUnit = req.body.toUnit;

    const result = calculator.convert(fromNumber, fromUnit, toUnit);
    res.send(`${result.fromNumber} ${result.fromUnit} = ${result.toNumber} ${result.toUnit}`);
});


app.listen(port, function () {
    console.log(`Server listening on port ${port}`);
})