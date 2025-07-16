const TimeTableModel = require('../models/time-table')

exports.createTable = async (req, res) => {
    try {
        const body = req.body;
        TimeTableModel.create({ subject: body.subject, day: body.day, endtime: body.endTime, location: body.location, starttime: body.startTime })
        res.status(200).json({ status: true, msg: "Item created successfully." })
    } catch (error) {
        console.log(error);

    }
}

exports.fetchTable = async (req, res) => {
    try {
        const fetchTablee = await TimeTableModel.find({});
        // const timeTable 

        res.status(200).json({ status: true, msg: "Fetched successfully.", table: fetchTablee })

    } catch (error) {
        console.log(error);

    }
}
