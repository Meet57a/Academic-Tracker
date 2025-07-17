const mongoose = require("mongoose");

const { Schema } = mongoose;

const taskModel = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    task: {
        type: String,
        required: true,
    },
    due: {
        type: String,
        required: true,
    },
    done: {
        type: Boolean,
        required: true,
    }
}, { timestamps: true });

const task = mongoose.model('task', taskModel);
module.exports = task;
