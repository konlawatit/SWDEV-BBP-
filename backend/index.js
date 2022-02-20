const express = require("express")
// const forceSSL = require('express-force-ssl');
var https = require('https');
const cors = require("cors")
const mongoose = require("mongoose")
require('dotenv').config();

// let ssl_options = {
//     key: fs.readFileSync('./keys/private.key'),
//     cert: fs.readFileSync('./keys/cert.crt'),
//     ca: fs.readFileSync('./keys/intermediate.crt')
//   };

const privateKey = fs.readFileSync('server.key')
const certificate = fs.readFileSync('server.cert')

const PORT = 3030

const app = express()

const mongodbUri = process.env.MONGODB_URI

const gmailAPI = require("./controllers/gmailAPI")
const accounting = require("./controllers/accounting")
const auth = require("./controllers/auth")

// var secureServer = https.createServer(ssl_options, app);

app.use(cors())

app.use(express.urlencoded({
    extended: false
}))

app.use(express.json())

const routes = [
    {
        prefix: '/auth',
        target: auth
    },
    {
        prefix: '/gmailapi',
        target: gmailAPI
    },
    {
        prefix: '/accounting',
        target: accounting
    }
]
// app.use(forceSSL);
for (let route of routes) {
    app.use(route.prefix, route.target)
}

mongoose.connect(mongodbUri).then(result => {
    // secureServer.listen(443)
    https.createServer({key: privateKey, cert: certificate}, app).listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })
}).catch(err => {
    console.log("Database err", err)
})

