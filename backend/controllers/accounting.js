const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const { google } = require("googleapis");

const router = express.Router();

const Accounting = require("../models/accounting");
const Users = require("../models/users");
const Product = require("../models/test");

//middleware
const signinWithTest = require("../middleware/signinWithTest");

const {findOneAccounting, saveAccounting} = require("../repository/accounting")

const GOOGLE_CREDENTIALS = {
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET
};

router.get("/test", async (req, res) => {
  try {
    res.send({
      error: false,
      message: 'pass'
    })
  } catch(err) {
    console.log(err)
    res.send({
      error: true,
      message: err
    })
  }
})


router.post("/add", signinWithTest, async (req, res) => {
  try {
    const { title, date, amount, type, description, email } = req.body;

     Accounting.findOne(
      {
        user_email: email
      },
      "ac_list",
      (err, ac) => {
        if (err) throw err;
        ac.ac_list.push({
          title: title,
          date: date,
          amount: amount,
          type: type,
          description: description
        });
        ac.save()
          .then(() => {
            console.log("add accounting");
            res.send(ac);
          })
          .catch((err) => {
            console.log("add ac err", err);
            res.send("add ac err");
          });
      }
    );
  } catch (err) {
    console.log("err", err);
    res.status(500).send({
      message: "err"
    });
  }
});

router.get("/get", signinWithTest, async (req, res) => {
  try {
    const email = req.headers.email;
    if (!email) throw("not have email")

    findOneAccounting(email).then(response => {
      res.send(response.ac_list)
    }).catch(err => {
      res.status(400).send(err)
    })
  } catch (err) {
    console.log("get accounting", err);
    res.status(500).send({
      error: true
    });
  }
});

router.get("/get/gmail/:bank", signinWithTest, async (req, res) => {
  try {
    const email = req.headers.email;

    console.log('-----------------',email, req.params.bank)
    Users.findOne(
      {
        email: email
      },
      async (err, user) => {
        if (
          user.scope
            .split()
            .includes("https://www.googleapis.com/auth/gmail.readonly")
        ) {
          res.send("scope not allow");
        } else {
          const bank = req.params.bank;
          const TOKEN = {
            access_token: user.access_token,
            refresh_token: user.refresh_token,
            scope: user.scope,
            token_type: user.token_type,
            expiry_date: user.expiry_date
          };
          console.log(typeof TOKEN.expiry_date);
          const oauth2Client = new OAuth2Client(
            GOOGLE_CREDENTIALS.client_id,
            GOOGLE_CREDENTIALS.client_secret,
            "urn:ietf:wg:oauth:2.0:oob"
          );
          const gmail = google.gmail("v1");
          const gmailOptions = {
            auth: oauth2Client,
            userId: "me"
          };

          oauth2Client.credentials = TOKEN;
          try {
            let messagesList = await gmail.users.messages.list({
              ...gmailOptions,
              maxResults: 100
            });
            const messages = messagesList.data.messages;
            console.log(`${messages.length} messages`);
            let promises = messages.map((message) => {
              const messageId = message.id;
              return new Promise((resolve, reject) => {
                gmail.users.messages.get(
                  {
                    ...gmailOptions,
                    id: messageId
                  },
                  (err, response) => {
                    if (err)
                      return res.send({
                        statusCode: 500,
                        message: err
                      });
                    // console.log(response.data.payload)
                    let sender = response.data.payload.headers.filter(
                      (obj) => obj.name === "From"
                    )[0].value;
                    let subject = response.data.payload.headers.filter(
                      (obj) => obj.name === "Subject"
                    )[0].value;

                    let senderEmail = sender.split(/<|>/)[1];
                    console.log(senderEmail);

                    let subjectList = [
                      "แจ้งผลการโอนเงินสำเร็จ",
                      "แจ้งผลการโอนเงินพร้อมเพย์สำเร็จ",
                      "แจ้งผลการชำระค่าสินค้าและบริการสำเร็จ",
                      "แจ้งผลการเติมเงินสำเร็จ"
                    ];
                    // {
                    //   "transfer":,
                    //   "promptpay":,
                    //   "payForService":,
                    //   "topup":
                    // }
                    if (
                      senderEmail === "noreply@krungthai.com" &&
                      bank === "krungthai" &&
                      subjectList.includes(subject)
                    ) {
                      let data = response.data.payload.parts[0].body.data;
                      let buff = new Buffer.from(data, "base64");
                      let dataBody = buff.toString();

                      switch (subject) {
                        case "แจ้งผลการโอนเงินสำเร็จ":
                          resolve({
                            mailType: "transfer",
                            title: "[กรุงไทย] แจ้งผลการโอนเงินสำเร็จ",
                            type: "expenses",
                            amount: dataBody
                              .slice(
                                dataBody.search("จำนวนเงิน"),
                                dataBody.search("บาท")
                              )
                              .split(" ")[2],
                            date: dataBody
                              .slice(
                                dataBody.search("วันที่ทำรายการ"),
                                dataBody.search("หมายเลขอ้างอิง")
                              )
                              .split(/ |<\/dd>/)[2],
                            time: dataBody
                              .slice(
                                dataBody.search("วันที่ทำรายการ"),
                                dataBody.search("หมายเลขอ้างอิง")
                              )
                              .split(/ |<\/dd>/)[3]
                          });
                          break;
                        case "แจ้งผลการโอนเงินพร้อมเพย์สำเร็จ":
                          resolve({
                            mailType: "promptpay",
                            title: "[กรุงไทย] แจ้งผลการโอนเงินพร้อมเพย์สำเร็จ",
                            type: "expenses",
                            amount: dataBody
                              .slice(
                                dataBody.search("จำนวนเงิน"),
                                dataBody.search("บาท")
                              )
                              .split(" ")[2],
                            date: dataBody
                              .slice(
                                dataBody.search("วันที่ทำรายการ"),
                                dataBody.search("หมายเลขอ้างอิง")
                              )
                              .split(/ |<\/dd>/)[2],
                            time: dataBody
                              .slice(
                                dataBody.search("วันที่ทำรายการ"),
                                dataBody.search("หมายเลขอ้างอิง")
                              )
                              .split(/ |<\/dd>/)[3]
                          });
                          break;
                        case "แจ้งผลการชำระค่าสินค้าและบริการสำเร็จ":
                          resolve({
                            mailType: "payForService",
                            title:
                              "[กรุงไทย] แจ้งผลการชำระค่าสินค้าและบริการสำเร็จ",
                              type: "expenses",
                              amount: dataBody
                              .slice(
                                dataBody.search("จำนวนเงินที่ชำระ"),
                                dataBody.search("บาท")
                              )
                              .split(" ")[2],
                            date: dataBody
                              .slice(
                                dataBody.search("วันที่ทำรายการ"),
                                dataBody.search("หมายเลขอ้างอิง")
                              )
                              .split(/ |<\/dd>/)[2],
                            time: dataBody
                              .slice(
                                dataBody.search("วันที่ทำรายการ"),
                                dataBody.search("หมายเลขอ้างอิง")
                              )
                              .split(/ |<\/dd>/)[3]
                          });
                          break;
                        case "แจ้งผลการเติมเงินสำเร็จ":
                          resolve({
                            mailType: "topup",
                            title: "[กรุงไทย] แจ้งผลการเติมเงินสำเร็จ",
                            type: "expenses",
                            amount: dataBody
                              .slice(
                                dataBody.search("จำนวนเงิน"),
                                dataBody.search("บาท")
                              )
                              .split(" ")[2],
                            date: dataBody
                              .slice(
                                dataBody.search("วันที่ทำรายการ"),
                                dataBody.search("หมายเลขอ้างอิง")
                              )
                              .split(/ |<\/dd>/)[2],
                            time: dataBody
                              .slice(
                                dataBody.search("วันที่ทำรายการ"),
                                dataBody.search("หมายเลขอ้างอิง")
                              )
                              .split(/ |<\/dd>/)[3]
                          });
                          break;
                        default:
                          resolve(null);
                          break;
                      }

                      // resolve(dataBody);
                      // resolve(response)
                      // resolve(response.data.snippet)
                      // console.log(`pass ${senderEmail}`);
                    }
                    resolve(null);
                    // console.log(`${new Date(parseInt(response.data.internalDate))} messageId ${messageId}`,response.data.snippet)
                  }
                );
              });
            });

            Promise.all(promises)
              .then((response) => {
                if (response !== null) {
                  // let resFilterNull = response.filter((obj) => obj !== null)
                  // let re = resFilterNull.map(obj => {
                  // console.log(obj.split(/<dd>|<\/dd>/)[0])
                  // return obj
                  // })
                  let resFilterNull = response.filter((obj) => obj !== null)
                  let resSort = resFilterNull.sort((a, b) => {
                    let dateA = new Date(parseInt(a.date.split("/")[2]), parseInt(a.date.split("/")[1]), parseInt(a.date.split("/")[0]), a.time.split(":")[0], a.time.split(":")[1], a.time.split(":")[2])
                    let dateB = new Date(parseInt(b.date.split("/")[2]), parseInt(b.date.split("/")[1]), parseInt(b.date.split("/")[0]), b.time.split(":")[0], b.time.split(":")[1], b.time.split(":")[2])
                    if (dateB < dateA) return 1
                    else if (dateB > dateA) return -1
                    else if (dateB === dateA) return 0
                  })
                  console.log('Sort date',resSort)
                  resFilterNull.map(data => {

                    Accounting.findOne(
                      {
                        user_email: email
                      },
                      "ac_list",
                      (res, accounting) => {
                        console.log(accounting.ac_list[accounting.ac_list.length - 1])
                        let acLast = accounting.ac_list[accounting.ac_list.length - 1]
                        // let lastDate = new Date(parseInt(acLast.date.split("/")[2]), parseInt(acLast.date.split("/")[1]), parseInt(acLast.date.split("/")[0]), acLast.time.split(":")[0], acLast.time.split(":")[1], acLast.time.split(":")[2])
                        let dataDate = new Date(parseInt(data.date.split("/")[2]), parseInt(data.date.split("/")[1]), parseInt(data.date.split("/")[0]), data.time.split(":")[0], data.time.split(":")[1], data.time.split(":")[2])
                        console.log('ad last',acLast, dataDate)
                        console.log(acLast < dataDate)
                        if (acLast < dataDate || !acLast ) {
                          accounting.ac_list.push({
                            title: data.title,
                            // date: data.date,
                            date: new Date(parseInt(data.date.split("/")[2]), parseInt(data.date.split("/")[1]), parseInt(data.date.split("/")[0]), data.time.split(":")[0], data.time.split(":")[1], data.time.split(":")[2]),
                            amount: parseFloat(data.amount),
                            type: data.type,
                            description: data.title
                          });
                          accounting.save().then(() => {
                            console.log('save จ้า')
                          }).catch(err => {
                            res.send({
                              error: true
                            })
                          })
                        }

                      }
                    );
                  })
                  res.send({
                    result: resFilterNull,
                    error: false
                    // result: re
                  });
                }
              })
              .catch((err) => {
                console.log("3333333333333333333333");
                throw err;
              });
          } catch (err) {
            res.send("login ใหม่โว้ยยยยยยยยยยยยยย");
          }
        }
      }
    );
  } catch (err) {
    res.status(500).send({
      error: true,
      message: "get gmail error"
    });
  }
});

// router.put("/update");

module.exports = router;
