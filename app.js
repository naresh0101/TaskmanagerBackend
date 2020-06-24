// Module's Import
const express = require("express");
const cors = require("cors");
const config = require("./config")
const fs = require("fs");
const db = require("./loders/mongodb")

// Creating express application object
let app = express()
app.use(express.json()) // parse application/json
app.use(cors()) // CORS
app.use(express.urlencoded({extended: false})) // parse application/x-www-form-urlencoded
app.use(express.static("public"));

// Initialize Routes
let routes = fs.readdirSync('./routes')
for (const index in routes) {
    app.use(require(`./routes/${routes[index]}`))
}

// Invalid Routes Handling (404)
app.use((req, res, next) => {
    let resBody = {
        success: false,
        message: 'Resource not found'
    }
    res.status(404).json(resBody)
})

// Error Handling (500)
app.use((err, req, res, next) => {
    let resBody = {
        success: false,
        message: 'Internal server error'
    }
    res.status(500).json(resBody)
})

const PORT = config.server.port;
app.listen(PORT, () => {
  console.log(`       Server running on port ${PORT}`);
});