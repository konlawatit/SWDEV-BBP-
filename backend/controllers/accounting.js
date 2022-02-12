const express = require("express");

const router = express.Router();

const Accounting = require("../models/accounting");
const Product = require("../models/test");

router.post("/add", async (req, res) => {
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
        ac.save().then(() => {
          console.log('add accounting')
          res.send(ac);
        }).catch(err => {
          console.log('add ac err', err)
          res.send('add ac err')
        })
      }
    );
  } catch (err) {
    console.log("err", err);
    res.status(500).send({
      message: "err"
    });
  }
});

router.get("/get", async (req, res) => {
  try {
    console.log(process.env.REDIRECT_URIS)
    const email = req.headers.email
    Accounting.findOne({
      user_email: email
    }, "ac_list", (err, accounting) =>{
      if (err) throw err
      else res.send(accounting.ac_list)
    })
  } catch(err) {
    console.log('get accounting', err)
    res.status(500).send({
      error: true
    })
  }
})


// router.put("/update");

module.exports = router;
