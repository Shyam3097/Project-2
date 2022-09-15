const collegeModel=require("../models/collegeModel")
const internModel=require("../models/internModel")
const { default: mongoose } = require("mongoose")

let verify = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId)
}

function Boolean(value) {
    if (value == true || value == false) { return true }
    return false
}

// ==============================================college validation================================================================================

const collegeValidation=async function(req,res,next){
    try{
        let data=req.body;
        let{name,fullName,logoLink,isDeleted}=data

        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: "Data is mandatory" })

        if(!name){return res.status(400).send({status:false,msg:"please provide the name"})}
        if(typeof name==='string' && name.trim().length === 0){return res.status(400).send({status:false,msg:"name is empty"})}
        if (!(/^[a-zA-Z ]{2,30}$/).test(name)) return res.status(400).send({ status: false, msg: " Please enter name as A-Z or a-z" })

        let collegeName = await collegeModel.findOne({ name: name })
        if (collegeName) { return res.status(400).send({ status: false, msg: "this name is already exist please provide diffrent name" }) }

        if(!fullName){return res.status(400).send({status:false,msg:"please provide the fullName"})}
        if(typeof fullName==='string' && fullName.trim().length === 0){return res.status(400).send({status:false,msg:"fullName is empty"})}
        if (!(/^[a-zA-Z]{1,}/).test(fullName)) return res.status(400).send({ status: false, msg: " Please enter fullName as A-Z or a-z" })

        if(!logoLink){return res.status(400).send({status:false,msg:"please provide the logoLink"})}
        if(typeof logoLink==='string' && logoLink.trim().length === 0){return res.status(400).send({status:false,msg:"logoLink is empty"})}
        if (!(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/).test(logoLink)) return res.status(400).send({ status: false, msg: " Please enter logoLink in correct format" })

        if (isDeleted) {
            if (Boolean(isDeleted) == false) return res.status(400).send({ status: false, msg: "isDeleted should be true or false" })
        }
       

        next()
    }
    catch (err) {
        return res.status(500).send({ msg: err.message })
      }

   
    }

    module.exports.collegeValidation=collegeValidation
       
// =========================================================intern validation=========================================================================

        const  internValidation=async function(req,res,next){
        try{
         
        let data=req.body;
        let{name,email,mobile,collegeId,isDeleted}=data
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: "Data is mandatory" })


        if(!name){return res.status(400).send({status:false,msg:"please provide the name"})}
        if(typeof name==='string' && name.trim().length === 0){return res.status(400).send({status:false,msg:"name is empty"})}
        if (!(/^[a-zA-Z ]{2,30}$/).test(name)) return res.status(400).send({ status: false, msg: " Please enter name as A-Z or a-z" })

        if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/).test(email)) { return res.status(400).send({ status: false, msg: "please provide valid email" }) }

        let intern = await internModel.findOne({ email: email })
        if (intern) { return res.status(400).send({ status: false, msg: "this email already exists please provide another email" }) }

        if (!(/^[0]?[6789]\d{9}$/).test(mobile)) { return res.status(400).send({ status: false, msg: "please provide valid mobile number" }) }
        let mobileNoCheck = await internModel.findOne({ mobile: mobile })
        if (mobileNoCheck ) { return res.status(400).send({ status: false, msg: "this mobile number is already registerd" }) }
        
        if(!collegeId){return res.status(400).send({status:false,msg:"please provide the collegeId"})}
        if(collegeId){
            if(!verify(collegeId)){return res.status(400).send({status:false,msg:"collegeId is invalid"})}
        }

        if (isDeleted) {
            if (Boolean(isDeleted) == false) return res.status(400).send({ status: false, msg: "isDeleted should be true or false" })
        }
          
        next()
        }
        catch (err) {
        return res.status(500).send({ msg: err.message })
      }

}
module.exports.internValidation=internValidation