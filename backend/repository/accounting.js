const Accounting = require("../models/accounting");

const findOneAccounting = (email) =>
  Accounting.findOne(
    {
      user_email: email
    },
    "ac_list"
  );

const saveAccounting = ({ title, date, amount, type, description, email }) =>
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
      return ac.save()
        // .then(() => {
        //   console.log("add accounting");
        //   res.send(ac);
        // })
        // .catch((err) => {
        //   console.log("add ac err", err);
        //   res.send("add ac err");
        // });
    }
  );

module.exports = {
  findOneAccounting,
  saveAccounting
};
