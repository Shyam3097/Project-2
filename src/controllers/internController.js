const internModel = require("../models/internModel");
const collegeModel = require("../models/collegeModel");

// =============================Create Intern Api==============================

const createIntern = async function (req, res) {
  res.setHeader('Access-Control-Allow-Origin','*')
  try {
    const internData = req.body;

    const clgName = internData.collegeName
    const clgData = await collegeModel.findOne({ name: clgName, isDeleted: false })

    if (!clgData) { return res.status(404).send({ status: false, message: "collegeName not found" }); }
    internData.collegeId = clgData._id

    const savedInternData = await internModel.create(internData);
    return res.status(201).send({ status: true, data: savedInternData });
  }
  catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports.createIntern = createIntern


