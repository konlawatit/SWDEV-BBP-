const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const interestSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    require: true
  },
  mlr: {
    type: String,
    required: true
  },
  mor: {
    type: String,
      required: true
  },
  mrr: {
    type: String,
      required: true
  },
  phone: {
      type: String,
      required: true
  },
  website: {
      type: String,
      required: true
  },
  interest_rate: {
      type: String,
      required: true
  }
});

module.exports = mongoose.model("Interests", interestSchema);
