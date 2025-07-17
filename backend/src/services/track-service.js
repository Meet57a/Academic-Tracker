const TaskModel = require("../models/task-model")
const SubjectModel = require("../models/subject-model")

exports.taskCreate = async (req, res) => {
    try {
        const body = req.body;

        console.log(body);

        await TaskModel.create({ userId: body.userId, due: body.due, subject: body.subject, task: body.task, done: false })
        res.status(200).json({ status: true, msg: "Task created successfully." })

    } catch (error) {
        console.log(error);

    }
}

exports.taskUpdate = async (req, res) => {
    try {
        const body = req.body;

        console.log(body);

        await TaskModel.findByIdAndUpdate(body.id, { done: body.donevalue })
        if(body.donevalue === true) {
            res.status(200).json({ status: true, msg: "Task marked as done." })
        } else {
            res.status(200).json({ status: true, msg: "Task marked as not done." })
        }

    } catch (error) {
        console.log(error);

    }
}

exports.subjectCreate = async (req, res) => {
    try {
        const body = req.body;
        console.log(body);

        await SubjectModel.create({ subject: body.subject })
        res.status(200).json({ status: true, msg: "Subject created successfully." })

    } catch (error) {
        console.log(error);

    }
}

exports.fetchSubjectAndTimeTable = async (req, res) => {
    try {
        const fetchSub = await SubjectModel.find();
        // const timeTable 

        res.status(200).json({ status: true, msg: "Fetched successfully.", subjects: fetchSub })

    } catch (error) {
        console.log(error);

    }
}

exports.deleteTask = async (req, res) => {
    try {
        const id = req.params.id;
        const delet = await TaskModel.findByIdAndDelete(id);

        res.status(200).json({ status: true, msg: "Deleted successfully." })

    } catch (error) {
        console.log(error);

    }
}

exports.fetchTask = async (req, res) => {
    try {
        const id = req.params.id;
        const fetchTask = await TaskModel.find({ userId: id });


        res.status(200).json({ status: true, msg: "Fetched successfully.", tasks: fetchTask })

    } catch (error) {
        console.log(error);

    }
}

