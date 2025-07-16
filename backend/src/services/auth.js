const UserModel = require("../models/user-model");
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');


exports.registerCode = async (req, res) => {
    try {
        const body = req.body;


        const codeExist = await UserModel.findOne({ code: body.code })


        if (!body.code || body === undefined) {
            res.status(400).json({ status: false, msg: "Field is required." })
        } else if (codeExist) {
            res.status(400).json({ status: false, msg: "Code already exist." })
        } else {

            const save = await UserModel.create({ code: body.code });
            if (save) {
                res.status(200).json({ status: true, msg: "Code created successfully." })
            } else {
                res.status(400).json({ status: false, msg: "Code not created successfully." })

            }
        }
    } catch (error) {
        console.log(error);
    }
}



exports.loginCode = async (req, res) => {
    try {
        const body = req.body;
        
        
        const codeExist = await UserModel.findOne({ code: body.code })

        if (!body.code) {
            res.status(400).json({ status: false, msg: "Field is required." })
        } else if (codeExist) {
            const match = body.code === codeExist.code;
            if (match) {
                const token = jwt.sign({}, process.env.JWT_SECRET, { expiresIn: "1d" })
                res.status(200).json({ status: true, msg: "User logged in successfully.", token: token, userId: codeExist._id })

            }
        } else {
            res.status(400).json({ status: false, msg: "Code not exist." })

        }
    } catch (error) {
        console.log(error);

    }


}
