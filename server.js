const express = require("express");
const path = require("path");
const app = express();

const PORT = 8800;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/calculate", (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    const operator = req.query.operator;

    let result;

    if (isNaN(num1) || isNaN(num2)) {
        result = "Please enter valid numbers!";
    } else {
        switch (operator) {
            case "add":
                result = num1 + num2;
                break;
            case "subtract":
                result = num1 - num2;
                break;
            case "multiply":
                result = num1 * num2;
                break;
            case "divide":
                result = num2 !== 0 ? num1 / num2 : "Cannot divide by zero";
                break;
            default:
                result = "Invalid operation selected";
        }
    }

    res.send(`
        <html>
        <head>
            <link rel="stylesheet" href="/style.css">
            <title>Result</title>
        </head>
        <body>
            <div class="container">
                <h1>Result</h1>
                <p class="result">${result}</p>
                <a class="btn" href="/">Go Back</a>
            </div>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
   