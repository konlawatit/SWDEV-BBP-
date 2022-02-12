const fs = require('fs')
const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const { google } = require("googleapis");
const GOOGLE_CREDENTIALS = {
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET
}

const DIR = __dirname
const TOKEN_PATH = `${DIR}/gmail_token.json`

const Product = require("../models/test");

const router = express.Router();


router.post("/cash/:bank", async (req, res) => {
  const bank = req.params.bank;
  const TOKEN = JSON.parse(fs.readFileSync(TOKEN_PATH))
  const oauth2Client = new OAuth2Client(GOOGLE_CREDENTIALS.client_id, GOOGLE_CREDENTIALS.client_secret, "urn:ietf:wg:oauth:2.0:oob");
  const gmail = google.gmail("v1");
  const gmailOptions = {
    auth: oauth2Client,
    userId: "me"
  }

  oauth2Client.credentials = TOKEN;
  let messagesList = await gmail.users.messages.list({
    ...gmailOptions,
    maxResults: 5
  })

  const messages = messagesList.data.messages
  console.log(`${messages.length} messages`)
  
  let promises = messages.map(message => {
    const messageId = message.id
    return new Promise((resolve, reject) => {
      gmail.users.messages.get({
        ...gmailOptions,
        id: messageId
      }, (err, response) => {
        if (err) return res.send({
          statusCode: 500,
          message: err
        })
        // console.log(response.data.payload)
        let sender = response.data.payload.headers.filter(obj => obj.name === "From")[0].value
        let senderEmail = sender.split(/<|>/)[1]
        console.log(senderEmail)
        if (senderEmail === "noreply@krungthai.com") {
          
        let data = response.data.payload.parts[0].body.data
        let buff = new Buffer.from(data, "base64")
        let dataBody = buff.toString();

          resolve(dataBody)
          console.log(`pass ${senderEmail}`)
        }
        resolve(null)
        // console.log(`${new Date(parseInt(response.data.internalDate))} messageId ${messageId}`,response.data.snippet)
      })
    }) 
  })

  Promise.all(promises).then( (response) =>{
    if (response !== null) res.send({
      result: response.filter(obj => obj !== null)
    })
  })
});

router.post("/tokens", async (req, res) => {
  const TOKEN = req.body.tokens
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(TOKEN))
  console.log(TOKEN)
  res.send({
    statusCode: 200
  })
})

router.get("/mongo", async (req, res) => {
  const product1 = new Product({title: 'test product'})
  product1.save().then(() => {
    console.log("product")
  })
  res.send(`mongo db`)
})

router.get("/", (req, res) => {
  res.send("Hello Gmail API");
});

module.exports = router;
