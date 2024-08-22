const mongoose = require("mongoose")

const employeeSchema = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
    position:{
        type:String,
        required:true
    },
    contactnumber:{
        type:String,
        required:true
    },
    address: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'terminated'],
        default: 'active',
        required: true,
    }
})



const Employee = mongoose.model("Employee", employeeSchema);


module.exports = Employee;