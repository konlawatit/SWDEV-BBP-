const mongoose = require("mongoose");

const Schema = mongoose.Schema;



const accountingListSchema = new Schema({
  title: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  amount: {
    type: Number,
    require: true
  },
  type: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  }
});

const accountingSchema = new Schema({
    user_email: {
        type: String,
        required: true
    },
    ac_list: [accountingListSchema]
})

module.exports = mongoose.model("Accounting", accountingSchema);
