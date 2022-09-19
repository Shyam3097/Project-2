const collegeModel = require('../models/collegeModel');
const internModel = require('../models/internModel');


// ==========================Create College APi===============================
const college = async function (req, res) {

    try {
        const data = req.body
        const collegeData = await collegeModel.create(data)
        return res.status(201).send({ status: true, data: collegeData })
    }

    catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}

// =================================Get CollegeDetails Api=============================

const getcollegeDetails = async function (req, res) {
    res.setHeader('Access-Control-Allow-Origin','*')
    try {

        let collegeName = req.query.collegeName;
        if (Object.keys(req.query).length == 0) return res.status(400).send({ status: false, message: "Please apply filter" })
        if (!collegeName) {
            return res.status(400).send({ status: false, message: "College name is required" });
        }
        const college = await collegeModel.findOne({ name: collegeName, isDeleted: false, });
        if (!college)
            return res.status(400).send({ status: false, message: "No college found" });
            
        const internData = await internModel.find({ collegeId: college._id, isDeleted: false }).select({_id: 1, name: 1, email: 1, mobile: 1});

        const collegeDetails = {
            name: college.name,
            fullName: college.fullName,
            logoLink: college.logoLink,
            interns: internData

        };

        res.status(200).send({ status: true, data: collegeDetails });



    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });

    }
};

// Destructuring
module.exports = { college, getcollegeDetails };

