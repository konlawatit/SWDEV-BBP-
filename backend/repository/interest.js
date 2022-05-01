const Interest = require("../models/interest")

const findOneInterest = (id) => Interest.findById(id)

const findAllInterest = () => Interest.find()


module.exports = {
    findOneInterest,
    findAllInterest
}
