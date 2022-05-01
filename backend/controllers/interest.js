const express = require("express");
const router = express.Router();

//middleware
const {verifyToken} = require("../middleware/auth")

//repository
const { findAllInterest, findOneInterest } = require("../repository/interest")

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const interest = await findOneInterest(id)
        res.send(interest)
    } catch(err) {
        res.send(err)
    }
})

router.get("/", async (req, res) => {
    try {
        const interestList = await findAllInterest();
        res.send(interestList)
    } catch(err) {
        console.log(err)
        res.send(err)
    }
})


module.exports = router;
