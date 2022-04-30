const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
var assert = require("assert");

const router = express.Router();

//middleware
const {verifyToken} = require("../middleware/auth")

const Users = require("../models/users");
const Accounting = require("../models/accounting");

const secure_key = process.env.SECURE_KEY;

const GOOGLE_CREDENTIALS = {
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET
};

router.get("/authen", verifyToken ,async (req, res) => {
  try {
    res.send(req.user)
  } catch(err) {
    console.log(err);
    res.status(501).send(err);
  }
})

router.post("/register", async (req, res) => {
  try {
    //get data
    const { email, password, confirmPassword } = req.body;

    //validate data
    if (!email && !password && !confirmPassword) return res.status(400).send("input is required");
    if (password !== confirmPassword) return res.status(400).send("Confirm Password ไม่ถูกต้อง")

    // User exist
    const userExist = await Users.findOne({ email: email });
    if (userExist) return res.status(409).send("User already exist");

    //encrypt password
    const saltRounds = 10;
    const encryptPassword = await bcrypt.hash(password, saltRounds);

    //create user
    const user = await Users.create({
      email,
      password: encryptPassword
    });

    //create accounting for user
    const accounting = await Accounting.create({
      user_email: email,
      ac_list: []
    });

    //create token
    const token = jwt.sign(
      {
        email: email,
        _id: user._id,
        _acc_id: accounting._id
      },
      secure_key,
      {
        expiresIn: "2h"
      }
    );

    res.send({ token: token });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    //validate data
    if (!email && !password) return res.status(400).send("input is required");

    //Check user exist
    const user = await Users.findOne({ email });
    const accounting = await Accounting.findOne({ email }, "_id");

    //if user or password incorrect
    if (!user || !(await bcrypt.compare(password, user.password))) return res.status(400).send("email or password is incorrect");

    //create token
    const token = jwt.sign(
      {
        user_name: user.user_name,
        email: email,
        _id: user._id,
        _acc_id: accounting._id
      },
      secure_key,
      {
        expiresIn: "2h"
      }
    );
    res.send({ token: token });
  } catch (err) {
    console.log(err);
    res.status(501).send(err);
  }
});

router.get("/authen", verifyToken ,async (req, res) => {
  try {
    res.send(req.user)
  } catch(err) {
    console.log(err);
    res.status(501).send(err);
  }
})

// router.delete("/del", async (req, res) => {
//   try {
//     const delUser = await Users.remove({ email: "test@gmail.com" });
//     const delAccounting = await Accounting.remove({
//       user_email: "test@gmail.com"
//     });
//     res.send({
//       user: delUser,
//       accounting: delAccounting
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(501).send(err);
//   }
// });

router.post("/revoke", async (req, res) => {
  try {
    // if (!scope.split().includes("https://www.googleapis.com/auth/gmail.readonly"))
    const email = req.body.email;
    Users.findOne(
      {
        email: email
      },
      "access_token",
      (err, user) => {
        const oauth2Client = new OAuth2Client(
          GOOGLE_CREDENTIALS.client_id,
          GOOGLE_CREDENTIALS.client_secret,
          "urn:ietf:wg:oauth:2.0:oob"
        );
        oauth2Client
          .revokeToken(user.access_token)
          .then((d) => {
            console.log("revoke", d);
            res.send({
              error: false,
              message: "revoke success"
            });
          })
          .catch((err) => {
            console.log("revoke err", err);
            res.send({
              error: true,
              message: "revoke error"
            });
          });
      }
    );
  } catch (err) {
    console.log("revoke err", err);
    res.send({
      error: true
    });
  }
});

// router.post("/signin", async (req, res) => {
//   try {
//     const CLIENT_ID = GOOGLE_CREDENTIALS.client_id;
//     console.log(req.body);
//     // const id_token = req.body.payloads.id_token;
//     const {
//       id_token,
//       access_token,
//       refresh_token,
//       scope,
//       token_type,
//       expiry_date
//     } = req.body.payloads;
//     const client = new OAuth2Client(CLIENT_ID);

//     async function verify() {
//       const ticket = await client.verifyIdToken({
//         idToken: id_token,
//         audience: CLIENT_ID // Specify the CLIENT_ID of the app that accesses the backend
//         // Or, if multiple clients access the backend:
//         //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
//       });
//       const payload = ticket.getPayload();
//       Users.findOne(
//         {
//           email: payload.email
//         },
//         "access_token refresh_token expiry_date scope",
//         (err, userObj) => {
//           if (userObj) {
//             userObj.access_token = access_token;
//             userObj.refresh_token = refresh_token;
//             userObj.expiry_date = expiry_date;
//             userObj.scope = scope;
//             return userObj
//               .save()
//               .then(() => {
//                 res.send("update user");
//               })
//               .catch((err) => {
//                 res.send("update user err");
//               });
//           } else {
//             let user = new Users({
//               user_name: payload.name,
//               email: payload.email,
//               access_token: access_token,
//               refresh_token: refresh_token,
//               scope: scope,
//               token_type: token_type,
//               expiry_date: expiry_date
//             });
//             return user
//               .save()
//               .then(() => {
//                 let accounting = new Accounting({
//                   user_email: payload.email,
//                   ac_list: []
//                 });
//                 accounting.save().then(() => {
//                   console.log("save user");
//                   res.send("save user successful");
//                 });
//               })
//               .catch((err) => {
//                 console.log("err save user", err);
//                 res.send("signin err");
//               });
//           }
//         }
//       );
//     }
//     verify().catch((e) => {
//       console.log(e);
//       res.status(400).send({
//         statusCode: "400",
//         statusText: "Bad Request",
//         error: true,
//         message: "user invalid"
//       });
//     });
//   } catch (err) {
//     console.log("...", err);
//     res.status(500).send({
//       error: true
//     });
//   }
// });

module.exports = router;
