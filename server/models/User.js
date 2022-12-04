const { Schema, model } = require('mongoose');

const User = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    name: {type: String, default: "User"},
});

module.exports = model("User", User);
