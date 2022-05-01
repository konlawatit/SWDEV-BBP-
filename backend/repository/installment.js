const Installment = require("../models/installment");

const findOneInstallment = (email) =>
  Installment.findOne({ email: email }, "in_list");

// const findAllInterest = () => Interest.find()
const saveInstallment = ({
  name,
  type,
  total,
  next_pay,
  amount_period,
  current_period,
  description,
  payment_day,
  status,
  email
}) =>
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
      return ac.save();
    }
  );

module.exports = {
  findOneInstallment,
  saveInstallment
};
