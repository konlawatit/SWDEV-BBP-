const express = require("express");
const router = express.Router();

//middleware
const {verifyToken} = require("../middleware/auth")

//repository
const { findOneInstallment, saveInstallment} = require("../repository/installment")
const Installment = require("../models/installment")

// router.get("/:id", async (req, res) => {
//     try {
//         const id = req.params.id
//         const interest = await findOneInterest(id)
//         res.send(interest)
//     } catch(err) {
//         res.send(err)
//     }
// })

router.post("/add", verifyToken, async (req, res) => {
    try {
        const {email} = req.user;
        const {name, type, total, next_pay, amount_period, current_period, description, payment_day, status} = req.body
        console.log(name, type, total, next_pay, amount_period, current_period, description, payment_day, status, email)
        // const result = await saveInstallment({name, type, total, next_pay, amount_period, current_period, description, payment_day, status, email})
        Installment.findOne(
            {
              email: email
            },
            (err, ac) => {
              if (err) throw err;
              ac.in_list.push({
                name,
                type,
                total,
                next_pay,
                amount_period,
                current_period,
                description,
                payment_day,
                status
              });
              ac.save().then(ac => {
                  res.send(ac)
              })
            }
          );
        //   res.send(result)

    } catch(err) {
        console.log(111,err)
        res.send(err)
    }
})

router.get("/", verifyToken,async (req, res) => {
    try {
        const {email} = req.user;
        const interestList = await findOneInstallment(email);
        res.send(interestList)
    } catch(err) {
        console.log(err)
        res.send(err)
    }
})


module.exports = router;
