const mongoose = require("mongoose");

const { Schema } = mongoose;

const userModel = new Schema({
    code: {
        type: String,
        required: true,
    }
});

const user = mongoose.model('user',userModel);
module.exports = user;