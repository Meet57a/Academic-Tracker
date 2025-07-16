const mongoose = require("mongoose");

const { Schema } = mongoose;

const timeTableModel = new Schema({
    subject: {
        type: String,
        required: true,
    },
    day: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    starttime: {
        type: String,
        required: true,
    },
    endtime: {
        type: String,
        required: true,
    },
});

const timetable = mongoose.model('timetable', timeTableModel);
module.exports = timetable;
