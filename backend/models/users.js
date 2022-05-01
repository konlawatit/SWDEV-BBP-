const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const usersSchema = new Schema({
    // user_name: {
    //     type: String,
    //     required: true,
    // },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
    // access_token: {
    //     type: String,
    //     required: true
    // },
    // refresh_token: {
    //     type: String,
    //     required: true,
    // },
    // scope: {
    //     type: String,
    //     required: true
    // },
    // token_type: {
    //     type: String,
    //     required: true
    // },
    // expiry_date: {
    //     type: Number,
    //     required: true
    // }
});

module.exports = mongoose.model("users", usersSchema);
