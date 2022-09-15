const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")

function Boolean (value) {
    if (value == true || value == false) { return true }
    return false
}

//============= college validation ======================================================

const collegeValidation = async function (req, res, next) {
    try {
        let data = req.body;
        let { name, fullName, logoLink, isDeleted } = data

        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: "Data is mandatory" })

        if (!name) { return res.status(400).send({ status: false, msg: "please provide the name" }) }
        if (typeof name === 'string' && name.trim().length === 0) { return res.status(400).send({ status: false, msg: "name is empty" }) }
        if (typeof name !== 'string') { return res.status(400).send({ status: false, msg: "name should be string" }) }
        if (!(/^[a-zA-Z ]{2,30}$/).test(name)) return res.status(400).send({ status: false, msg: " Please enter name as A-Z or a-z" })

        let collegeName = await collegeModel.findOne({ name: name })
        if (collegeName) { return res.status(400).send({ status: false, msg: "this name  already exist" }) }

        if (!fullName) { return res.status(400).send({ status: false, msg: "please provide the fullName" }) }
        if (typeof fullName === 'string' && fullName.trim().length === 0) { return res.status(400).send({ status: false, msg: "fullName is empty" }) }
        if (typeof fullName !== 'string') { return res.status(400).send({ status: false, msg: "fullName should be string" }) }
        if (!(/^[a-zA-Z ]{1,}/).test(fullName)) return res.status(400).send({ status: false, msg: " Please enter fullName as A-Z or a-z" })

        if (!logoLink) { return res.status(400).send({ status: false, msg: "please provide the logoLink" }) }
        if (typeof logoLink === 'string' && logoLink.trim().length === 0) { return res.status(400).send({ status: false, msg: "logoLink is empty" }) }
        if (typeof logoLink !== 'string') { return res.status(400).send({ status: false, msg: "logoLink is should be in string format" }) }
        if (!(/^https?:\/\/.*\.[s3].*\.(png|gif|webp|jpeg|jpg)\??.*$/gim
        ).test(logoLink)) return res.status(400).send({ status: false, msg: " Please enter logoLink in correct format" })

        if (isDeleted) {
            if (Boolean(isDeleted) == false) return res.status(400).send({ status: false, msg: "isDeleted should be true or false" })
        }


        next()
    }
    catch (err) {
        return res.status(500).send({ msg: err.message })
    }


}

module.exports.collegeValidation = collegeValidation

// =================intern validation===========================================

const internValidation = async function (req, res, next) {
    try {

        let data = req.body;
        let { name, email, mobile, collegeName, isDeleted } = data
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: "Data is mandatory" })


        if (!name) { return res.status(400).send({ status: false, msg: "please provide the name" }) }
        if (typeof name === 'string' && name.trim().length === 0) { return res.status(400).send({ status: false, msg: "name is empty" }) }
        if (typeof name !== 'string') { return res.status(400).send({ status: false, msg: "name should be string" }) }
        if (!(/^[a-zA-Z ]{2,30}$/).test(name)) return res.status(400).send({ status: false, msg: " Please enter name as A-Z or a-z" })

        if (!email) { return res.status(400).send({ status: false, msg: "please provide the email" }) }
        if (typeof email === 'string' && email.trim().length === 0) { return res.status(400).send({ status: false, msg: "email is empty" }) }
        if (typeof email !== 'string') { return res.status(400).send({ status: false, msg: "email should be string" }) }
        if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/).test(email.trim())) { return res.status(400).send({ status: false, msg: "please provide valid email" }) }

        let intern = await internModel.findOne({ email: email })
        if (intern) { return res.status(400).send({ status: false, msg: "this email already exists please provide another email" }) }

        if (!mobile) { return res.status(400).send({ status: false, msg: "please provide the mobile" }) }
        if (typeof mobile === 'string' && mobile.trim().length === 0) { return res.status(400).send({ status: false, msg: "mobile number is empty" }) }
        if (typeof mobile !== 'string') { return res.status(400).send({ status: false, msg: "mobile number should be string" }) }
        if (!(/^[0]?[6789]\d{9}$/).test(mobile.trim())) { return res.status(400).send({ status: false, msg: "please provide valid mobile number" }) }
        let mobileNoCheck = await internModel.findOne({ mobile: mobile })
        if (mobileNoCheck) { return res.status(400).send({ status: false, msg: "this mobile number is already registerd" }) }


        if (!collegeName) { return res.status(400).send({ status: false, msg: "please provide the collegeName" }) }
        if (typeof collegeName === 'string' && collegeName.trim().length === 0) { return res.status(400).send({ status: false, msg: "collegeName is empty" }) }
        if (typeof collegeName !== 'string') { return res.status(400).send({ status: false, msg: "collegeName should be string" }) }

        if (isDeleted) {
            if (Boolean(isDeleted) == false) return res.status(400).send({ status: false, msg: "isDeleted should be true or false" })
        }

        next()
    }
    catch (err) {
        return res.status(500).send({ msg: err.message })
    }

}
module.exports.internValidation = internValidation