const mongoose = require("mongoose")


const taskSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    files:{
        filename:{
            type:String,
            required:false
        },
        path:{
            type:String,
            required:false
        }
    },
    status:{
        type:String,
        required:true
    },
    deadline:{
        type:Date,
        required: false
    },
    admin_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    employee_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{timestamps:true})


const Task = mongoose.model("Task",taskSchema)


module.exports = Task