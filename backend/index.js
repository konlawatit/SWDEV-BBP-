const express = require("express")
const compression = require("compression")
var https = require('https');
const cors = require("cors")
const mongoose = require("mongoose")
require('dotenv').config();
const { connectMockDB, connectRealDB } = require("./config/database");

const PORT = process.env.PORT || 3013;

const app = express()

const mongodbUri = process.env.MONGODB_URI

const gmailAPI = require("./controllers/gmailAPI")
const accounting = require("./controllers/accounting")
const auth = require("./controllers/auth")


app.use(cors())
app.use(compression())
app.use(express.urlencoded({extended: false}))
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
for (let route of routes) {
    app.use(route.prefix, route.target)
}

// mongoose.connect(mongodbUri).then(result => {
//    app.listen(PORT, () => {
//             console.log(`Server listening on port ${PORT}`)
//         })
// }).catch(err => {
//     console.log("Database err", err)
// })

if (process.env.NODE_ENV === "test") {
    if (process.env.TEST_ENV === "e2e") {
      connectMockDB().then(() => {
        app.listen(PORT, () => {
          console.log(`Mock Server is running at http://localhost:${PORT}`);
        });
      });
    }
  } else {
    connectRealDB().then(() => {
      app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
      });
    });
  }

  module.exports = app