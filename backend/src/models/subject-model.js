const mongoose = require("mongoose");

const { Schema } = mongoose;

const subjectModel = new Schema({
    subject: {
        type: String,
        required: true,
    },
});

const subject = mongoose.model('subject', subjectModel);
module.exports = subject;
