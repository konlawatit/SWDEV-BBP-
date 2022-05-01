const mongoose = require("mongoose");

const Schema = mongoose.Schema;



const installmentListSchema = new Schema({
  name: {
      type: String,
      require: true
  },
  type: {
    type: String,
    require: true
},
total: {
    type: String,
    require: true
},
next_pay: {
    type: String,
    require: true
},
amount_period: {
    type: String,
    require: true
},
current_period: {
    type: String,
    require: true
},
description: {
    type: String,
    require: true
},
payment_day: {
    type: String,
    require: true
},
status: {
    type: String,
    require: true
}
});

const installmentSchema = new Schema({
    email: {
        type: String,
        require: true
    },
    in_list: [installmentListSchema]
})

module.exports = mongoose.model("Installments", installmentSchema);
